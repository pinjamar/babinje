from datetime import datetime
from flask_restful import Resource, reqparse, abort
from flask import url_for
from .babinje_item import BabinjeItem, User, db, make_email_action_string, make_expiry_date
from .email_service import send_email
from sqlalchemy import select

items_post_args = reqparse.RequestParser()
items_post_args.add_argument("email", type=str, help="Email za registraciju", required=True)
items_post_args.add_argument("name", type=str, help="Ime i prezime osobe", required=False)

def upsert_user(email: str, name: str = None):
    query = select(User).where(User.email == email)
    existing: list[User] = db.session.execute(query).scalar_one_or_none()
    if existing == None:
        existing = User(name=name, email = email)
        db.session.add(existing)
        db.session.commit()
    elif name != None:
        existing.name = name
        db.session.commit()
    return existing

def process_user(item: BabinjeItem, email: str, name: str):
    from . import api_error

    if item.user != None:
        if item.user.email != email:
            api_error(400, -1945, "Drugi korisnik posjeduje ovaj artikl, nemoguće je koristiti s ovim mailom")     
    
    # upsert a user if not existing
    user = upsert_user(email=email, name=name)
    reset_string = make_email_action_string()

    user.reset_string = reset_string
    user.reset_string_expiry = make_expiry_date(15)
    
    db.session.commit()
    return f"confirm/{item.id}/{reset_string}"

from email_validator import validate_email, EmailNotValidError

def check_email(email: str):
    from . import api_error

    try:
        emailinfo = validate_email(email, check_deliverability=False)
        return emailinfo.normalized
    except EmailNotValidError as e:
        api_error(400, -1941, "Email nije valjani email greška 10/4 ")

# Ova operacija šalej email
class UserController(Resource):
    
    def post(self, item_id):
        from . import api_error
        from . import babinje_config

        args = items_post_args.parse_args()
        item: BabinjeItem = BabinjeItem.query.get(item_id)
        mail_candidate = args["email"]
        name = args["name"]
        
        email = check_email(mail_candidate)

        now = datetime.utcnow()
        timeout = make_expiry_date(1)

        if (item.reservation_timeout == None):
            item.reservation_timeout = timeout
            db.session.commit()
        elif now < item.reservation_timeout:
            return api_error(400, -1911, "Artikl je u procesu rezervacije kod drugog korisnika, pričekajte!")
        else:
            item.reservation_timeout = timeout
            db.session.commit()

        url_result = process_user(item, email, name)
        # NASTY URL BUILDING SHITE
        user = upsert_user(email)
        url = babinje_config.my_hostname + "/" + url_result

        if not send_email(item, user, item.user == None, url):
            item.reservation_timeout = None
            item.user = None
            db.session.delete(user)
            db.session.commit()
            api_error(400, -1921, "Greška u slanju emaila. Potvrdite email prije ponovnog pokušaja")

        return {"data": {"refresh_link": url}}, 201
