from flask_restful import Resource, marshal_with
from .babinje_item import *

class ItemsController(Resource):

    @marshal_with(babinje_item_marshaller, envelope="data")
    def get(self):
        items = BabinjeItem.query.all()
        return items
