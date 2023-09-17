import logging
import json

from flask import request, abort

from urlshortener import postgresqlclient;
from urlshortener import app;
import urlshortener.models as models

logger = logging.getLogger(__name__)


@app.route('/saved-urls', methods=['GET'])
def get_saved_urls():
	data = request.args
	logger.info(f"[get-saved-urls] {data}")
	user_id = data.get("userID", "")
	if not user_id:
		return abort(400, "Missing fields")

	urls, ok = postgresqlclient.c.get_saved_urls_by_id(user_id)
	if not ok:
		return abort(500, "Unable to get saved URLs")

	result = {
		"urls": urls
	}
	return json.dumps(result)


@app.route('/shortened-url', methods=['POST'])
def generate_shortened_url():
	data = request.get_json()
	logger.info(f"[shortened-url] {data}")
	user_id = data.get("userID", "")
	original_url = data.get("originalURL", "")
	if not user_id or not original_url:
		return abort(400, "Missing fields")

	url, exist = postgresqlclient.c.get_shortened_url(user_id, original_url)
	if exist:
		result = {
			"exists": True,
			"shortenedURL": url.shortened_url,
		}
		return json.dumps(result)

	url_id, ok = postgresqlclient.c.get_max_url_id()
	if not ok:
		return abort(500, "Unable to get url id")

	shortened_url = id_to_short_url(url_id + 1)
	ok = postgresqlclient.c.add_url(user_id, original_url, shortened_url)
	if not ok:
		return abort(500, "Unable to add entry to database")

	logger.info(f"[shortened-url] {original_url} created")
	result = {
		"exists": False,
		"shortenedURL": shortened_url,
	}
	return json.dumps(result)


def id_to_short_url(deci):
	s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	hash_str = ''
	while deci > 0:
		hash_str = s[deci % 62] + hash_str
		deci //= 62
	return hash_str