from flask_restful import Resource, reqparse, marshal_with
from sqlalchemy import select
from .babinje_item import babinje_item_marshaller

item_put_args = reqparse.RequestParser()
item_put_args.add_argument("grade", type=str, help="Razred", required=True)

# /api/v1/bde372d8c36a146728d84419179a703f0d1bb63f530e384e/<int:item_id>
class ItemsDeleter(Resource):

    @marshal_with(babinje_item_marshaller, envelope="data")
    def put(self, item_id):
        from . import api_error
        args = item_put_args.parse_args()

        item = db.session.execute(select(BabinjeItem).where(BabinjeItem.id == item_id)).scalar_one_or_none()

        if (item == None):
            return api_error(404, -2023, f"Item ID {item_id} not found!")
        
        item.price_grade = args["grade"]
        db.session.commit()
        return item, 200

    
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

