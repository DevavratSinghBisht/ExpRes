from .baseValidator import BaseValidator
from model.request.friendListReq import FriendListReq

class FriendsListValidator(BaseValidator):
    def __init__(self):
        pass

    async def validate(self, data: FriendListReq):
        """
        Validates that user_id is present.
        """
        super().validate(data)

        if not data.user_name :
            raise ValueError("Username cannot be empty")
