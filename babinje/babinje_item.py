from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from flask_restful import fields
from os import urandom
from datetime import *
from typing import List

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
    
class BooleanMarshaller(fields.Raw):
    def format(self, mail: int):
        return False if mail == 0 else True

user_marshaller = {
    "id": fields.Integer,
    "email": EmailMarshaller(attribute="email"),
}

babinje_item_marshaller = {
    "id": fields.Integer,
    "name": fields.String,
    "desc": fields.String,
    "user": fields.Nested(user_marshaller, allow_null=True),
    "imgUrl": fields.String(attribute="img_url"),
    "isFungible": BooleanMarshaller(attribute="is_fungible"),
    "isBought": BooleanMarshaller(attribute="is_bought"),
    "priceGrade": fields.String(attribute="price_grade"),
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

def price_grade_from_price(price: float):
    if price < 20:
        return "A"
    
    if price < 50:
        return "B"
    
    if price < 100:
        return "C"
    
    if price < 150:
        return "D"
    
    return "F"

class User(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(1024), nullable=True)
    email: Mapped[str] = mapped_column(String(1024), nullable=False, unique=True)
    reset_string: Mapped[str] = mapped_column(String(48), nullable=True)
    reset_string_expiry: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    items: Mapped[List["BabinjeItem"]] = relationship(back_populates="user")

class BabinjeItem(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    desc: Mapped[str] = mapped_column(String(10000), nullable=True)
    link: Mapped[str] = mapped_column(String(255), nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=True)
    user: Mapped["User"] = relationship(back_populates="items")
    img_url: Mapped[str] = mapped_column(String(255), nullable=True)
    is_fungible: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    reservation_timeout: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    price_grade: Mapped[str] = mapped_column(String(2), nullable=True)
    is_bought: Mapped[int] = mapped_column(Integer, nullable=False, default=0)