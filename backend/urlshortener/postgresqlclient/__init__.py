from urlshortener.postgresqlclient.client import PostgreSQLClient

USERNAME = "postgres"
PASSWORD = "postgres"
HOST = "127.0.0.1"
DATABASE = "urlshortener"
PORT = "5432"

# singleton client
c = PostgreSQLClient(HOST, USERNAME, PASSWORD, DATABASE, PORT)
