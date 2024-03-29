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
        from . import api_error
        from .email_service import posalji_mail_materi, send_reservation_confirmed

        item = db.session.execute(select(BabinjeItem).where(BabinjeItem.id == item_id)).scalar_one_or_none()
        user = db.session.execute(select(User).where(User.reset_string == key)).scalar_one_or_none()
        now = datetime.utcnow()

        if item == None or user == None:
            return api_error(400, -1950, "Item is invalid or reset string is invalid")
        
        if now > user.reset_string_expiry:
            return api_error(400, -1953, "Link expired")
        
        if item.user == None:
            item.user = user
            send_reservation_confirmed(item, user)
            posalji_mail_materi(item, user)
        elif item.user != user:
            return api_error(400, -1991, "Cannot mutate to another user on an item")
        else:
            # removing user from item
            item.user = None

        isRegister = item.user != None
        
        user.reset_string = None
        user.reset_string_expiry = None
        db.session.commit()

        return RegisterMutationResult(isRegister, item), 200
