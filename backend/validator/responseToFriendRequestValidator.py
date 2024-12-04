from .baseValidator import BaseValidator
from model.request import ResponseToFriendRequestReq
from dbConnect.mongoConnect import MongoConnect

class ResponseToFriendRequestValidator(BaseValidator):
    def __init__(self):
        super().__init__()
        self.mongo = MongoConnect()

    async def validate(self, data: ResponseToFriendRequestReq):
        """
        Validates that reporter_id, message_id, and reason are present.
        """
        self.common_validation()

        if not data.sender_username :
            raise ValueError("Username cannot be empty")
        
        sender = self.mongo.users.find_one({"username": data.sender_username})
        if not sender:
            raise ValueError(f"Sender username '{data.sender_username}' does not exist")

        if not data.response_to_request :
            raise ValueError("Response to friend request cannot be empty")