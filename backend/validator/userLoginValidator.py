from model.request import UserLoginReq
from .baseValidator import BaseValidator
from dbConnect.mongoConnect import MongoConnect

class UserLoginValidator(BaseValidator):

    def __init__(self):
        super().__init__()
        self.mongo = MongoConnect()

    async def validate(self, data: UserLoginReq):

        self.common_validation()

        if not data.username:
            self.handle_error("Username cannot be empty")
        
        if len(data.username) < 3:
            self.handle_error("Username must be at least 3 characters long")
        
        if not data.password:
            self.handle_error("Password cannot be empty")
        
        if len(data.password) < 8:
            self.handle_error("Password must be at least 8 characters long")
        
        user = self.mongo.users.find_one({"username": data.username})
        if not user:
            self.handle_error("Invalid username or user does not exist")
        
        if user["password"] != data.password:
            self.handle_error("Invalid password")

        return True
