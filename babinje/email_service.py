from .babinje_item import User, BabinjeItem
from flask_mail import Mail, Message

mail = Mail()

def extract_name(user: User):
    if user.name != None:
        return user.name
    return user.email.split("@")[0]

def send_email(item: BabinjeItem, user: User, isRegister: bool, action_url: str):
    from . import mail_builder

    email_contents = mail_builder.generate_message(extract_name(user=user), isRegister, item.name, action_url)
    msg = Message("Hvala Vam na odabiru! Potvrdite registraciju" if isRegister else "Žao nam je što odlazite. Potvrdite nam da budemo sigurni", sender="noreply@codebase.hr", recipients=[user.email])
    msg.html = email_contents
    try:
        mail.send(msg)
        return True
    except:
        return False
def send_reservation_confirmed(item: BabinjeItem, user: User):
    from . import mail_builder
    contents = mail_builder.generate_confirm_message(extract_name(user=user), item.name, item.link)
    msg = Message("Hvala Vam na potvrdi artikla!", recipients=[user.email], sender="noreply@codebase.hr")
    msg.html = contents
    try:
        mail.send(msg)
        return True
    except:
        return False
    
