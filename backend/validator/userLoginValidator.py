from model.request import UserLoginReq
from .baseValidator import BaseValidator

class UserLoginValidator(BaseValidator):

    def __init__(self):
        super().__init__()

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
        
        return True
