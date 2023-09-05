from flask_restful import Resource, abort, marshal_with
from .babinje_item import User, BabinjeItem, db, babinje_item_marshaller
from sqlalchemy import select
from datetime import datetime
from flask_restful import fields

result_marshaller = {
    "isRegister": fields.Boolean,
    "item": fields.Nested(babinje_item_marshaller)
}
class RegisterMutationResult:
    isRegister: bool = False
    item: BabinjeItem = None
    def __init__(self, isRegister, item):
        self.isRegister = isRegister
        self.item = item

# Ovdje se radi API request sa stranice na webu na koju sleti email
# /api/v1/confirm/<int:item_id>/<string:key>
class MailOperationsController(Resource):

    @marshal_with(result_marshaller, envelope="data")
    def post(self, item_id: int, key: str):
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

        isRegister = item.user != None
        
        user.reset_string = None
        user.reset_string_expiry = None
        db.session.commit()

        return RegisterMutationResult(isRegister, item), 200
