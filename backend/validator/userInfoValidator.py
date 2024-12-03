from .baseValidator import BaseValidator
from model.request import UserInfoReq

class UserInfoValidator(BaseValidator):
    def __init__(self):
        super().__init__()

    async def validate(self, data: UserInfoReq):
        """
        Validates that user_id is present.
        """
        self.common_validation()

        if not data.username:
            raise ValueError("Username cannot be empty")
