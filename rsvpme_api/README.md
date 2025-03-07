# RSVPME API

## Installing

### Packages Needed
|Package|Purpose|
|-------|-------|
| `Django` | Base Django package |
| `djangorestframework` | REST framework |
| `python-decouple` | .env Driven config |
| `django-filter` | Filtering / Fuzzy search functionality |
| `psycopg2` | PostgreSQL connection handler |

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