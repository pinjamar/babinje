from flask_restful import Resource, reqparse, marshal_with
from .babinje_item import *

items_post_args = reqparse.RequestParser()
items_post_args.add_argument("name", type=str, help= "Ime artikla za babinje")
items_post_args.add_argument("desc", type=str, help= "Opis artikla za babinje")
items_post_args.add_argument("link", type=str, help= "Link na artikl", required=False)
items_post_args.add_argument("imgUrl", type=str, help= "Link na sliku", required=False)
items_post_args.add_argument("isFungible", type=bool, help="Potrošna roba")
items_post_args.add_argument("price", default=None, type=float, required=False)

# /api/v1/44ba0bb01331a2c0c9d6a835d0091c2c9033721afd612c30
class ItemsAdmin(Resource):
    
    @marshal_with(babinje_item_marshaller, envelope="data")
    def post(self):
        args = items_post_args.parse_args()

        is_fungible = 1 if args["isFungible"] else 0

        new_item = BabinjeItem(name = args["name"], desc=args["desc"], link=args["link"], img_url=args["imgUrl"], is_fungible=is_fungible)

        if "price" in args and args["price"] != None:
            new_item.price_grade = price_grade_from_price(args["price"])

        db.session.add(new_item)
        db.session.commit()

        return new_item, 201

