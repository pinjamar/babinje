from json import load

class AppConfig:
    secret_key = ""
    db_filename = ""
    def __init__(self, filename: str):
        with open(filename) as config:
            jConfig = load(config)    
            self.secret_key = jConfig["SECRET_KEY"]
            self.db_filename = jConfig["DB_FILENAME"]
