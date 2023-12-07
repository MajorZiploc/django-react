-- analytics on pg statements being executed
select (total_time / 1000 / 3600) as total_hours,
       (total_time / 1000)        as total_seconds,
       (total_time / calls)       as avg_millis,
       calls                         num_calls,
       query
from pg_stat_statements
order by 1 desc
limit 10;
