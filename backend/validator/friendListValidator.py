from .baseValidator import BaseValidator
from model.request.friendListReq import FriendListReq
from dbConnect.mongoConnect import MongoConnect

class FriendsListValidator(BaseValidator):
    def __init__(self):
        super().__init__()
        self.mongo = MongoConnect()

    async def validate(self, data: FriendListReq):
        """
        Validates that user_id is present.
        """
        self.common_validation()

        if not data.user_name :
            raise ValueError("Username cannot be empty")
        
        user = self.mongo.users.find_one({"username": data.user_name})
        if not user:
            raise ValueError(f"Sender username '{data.user_name}' does not exist")

