from .baseValidator import BaseValidator
from model.request import FriendsListReq

class FriendsListValidator(BaseValidator):
    def __init__(self):
        pass

    async def validate(self, data: FriendsListReq):
        """
        Validates that user_id is present.
        """
        super().validate(data)
        if not data.user_name:
            raise ValueError("User ID is required.")
