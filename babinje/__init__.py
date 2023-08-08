from flask import Flask
from flask_restful import Api

from .hello_world import HelloWorld
from .app_config import AppConfig
from .babinje_item import db

babinje_config = AppConfig("config.json")

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = babinje_config.secret_key
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{babinje_config.db_filename}"
    
    api = Api(app)
    db.init_app(app)

    api.add_resource(HelloWorld, "/api/v1/items")

    setup_database(app, babinje_config.db_filename)

    return app

from os import path
def setup_database(app, filename):
    if not path.exists("instance/" + filename):
        with app.app_context():
            db.create_all()
        print('Created database!')