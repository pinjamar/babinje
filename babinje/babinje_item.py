from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from flask_restful import fields
from os import urandom
from datetime import *

db = SQLAlchemy()

initial_data = [
    {
        "name": "Baby Sjedalica Joie", 
        "desc": "Sjedalica za auto", 
        "link": "https://www.magicbaby.hr/joie-autosjedalica-i-spin-360-grupa-0-1-0-18-kg-konfigurabilni.html"
    },
    {
        "name": "Hranilica za bebi", 
        "desc": "Ovo se koristi kad baby malo naraste pa da je stavimo na povišeno da može jest s nami", 
        "link": "https://www.magicbaby.hr/kinderkraft-hranilica-sienna-konfigurabilni.html"
    },
    {
        "name": "Mobilni sklopivi baby krevet", 
        "desc": "Za na put", 
        "link": "https://www.babycenter.hr/freeon-prijenosni-krevetic-safari-safari-dvostruko-dno-953856.html"
    }
]

class EmailMarshaller(fields.Raw):
    def format(self, mail: str):
        [pr1, pr2] = mail.split('@')
        pr1 = pr1[0] + '***' + pr1[-1] + '@'
        pr2 = pr2[0] + '**.*' + pr2[-1]

        return pr1 + pr2

user_marshaller = {
    "id": fields.Integer,
    "email": EmailMarshaller(attribute="email"),
}

babinje_item_marshaller = {
    "id": fields.Integer,
    "name": fields.String,
    "desc": fields.String,
    "user": fields.Nested(user_marshaller, allow_null=True),
    "imgUrl": fields.String,
    "isFungible": fields.Boolean,
    "isBought": fields.Boolean,
    "link": fields.String
}

def make_email_action_string():
    return urandom(24).hex()

def make_expiry_date(minutes: int):
    return datetime.utcnow() + timedelta(minutes=minutes)

def create_initial_data(db: SQLAlchemy):
    for args in initial_data:
        new_item = BabinjeItem(name = args["name"], desc=args["desc"], link=args["link"])
        db.session.add(new_item)
    db.session.commit()

class User(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(1024), nullable=True)
    email = Column(String(1024), nullable=False, unique=True)
    reset_string = Column(String(48), nullable=True)
    reset_string_expiry = Column(DateTime, nullable=True)
    items = db.relationship("BabinjeItem", back_populates="user")

class BabinjeItem(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    desc = Column(String(10000), nullable=True)
    link = Column(String(255), nullable=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=True)
    user = db.relationship("User", back_populates="items")
    img_url = Column(String(255), nullable=True)
    is_fungible = Column(Integer, nullable=False, default=0)
    reservation_timeout = Column(DateTime, nullable=True)
    is_bought = Column(Integer, nullable=False, default=0)