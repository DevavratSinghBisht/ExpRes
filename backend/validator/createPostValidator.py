from .baseValidator import BaseValidator
from model.request import CreatePostReq

class CreatePostValidator(BaseValidator):
    def __init__(self):
        pass

    async def validate(self, data: CreatePostReq):
        """
        Validates that user_id and content are present.
        """
        super().validate(data)
        if not data.username:
            raise ValueError("User ID is required.")
        if not data.content:
            raise ValueError("Post content is required.")
