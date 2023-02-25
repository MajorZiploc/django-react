import datetime
import os
import readline
import time
import traceback
from inspect import signature

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db.backends import utils
from django.utils.datastructures import OrderedSet
from django_extensions.management.shells import import_objects
from django_extensions.management.utils import signalcommand

def save_history():
  """
  Saves the input history of this debug shell instance
  """
  readline.write_history_file("/tmp/debug_shell_history")


class Command(BaseCommand):
  # Pro-tip: use --print-sql option to get a verbose output of raw sql queries produced by django

  # List of classes that should be imported into the shell (other than events and models which are already covered)
  utilities = [
      datetime,
      readline,
  ]
  # Dictionary of local variables that should be available to the shell
  local_variables = {
      "foo": 1,
  }
  # Dictionary of functions that should be available to the shell
  functions = {
      "fooer": lambda x: x,
  }

  ###############################################################################################################
  ###############################################################################################################
  ###############################################################################################################
  ###############################################################################################################
  ###############################################################################################################
  ###############################################################################################################

  help = (
      "Like the 'shell' command but autoloads the models of all installed Django apps as well as our events and "
      "utilities. "
  )

  def get_imported_objects(self, options):
    imported_objects = import_objects(options, self.style)
    # print(self.style.SQL_TABLE("# Event Imports"))
    # for event_class in EventUtils.event_classes:
    #     imported_objects[event_class.__name__] = event_class
    #     print(
    #         self.style.SQL_COLTYPE(
    #             f"from {event_class.__module__} import {event_class.__name__}"
    #         )
    #     )
    print(self.style.SQL_TABLE("# Utility Imports"))
    # Custom Load Classes

    for event_class in self.utilities:
      imported_objects[event_class.__name__] = event_class
      print(
          self.style.SQL_COLTYPE(
              f'{f"from {event_class.__module__} " if "__module__" in event_class.__dict__ is not None else "" }import {event_class.__name__}'
          )
      )
    return imported_objects

  def get_local_variables(self):
    print(self.style.SQL_TABLE("# Local Variables"))
    for key, value in self.local_variables.items():
      print(self.style.SQL_COLTYPE(f"{key} : {value}"))
    return self.local_variables

  def get_functions(self):
    print(self.style.SQL_TABLE("# Functions"))
    for key, value in self.functions.items():
      print(self.style.SQL_KEYWORD(f"{key}"), end="")
      print(f"{signature(value)}:", end="")
      print(self.style.SQL_COLTYPE(f"{value.__doc__}"))
    return self.functions

  def add_arguments(self, parser):
    super(Command, self).add_arguments(parser)
    parser.add_argument(
        "--print-sql",
        action="store_true",
        default=False,
        help="Print SQL queries as they're executed",
    )

  def get_py_shell(self, options):
    # Using normal Python shell
    import code

    local_imports = self.get_imported_objects(options)
    local_variables = self.get_local_variables()
    functions = self.get_functions()
    local_setup = {**local_imports, **local_variables, **functions}
    # Needed readline elsewhere, if readline isn't available I'd rather know, than be unable to
    # get history or autocomplete. Maybe windows users will run into errors?
    import rlcompleter

    readline.set_completer(rlcompleter.Completer(local_setup).complete)
    readline.parse_and_bind("tab:complete")
    if "libedit" in readline.__doc__:
      # To deal with conflicting mac library implementations so autocomplete works on local
      readline.parse_and_bind("bind ^I rl_complete")

    # We want to honor both $PYTHONSTARTUP and .pythonrc.py, so follow system
    # conventions and get $PYTHONSTARTUP first then .pythonrc.py.
    # I'm becoming less and less certain we will ever use this, since we would probably just want
    # to do any initialization here, but will keep supporting it for now until someone accidentally adds a setting
    # they don't want in the shell.
    for pythonrc in OrderedSet(
        [os.environ.get("PYTHONSTARTUP"), os.path.expanduser("~/.pythonrc.py")]
    ):
      if not pythonrc:
        continue
      if not os.path.isfile(pythonrc):
        continue
      # Match the behavior of the cpython shell where an error in
      # PYTHONSTARTUP prints an exception and continues.
      try:
        with open(pythonrc) as handle:
          exec(
              compile(handle.read(), pythonrc, "exec"), local_setup
          ) in globals(), locals()
      except Exception:
        traceback.print_exc()

    def run_plain():
      code.interact(local=local_setup)

    return run_plain

  # This sets application name for PG connections
  @staticmethod
  def set_application_name():
    supported_backends = [
        "django.db.backends.postgresql",
        "django.db.backends.postgresql_psycopg2",
    ]
    opt_name = "fallback_application_name"
    default_app_name = "django_shell"
    app_name = default_app_name
    dbs = getattr(settings, "DATABASES", [])

    # lookup over all the databases entry
    for db in dbs.keys():
      if dbs[db]["ENGINE"] in supported_backends:
        try:
          options = dbs[db]["OPTIONS"]
        except KeyError:
          options = {}

        # dot not override a defined value
        if opt_name in options.keys():
          app_name = dbs[db]["OPTIONS"][opt_name]
        else:
          dbs[db].setdefault("OPTIONS", {}).update(
              {opt_name: default_app_name}
          )
          app_name = default_app_name

    return app_name

  @signalcommand
  def handle(self, *args, **options):
    print_sql = getattr(settings, "SHELL_PLUS_PRINT_SQL", False)
    if options.get("print_sql", False) or print_sql:

      # Code from http://gist.github.com/118990
      try:
        import sqlparse
      except ImportError:
        sqlparse = None

      try:
        import pygments.formatters
        import pygments.lexers
      except ImportError:
        pygments = None

      class PrintQueryWrapper(utils.CursorDebugWrapper):
        def execute(self, sql, params=()):
          starttime = time.time()
          try:
            return self.cursor.execute(sql, params)
          finally:
            execution_time = time.time() - starttime
            raw_sql = self.db.ops.last_executed_query(
                self.cursor, sql, params
            )

            if sqlparse:
              raw_sql = raw_sql
              raw_sql = sqlparse.format(
                  raw_sql, reindent_aligned=True, truncate_strings=50000
              )

            if pygments:
              raw_sql = pygments.highlight(
                  raw_sql,
                  pygments.lexers.get_lexer_by_name("sql"),
                  pygments.formatters.TerminalFormatter(),
              )

            print(raw_sql)
            print("")
            print(
                "Execution time: %.6fs [Database: %s]"
                % (execution_time, self.db.alias)
            )
            print("")

      utils.CursorDebugWrapper = PrintQueryWrapper
    self.set_application_name()
    shell = self.get_py_shell(options)
    try:
      shell()
    except Exception as e:
      print(str(e))
      pass
    finally:
      # Dump history on exit just for luls
      save_history()
