from .baseValidator import BaseValidator
from model.request import FriendRequestReq
from dbConnect.mongoConnect import MongoConnect

class FriendRequestValidator(BaseValidator):
    def __init__(self):
        super().__init__()
        self.mongo = MongoConnect()

    async def validate(self, data: FriendRequestReq):
        """
        Validates that sender_id and receiver_id are present.
        """
        self.common_validation()

        if not data.sender_username :
            raise ValueError("Sender name cannot be empty")
        
        sender = self.mongo.users.find_one({"username": data.sender_username})
        if not sender:
            raise ValueError(f"Sender username '{data.sender_username}' does not exist")
        
        if not data.receiver_id :
            raise ValueError("Receiver name cannot be empty")
        
        receiver = self.mongo.users.find_one({"Receiver username": data.receiver_id})
        if not receiver:
            raise ValueError(f"Receiver username '{data.receiver_id}' does not exist")
