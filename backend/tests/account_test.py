import pytest
import json
import urlshortener
import urlshortener.postgresqlclient
from urlshortener import models


class MockPostgreSQLClient:
	def add_user(self, user):
		return 1, True

	def get_user_by_username(self, username):
		return models.User("songyun", "salt", "test", id=1), False


@pytest.fixture()
def app():
	app = urlshortener.create_app()
	app.config.update({
		"TESTING": True,
	})
	yield app


@pytest.fixture()
def client(app):
	return app.test_client()


# Login
def test_login_correct_password(client, mocker):
	# setup mocks
	mocker.patch(
		"urlshortener.postgresqlclient.PostgreSQLClient.__init__",
		lambda self, host, username, password: None
	)
	mocker.patch(
		"urlshortener.postgresqlclient.PostgreSQLClient.get_user_by_username",
		lambda self, username: (
			models.User("songyun", "test", "37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578", id=1), True)
	)

	# unit test
	response = client.post("/login", data=json.dumps({
		"username": "songyun",
		"password": "test"
	}), content_type='application/json')
	assert 200 == response.status_code


def test_login_wrong_password(client, mocker):
	# setup mocks
	mocker.patch(
		"urlshortener.postgresqlclient.PostgreSQLClient.__init__",
		lambda self, host, username, password: None
	)

	mocker.patch(
		"urlshortener.postgresqlclient.PostgreSQLClient.get_user_by_username",
		lambda self, username: (models.User("songyun", "37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578", "test", id=1), True)
	)

	# unit test
	response = client.post("/login", data=json.dumps({
		"username": "test",
		"password": "test"
	}), content_type='application/json')
	assert 400 == response.status_code
