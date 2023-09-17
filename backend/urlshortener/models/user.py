class User:
    def __init__(self, username, salt, password, id=None):
        self.id = id
        self.username = username
        self.salt = salt
        self.password = password
