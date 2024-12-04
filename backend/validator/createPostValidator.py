from .baseValidator import BaseValidator
from model.request import CreatePostReq
from dbConnect.mongoConnect import MongoConnect

class CreatePostValidator(BaseValidator):
    def __init__(self):
        super().__init__()
        self.mongo = MongoConnect()

    async def validate(self, data: CreatePostReq):
        """
        Validates that user_id and content are present.
        """
        self.common_validation()

        if not data.username: 
            raise ValueError("Username cannot be empty")
        
        user = self.mongo.users.find_one({"username": data.user_name})
        if not user:
            raise ValueError(f"Sender username '{data.user_name}' does not exist")
        
        if not data.content :
            raise ValueError("Post content cannot be empty")
