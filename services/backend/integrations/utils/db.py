from django.db.backends.utils import CursorWrapper
from typing import Any, Dict, Generator, List


def exec_sql_to_dicts(
        cursor: CursorWrapper, sql_statement: str,
        sql_args: List[Any]) -> Generator[Dict[Any, Any], None, None]:
    cursor.execute(sql_statement, sql_args)
    columns = [col[0] for col in cursor.description]
    return (dict(zip(columns, row)) for row in cursor.fetchall())
