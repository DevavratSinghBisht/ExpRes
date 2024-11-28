from .baseValidator import BaseValidator
from model.request import UserInfoReq

class UserInfoValidator(BaseValidator):
    def __init__(self):
        pass

    async def validate(self, data: UserInfoReq):
        """
        Validates that user_id is present.
        """
        super().validate(data)

        if not data.username:
            raise ValueError("Username cannot be empty")
