# URL Shortener

Frontend is hosted on https://baby-url-7d4727a2b0fa.herokuapp.com/login  \
Backend is hosted on https://baby-url-backend-7b27c2fd1375.herokuapp.com/  \
However, deploying the database on Heroku is not part of the free plan and thus the database has not been deployed.

## Run this app locally

### Installation
For frontend:

```
cd frontend
npm i
```

For backend:

```
cd backend
python -m venv ./venv
source ./venv/bin/activate
pip install -r requirements.txt
```

For PostgreSQL database:
Install pgAdmin4 from https://www.pgadmin.org/download/
```
brew update
brew install postgresql@14
```

### Database Setup
1. Open pgAdmin4 and create new database `urlshortener`
2. Change values in `backend/urlshortener/postgresqlclient/__init__.py` if needed
3. In pgAdmin4 query tool, run the migration script found in `backend/resources/db/migration`

### Quickstart
For frontend, in the frontend directory:

```
npm start
```

For backend, in the backend directory:

```
flask --app urlshortener run --debug
```
