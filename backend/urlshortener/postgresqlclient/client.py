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

		self.prepared_statements = {}
		self.prepared_statements["add_user"] = "INSERT INTO users (username, salt, passhash) VALUES (%s, %s, %s)"
		self.prepared_statements["get_user_by_username"] = "SELECT * FROM users WHERE username = %s"

	def add_user(self, user: models.User) -> Tuple[int, bool]:
		try:
			self.cursor.execute(self.prepared_statements["add_user"], (user.username, user.salt, user.password))
			self.cursor.execute(self.prepared_statements["get_user_by_username"], (user.username,))
			for row in self.cursor:
				user_id = row[0]
				break
			self.connector.commit()
		except psycopg2.Error as err:
			return None, False
		return user_id, True

	def get_user_by_username(self, username: str) -> Tuple[models.User, bool]:
		try:
			self.cursor.execute(self.prepared_statements["get_user_by_username"], (username,))

			for row in self.cursor:
				user = models.User(row[1], row[2], row[3], row[0])
				break
			else:
				return None, False
			self.connector.commit()
			return user, True

		except psycopg2.Error as err:
			return None, False
