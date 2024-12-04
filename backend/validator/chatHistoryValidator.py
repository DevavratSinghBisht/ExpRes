from .baseValidator import BaseValidator
from model.request.friendListReq import FriendListReq

class ChatHistoryValidator(BaseValidator):
    def __init__(self):
        pass

    async def validate(self, data: FriendListReq):
        super().validate(data)

        if not data.user_name :
            raise ValueError("Username cannot be empty")