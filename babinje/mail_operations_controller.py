from flask_restful import Resource, abort, marshal_with
from .babinje_item import User, BabinjeItem, db, babinje_item_marshaller
from sqlalchemy import select
from datetime import datetime

class MailOperationsController(Resource):

    @marshal_with(babinje_item_marshaller, envelope="data")
    def get(self, item_id: int, key: str):
        item = db.session.execute(select(BabinjeItem).where(BabinjeItem.id == item_id)).scalar_one_or_none()
        user = db.session.execute(select(User).where(User.reset_string == key)).scalar_one_or_none()
        now = datetime.utcnow()

        if item == None or user == None:
            abort("Item is invalid or reset string is invalid")
        
        if now > user.reset_string_expiry:
            abort("Link expired")
        
        if item.user == None:
            item.user = user
        elif item.user != user:
            abort("Cannot mutate another user on an element")
        else:
            # removing user from item
            item.user = None
        
        user.reset_string = None
        user.reset_string_expiry = None
        db.session.commit()

        return item, 200
