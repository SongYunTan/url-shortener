import logging
import json
import random
import string

from flask import request, abort
from hashlib import sha256

from urlshortener import postgresqlclient;
from urlshortener import app;
import urlshortener.models as models

logger = logging.getLogger(__name__)


@app.route('/signup', methods=['POST'])
def signup():
	data = request.get_json()  # get a dictionary
	logger.info(f"[register] {data}")
	username = data.get("username", "")
	password = data.get("password", "")
	if not username or not password:
		return abort(400, "Missing fields")

	_, exist = postgresqlclient.c.get_user_by_username(username)
	if exist:
		return abort(400, "Username taken")

	salt = generate_salt()
	hashed_password = hash(salt, password)

	user = models.User(username, salt, hashed_password)
	user_id, ok = postgresqlclient.c.add_user(user)
	if not ok:
		return abort(500, "Unable to add entry to database")

	logger.info(f"[register] {username} created")
	result = {
		"id": user_id
	}
	return json.dumps(result)


@app.route('/login', methods=['POST'])
def login():
	data = request.get_json()  # get a dictionary
	logger.info(f"[login] {data}")
	username = data.get("username", "")
	password = data.get("password", "")
	if not username or not password:
		return abort(400, "Missing fields")

	user, ok = postgresqlclient.c.get_user_by_username(username)

	if not ok:
		return abort(400, "wrong username/password")

	hashed_pw = hash(user.salt, password)
	if hashed_pw != user.password:
		return abort(400, "wrong username/password")

	result = {
		"id": user.id
	}
	return json.dumps(result)


def generate_salt() -> str:
	return ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=64))


def hash(salt: str, password: str) -> str:
	b = bytes(salt + password, 'utf-8')
	return sha256(b).hexdigest()
