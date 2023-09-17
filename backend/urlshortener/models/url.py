class Url:
    def __init__(self, user_id, original_url, shortened_url, id=None):
        self.id = id
        self.user_id = user_id
        self.original_url = original_url
        self.shortened_url = shortened_url
