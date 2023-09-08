from flask_restful import Resource, reqparse, marshal_with
from .babinje_item import *

items_post_args = reqparse.RequestParser()
items_post_args.add_argument("name", type=str, help= "Ime artikla za babinje")
items_post_args.add_argument("desc", type=str, help= "Opis artikla za babinje")
items_post_args.add_argument("link", type=str, help= "Link na artikl", required=False)

# /api/v1/44ba0bb01331a2c0c9d6a835d0091c2c9033721afd612c30
class ItemsAdmin(Resource):
    
    @marshal_with(babinje_item_marshaller, envelope="data")
    def post(self):
        args = items_post_args.parse_args()

        new_item = BabinjeItem(name = args["name"], desc=args["desc"], link=args["link"])
        db.session.add(new_item)
        db.session.commit()

        return new_item, 201
