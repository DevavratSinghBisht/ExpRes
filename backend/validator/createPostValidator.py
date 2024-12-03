from .baseValidator import BaseValidator
from model.request import CreatePostReq

class CreatePostValidator(BaseValidator):
    def __init__(self):
        super().__init__()

    async def validate(self, data: CreatePostReq):
        """
        Validates that user_id and content are present.
        """
        self.common_validation()

        if not data.username: 
            raise ValueError("Username cannot be empty")
        
        if not data.content :
            raise ValueError("Post content cannot be empty")
