from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from flask_restful import fields
from os import urandom
from datetime import *

db = SQLAlchemy()

user_marshaller = {
    "id": fields.Integer,
    "email": fields.String,
}

babinje_item_marshaller = {
    "id": fields.Integer,
    "name": fields.String,
    "desc": fields.String,
    "user": fields.Nested(user_marshaller, allow_null=True)
}

def make_reset_string():
    return urandom(24).hex()
def make_expiry_date():
    return datetime.utcnow() + timedelta(minutes=15)

class User(db.Model):
    id = Column(Integer, primary_key=True)
    email = Column(String(1024), nullable=False, unique=True)
    reset_string = Column(String(48), nullable=True)
    reset_string_expiry = Column(DateTime, nullable=True)
    items = db.relationship("BabinjeItem", back_populates="user")

class BabinjeItem(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    desc = Column(String(10000), nullable=True)    
    user_id = Column(Integer, ForeignKey('user.id'), nullable=True)
    user = db.relationship("User", back_populates="items")
    img_url = Column(String(255), nullable=True)
    isBought = Column(Integer, nullable=False, default=0)