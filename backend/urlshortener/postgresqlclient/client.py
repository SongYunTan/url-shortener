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
		self.prepared_statements["add_url"] = "INSERT INTO urls (user_id, original_url, shortened_url) VALUES (%s, %s, %s)"
		self.prepared_statements["delete_url"] = "UPDATE urls SET deleted_at=CURRENT_TIMESTAMP WHERE id = %s AND deleted_at IS NULL"
		self.prepared_statements["get_shortened_url"] = "SELECT * FROM urls WHERE user_id = %s AND original_url = %s AND deleted_at IS NULL"
		self.prepared_statements["get_saved_urls_by_id"] = "SELECT * FROM urls WHERE user_id = %s AND deleted_at IS NULL"
		self.prepared_statements["get_max_url_id"] = "SELECT MAX(Id) FROM urls"

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

	def add_url(self, user_id: str, original_url: str, shortened_url: str) -> bool:
		try:
			self.cursor.execute(self.prepared_statements["add_url"], (user_id, original_url, shortened_url))
			self.connector.commit()
			return True

		except psycopg2.Error as err:
			return False

	def delete_url(self, url_id: str) -> Tuple[models.Url, bool]:
		try:
			self.cursor.execute(self.prepared_statements["delete_url"], (url_id,))
			self.connector.commit()
			return True

		except psycopg2.Error as err:
			return False

	def get_shortened_url(self, user_id: str, original_url: str) -> Tuple[models.Url, bool]:
		try:
			self.cursor.execute(self.prepared_statements["get_shortened_url"], (user_id, original_url))
			for row in self.cursor:
				url = models.Url(row[1], row[2], row[3], row[0])
				break
			else:
				return None, False
			self.connector.commit()
			return url, True

		except psycopg2.Error as err:
			return None, False

	def get_saved_urls_by_id(self, user_id: str):
		try:
			self.cursor.execute(self.prepared_statements["get_saved_urls_by_id"], (user_id,))
			urls = []
			for row in self.cursor:
				urls.append({"id": row[0], "originalURL": row[2], "shortenedURL": row[3]})
			self.connector.commit()
			return urls, True

		except psycopg2.Error as err:
			return None, False

	def get_max_url_id(self):
		try:
			self.cursor.execute(self.prepared_statements["get_max_url_id"])
			for row in self.cursor:
				url_id = row[0]
			self.connector.commit()
			return (url_id, True) if url_id else (0, True)

		except psycopg2.Error as err:
			return None, False
