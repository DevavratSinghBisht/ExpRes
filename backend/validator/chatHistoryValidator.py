from .baseValidator import BaseValidator
from model.request.friendListReq import FriendListReq
from dbConnect.mongoConnect import MongoConnect

class ChatHistoryValidator(BaseValidator):
    def __init__(self):
        super().__init__()
        self.mongo = MongoConnect()

    async def validate(self, data: FriendListReq):
        self.common_validation()

        if not data.user_name :
            raise ValueError("Username cannot be empty")
        
        user = self.mongo.users.find_one({"username": data.username})
        if not user:
            raise ValueError(f"Username '{data.username}' does not exist in the database.")

        return True 