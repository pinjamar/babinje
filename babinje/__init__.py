from flask import Flask, jsonify, abort
from flask_restful import Api
from flask_cors import CORS

from .items_rest_controller import ItemsController
from .items_admin import ItemsAdmin
from .user_controller import UserController
from .mail_operations_controller import MailOperationsController

from .app_config import AppConfig, MailBuilder
from .babinje_item import db, create_initial_data
from .email_service import mail

babinje_config = AppConfig("config.json")
mail_builder = MailBuilder(babinje_config.mail_template_filename, babinje_config.mail_accept_template_filename)


def api_error(response_code: int, error_code: int, message: str):
    response = jsonify({
        "code": error_code,
        "message": message
    })
    response.status_code = response_code
    abort(response)

def create_app(isDebug: bool):
    app = Flask(__name__)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.config["SECRET_KEY"] = babinje_config.secret_key
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{babinje_config.db_filename}"
    app.config["MAIL_SERVER"] = babinje_config.mail_server
    app.config["MAIL_PORT"] = babinje_config.mail_port
    app.config["MAIL_USERNAME"] = babinje_config.mail_username
    app.config["MAIL_PASSWORD"] = babinje_config.mail_password
    app.config["MAIL_USE_TLS"] = babinje_config.mail_use_tls
    app.config["MAIL_USE_SSL"] = babinje_config.mail_use_ssl
    
    api = Api(app)
    mail.init_app(app)
    db.init_app(app)

    api.add_resource(ItemsController, "/api/v1/items")
    api.add_resource(UserController, "/api/v1/item/<int:item_id>/mutate")
    api.add_resource(ItemsAdmin, "/api/v1/44ba0bb01331a2c0c9d6a835d0091c2c9033721afd612c30")
    api.add_resource(MailOperationsController, "/api/v1/confirm/<int:item_id>/<string:key>")

    setup_database(app, babinje_config.db_filename, isDebug)

    return app

from os import path
def setup_database(app: Flask, filename, isDebug):
    if not path.exists("instance/" + filename):
        with app.app_context():
            db.create_all()
            if isDebug:
                create_initial_data(db)
        print('Created database!')