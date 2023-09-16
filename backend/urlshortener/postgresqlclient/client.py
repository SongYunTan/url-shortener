import logging
from typing import Tuple

import psycopg2
import urlshortener.models as models

logger = logging.getLogger(__name__)


class PostgreSQLClient:
    def __init__(self, host, username, password, database, port):
        self.connector = psycopg2.connect(
            host=host,
            user=username,
            password=password,
            database=database,
            port=port,
        )
        self.cursor = self.connector.cursor()
