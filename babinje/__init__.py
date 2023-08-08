from flask import Flask
from flask_restful import Api

from .items_rest_controller import ItemsController
from .items_admin import ItemsAdmin
from .user_controller import UserController
from .mail_operations_controller import MailOperationsController

from .app_config import AppConfig
from .babinje_item import db

babinje_config = AppConfig("config.json")

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = babinje_config.secret_key
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{babinje_config.db_filename}"
    
    api = Api(app)
    db.init_app(app)

    api.add_resource(ItemsController, "/api/v1/items")
    api.add_resource(UserController, "/api/v1/item/<int:item_id>/mutate")
    api.add_resource(ItemsAdmin, "/api/v1/44ba0bb01331a2c0c9d6a835d0091c2c9033721afd612c30")
    api.add_resource(MailOperationsController, "/api/v1/confirm/<int:item_id>/<string:key>")

    setup_database(app, babinje_config.db_filename)

    return app

from os import path
def setup_database(app, filename):
    if not path.exists("instance/" + filename):
        with app.app_context():
            db.create_all()
        print('Created database!')