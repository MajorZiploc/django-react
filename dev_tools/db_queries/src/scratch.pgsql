select
*
from integrations_movie
;

select
*
from integrations_scheduledjob
;

select
*
from django_celery_beat_periodictask
;



delete from integrations_movie;
INSERT INTO integrations_movie (
  id
  , title
  , genre
  , year
  , created_date
  , updated_date
  , creator_id
)
VALUES (
uuid_in(md5(random()::text || random()::text)::cstring)
, 'Toy Story'
, 'Kids'
, 2000
, now()
, now()
, 1
)
, (
uuid_in(md5(random()::text || random()::text)::cstring)
, 'Toy Story2'
, 'Kids'
, 2001
, now()
, now()
, 1
)
;
