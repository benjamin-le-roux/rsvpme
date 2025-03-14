# RSVPME API

## Endpoints

|Endpoint|Purpose|
|--------|-------|
|`api/event/`| Event Detail |
|`api/guests/`| Guest List |
|`api/guests/[id]`| Guest info from ID |
|`api/sessions/`| Sessions List |
|`api/sessions/[uuid]`| Session info from UUID |

## Installing

### Packages Needed
|Package|Purpose|
|-------|-------|
| `Django` | Base Django package |
| `djangorestframework` | REST framework |
| `python-decouple` | .env Driven config |
| `django-filter` | Filtering / Fuzzy search functionality |
| `psycopg2` | PostgreSQL connection handler |
| `django-cors-headers` | CORS Headers Management |

### PostgreSQL

Enable Trigram similarity extension on server for fuzzy searching
```CREATE EXTENSION pg_trgm;```

## Migrating

```
py manage.py makemigrations
py manage.py migrate
```

## Running server

```
py manage.py runserver
```