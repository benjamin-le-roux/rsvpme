# RSVPME API

## Installing

### Packages Needed
|Package|Purpose|
|-------|-------|
| `Django` | Base Django package |
| `djangorestframework` | REST framework |
| `python-decouple` | .env Driven config |
| `psycopg2` | PostgreSQL connection handler |

## Migrating

```
py manage.py makemigrations
py manage.py migrate
```

## Running server

```
py manage.py runserver
```