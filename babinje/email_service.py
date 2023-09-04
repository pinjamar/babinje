from .app_config import MailBuilder
from .babinje_item import User, BabinjeItem

from flask_mail import Mail, Message

mail_builder = MailBuilder("email.html")

mail = Mail()

def send_email(item: BabinjeItem, email: str, isRegister: bool, action_url: str):
    email_contents = mail_builder.generate_message(email, isRegister, item.name, action_url)
    msg = Message("Hvala Vam na odabiru! Potvrdite registraciju" if isRegister else "Žao mi je što odlazite. Potvrdite nam da budemo sigurni", sender="noreply@codebase.hr", recipients=[email])
    msg.html = email_contents
    mail.send(msg)
    return True
