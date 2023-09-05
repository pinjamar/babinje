from json import load

class AppConfig:
    secret_key:str = None
    db_filename:str = None
    mail_server:str = None
    mail_port:int = None
    mail_username: str = None
    mail_password: str = None
    mail_use_tls: bool = None
    mail_use_ssl: bool = None
    mail_template_filename: str = None
    def __init__(self, filename: str):
        with open(filename) as config:
            jConfig = load(config)    
            self.secret_key = jConfig["SECRET_KEY"]
            self.db_filename = jConfig["DB_FILENAME"]
            self.mail_server = jConfig["MAIL_SERVER"]
            self.mail_port = jConfig["MAIL_PORT"]
            self.mail_username = jConfig["MAIL_USERNAME"]
            self.mail_password = jConfig["MAIL_PASSWORD"]
            self.mail_use_tls = jConfig["MAIL_USE_TLS"]
            self.mail_use_ssl = jConfig["MAIL_USE_SSL"]
            self.mail_template_filename = jConfig["MAIL_TEMPLATE_FILENAME"]

# TOKEN 1 - #POZDRAV#
class MailBuilder:
    template: str = ""
    def __init__(self, filename: str):
        with open(filename) as email:
            self.template = email.read()
            
    def generate_message(self, name: str, isRegister: bool, item_name: str, url: str):
        akcija_tekst = "Hvala što ste se registrirali za poklon: " + item_name if isRegister else "Žao nam je što ste odustali od poklona: " + item_name
        return self.template.replace("#POZDRAV#", f"Pozdrav, {name}!").replace("#AKCIJA#", akcija_tekst).replace("#HREF#", url)
        