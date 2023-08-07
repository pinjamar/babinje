from flask import Flask
from flask_restful import Api
from res import HelloWorld

app = Flask(__name__)
api = Api(app)
    
api.add_resource(HelloWorld, "/helloworld")
