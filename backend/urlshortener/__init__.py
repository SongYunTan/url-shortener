from flask import Blueprint, Flask
# app factory design pattern recommended by Flask, so that unit tests are easier
# https://flask.palletsprojects.com/en/2.2.x/testing/
from flask_cors import CORS

def create_app():
    urlshortener_app = Flask(__name__)
    urlshortener_app.register_blueprint(urlshortener.app)
    CORS(urlshortener_app, origins=["https://baby-url-7d4727a2b0fa.herokuapp.com"])
    return urlshortener_app

app = Blueprint('backend', __name__, url_prefix='/')

import urlshortener.routes.account
import urlshortener.routes.url
