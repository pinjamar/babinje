from flask_restful import Resource, reqparse, marshal_with
from .babinje_item import *

items_post_args = reqparse.RequestParser()
items_post_args.add_argument("name", type=str, help= "Ime artikla za babinje")
items_post_args.add_argument("desc", type=str, help= "Opis artikla za babinje")

class ItemsAdmin(Resource):
    
    @marshal_with(babinje_item_marshaller, envelope="data")
    def post(self):
        args = items_post_args.parse_args()

        new_item = BabinjeItem(name = args["name"], desc=args["desc"])
        db.session.add(new_item)
        db.session.commit()

        return new_item, 201
