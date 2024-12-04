from .baseValidator import BaseValidator
from model.request import GetPostsReq
from dbConnect.mongoConnect import MongoConnect

class GetPostsValidator(BaseValidator):
    def __init__(self):
        super().__init__()
        self.mongo = MongoConnect()

    async def validate(self, data: GetPostsReq):
        """
        Validates that user_id is present.
        """
        self.common_validation()

        if not data.username :
            raise ValueError("Username cannot be empty")
        
        user = self.mongo.users.find_one({"username": data.username})
        if not user:
            raise ValueError(f"Username '{data.username}' does not exist")
        
        if len(data.limit) > 5 : # Optional to keep this
            self.handle_error("Only 5 posts can be fetched at a time")
