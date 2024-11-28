from .baseValidator import BaseValidator
from backend.model.request import ResponseToFriendRequestReq

class ResponseToFriendRequestValidator(BaseValidator):
    def __init__(self):
        pass

    async def validate(self, data: ResponseToFriendRequestReq):
        """
        Validates that reporter_id, message_id, and reason are present.
        """
        super().validate(data)

        if not data.sender_username :
            raise ValueError("Username cannot be empty")
        
        if not data.response_to_request :
            raise ValueError("Response to friend request cannot be empty")