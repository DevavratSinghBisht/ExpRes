from model.request import UserRegReq
from .baseValidator import BaseValidator
from pydantic import EmailStr, validator
import re
from datetime import datetime
from dbConnect.mongoConnect import MongoConnect

class UserRegValidator(BaseValidator):
    
    def __init__(self):
        super().__init__()
        self.mongo = MongoConnect()

    async def validate(self, data: UserRegReq):
        '''
        Validate the User Registration Request data.
        '''

        self.common_validation()

        if not data.firstName or len(data.firstName) < 2:
            self.handle_error("First name should have at least 2 characters")
        
        if not data.lastName or len(data.lastName) < 2:
            self.handle_error("Last name should have at least 2 characters")

        if not data.username or len(data.username) < 3:
            self.handle_error("Username should have at least 3 characters")

        # Check this!!!
        
        try: 
            datetime.strptime(data.dateOfBirth, "%Y-%m-%d")
        except ValueError:
            self.handle_error("Invalid date of birth format. Use YYYY-MM-DD")

        if not str(data.contactNo).isdigit() or len(str(data.contactNo)) != 10:
            self.handle_error("Contact number should be a 10-digit number")

        try:
            EmailStr.validate(data.email)  
        except ValueError:
            self.handle_error("Invalid email format")

        if self.mongo.users.find_one({"username": data.username}):
            self.handle_error("Username already exists. Please choose a different one.")

        if self.mongo.users.find_one({"email": data.email}):
            self.handle_error("An account with this email already exists.")

        if not data.password or len(data.password) < 8:
            self.handle_error("Password should be at least 8 characters long")
        
        if data.password != data.password2:
            self.handle_error("Passwords do not match")

        if not self.is_valid_profile_picture(data.profilePicture):
            self.handle_error("Invalid profile picture URL or path")

        return True  # If all validations pass


    def is_valid_profile_picture(self, picture: str) -> bool:
        """
        Helper function to validate profile picture URL or file path.
        This can be extended to match a specific pattern, e.g., URL validation.
        """

        url_pattern = re.compile(r"^(https?:\/\/)?[a-z0-9\-\.]+\.[a-z]{2,3}(\/\S*)?$")
        if re.match(url_pattern, picture):
            return True

        if picture.endswith(('.jpg', '.jpeg', '.png', '.gif')):
            return True
        return False
