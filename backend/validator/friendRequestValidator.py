from .baseValidator import BaseValidator
from model.request import FriendRequestReq

class FriendRequestValidator(BaseValidator):
    def __init__(self):
        pass

    async def validate(self, data: FriendRequestReq):
        """
        Validates that sender_id and receiver_id are present.
        """
        super().validate(data)
        if not data.sender_username:
            raise ValueError("Sender ID is required.")
        if not data.receiver_id:
            raise ValueError("Receiver ID is required.")
