from .baseValidator import BaseValidator
from model.request.friendListReq import FriendListReq

class FriendsListValidator(BaseValidator):
    def __init__(self):
        super().__init__()

    async def validate(self, data: FriendListReq):
        """
        Validates that user_id is present.
        """
        self.common_validation()

        if not data.user_name :
            raise ValueError("Username cannot be empty")
