from .baseValidator import BaseValidator
from model.request import UserInfoReq
from dbConnect.mongoConnect import MongoConnect

class UserInfoValidator(BaseValidator):
    def __init__(self):
        super().__init__()
        self.mongo = MongoConnect()

    async def validate(self, data: UserInfoReq):
        """
        Validates that user_id is present.
        """
        self.common_validation()

        if not data.username:
            raise ValueError("Username cannot be empty")

        user = self.mongo.users.find_one({"username": data.username})
        if not user:
            self.handle_error("Invalid username or user does not exist")
