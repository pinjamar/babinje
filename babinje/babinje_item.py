from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class BabinjeItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(255))
    desc = db.Column(db.String(10000))