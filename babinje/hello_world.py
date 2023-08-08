from flask_restful import Resource
from .babinje_item import *

class HelloWorld(Resource):
    def get(self):

        i = BabinjeItem(item = "Kolica za automobile", desc="https://www.babycenter.hr/maxi-cosi-autosjedalica-i-size-40-75-cm-pebble-pro-i-size-essenblack-880240.html")
        u = User(email = "brbulic@gmail.com")

        db.session.add(i)
        db.session.add(u)
        db.session.commit()

        last_item = BabinjeItem.query.all()[-1]
        last_user = User.query.all()[-1]

        last_user.item = last_item

        db.session.commit()

        return {"data" : "Hello World"}