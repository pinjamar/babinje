from urllib.parse import urlparse
from flask_restful import Resource, reqparse, abort, request
from flask import url_for
from .babinje_item import babinje_item_marshaller, BabinjeItem, User, db, make_reset_string, make_expiry_date
from sqlalchemy import select

items_post_args = reqparse.RequestParser()
items_post_args.add_argument("email", type=str, help="Ime artikla za babinje", required=True)

def upsert_user(email: str):
    query = select(User).where(User.email == email)
    existing: list[User] = db.session.execute(query).scalar_one_or_none()
    if existing == None:
        existing = User(email = email)
        db.session.add(existing)
        db.session.commit()        
    return existing


def process_user(item: BabinjeItem, email: str):
    if item.user != None:
        if item.user.email != email:
            abort("This Item is already registered, but not with this user")        
    
    # upsert a user if not existing
    user = upsert_user(email=email)
    reset_string = make_reset_string()

    user.reset_string = reset_string
    user.reset_string_expiry = make_expiry_date()
    
    db.session.commit()
    return f"confirm/{item.id}/{reset_string}"

class UserController(Resource):
    
    def post(self, item_id):
        args = items_post_args.parse_args()
        item = BabinjeItem.query.get(item_id)

        url_result = process_user(item, args["email"])
        # NASTY URL BUILDING SHITE
        url = url_for("static", filename = "", _external=True).replace("/static", "") + url_result

        return {"data": {"refresh_link": url}}, 201
