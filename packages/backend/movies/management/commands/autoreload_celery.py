import shlex
import subprocess
from django.core.management.base import BaseCommand
from django.utils import autoreload


class Command(BaseCommand):
  def add_arguments(self, parser):

    parser.add_argument(
        "--mint_worker_type",
        type=str,
        metavar="MINT_WORKER_TYPE",
        required=True,
        help="type of worker",
    )

    parser.add_argument(
        "--celery_worker_queues",
        type=str,
        metavar="CELERY_WORKER_QUEUES",
        required=True,
        help="worker queues",
    )

    parser.add_argument(
        "--mint_worker_options",
        type=str,
        metavar="MINT_WORKER_OPTIONS",
        help="options for worker",
    )

  def handle(self, mint_worker_type, celery_worker_queues, *args, **kwargs):
    mint_worker_options = kwargs.get("mint_worker_options", None)
    mint_worker_options = f" {mint_worker_options} " if mint_worker_options else " "

    def restart_celery(*args, **kwargs):
      kill_worker_cmd = "pkill -9 celery"
      subprocess.call(shlex.split(kill_worker_cmd))
      start_worker_cmd = f"celery -A api_crud worker{mint_worker_options}-O fair -l info --concurrency=1 -n {mint_worker_type}-%h -Q {celery_worker_queues}"
      subprocess.call(shlex.split(start_worker_cmd))

    self.stdout.write("Starting celery worker with autoreload...")
    autoreload.run_with_reloader(restart_celery, args=None, kwargs=None)
