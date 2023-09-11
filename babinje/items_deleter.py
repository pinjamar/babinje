from flask_restful import Resource, reqparse, marshal_with
from sqlalchemy import select
from .babinje_item import *

items_post_args = reqparse.RequestParser()
items_post_args.add_argument("name", type=str, help= "Ime artikla za babinje")
items_post_args.add_argument("desc", type=str, help= "Opis artikla za babinje")
items_post_args.add_argument("link", type=str, help= "Link na artikl", required=False)

# /api/v1/bde372d8c36a146728d84419179a703f0d1bb63f530e384e/<int:item_id>
class ItemsDeleter(Resource):
    
    @marshal_with(babinje_item_marshaller, envelope="data")
    def delete(self, item_id):
        from . import api_error

        item = db.session.execute(select(BabinjeItem).where(BabinjeItem.id == item_id)).scalar_one_or_none()

        if (item == None):
            return api_error(404, -2023, f"Item ID {item_id} not found!")
        
        item.user = None
        item.user_id = None
        
        db.session.delete(item)
        db.session.commit()

        return True, 200

