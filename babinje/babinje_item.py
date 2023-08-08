from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey

db = SQLAlchemy()

class User(db.Model):
    id = Column(Integer, primary_key=True)
    email = Column(String(1024), nullable=False, unique=True)
    reset_string = Column(String(48), nullable=True)
    operation = Column(String(10), nullable=True, unique=False)    
    item = db.relationship("BabinjeItem", backref="owning", uselist=False)    

class BabinjeItem(db.Model):
    id = Column(Integer, primary_key=True)
    item = Column(String(255), nullable=False)
    desc = Column(String(10000), nullable=True)
    assigned_on = Column(DateTime, nullable=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=True)