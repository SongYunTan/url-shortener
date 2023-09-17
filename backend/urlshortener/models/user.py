class User:
    def __init__(self, id, username, salt, password):
        self.id = id
        self.username = username
        self.salt = salt
        self.password = password
