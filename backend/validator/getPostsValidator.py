from .baseValidator import BaseValidator
from model.request import GetPostsReq

class GetPostsValidator(BaseValidator):
    def __init__(self):
        pass

    async def validate(self, data: GetPostsReq):
        """
        Validates that user_id is present.
        """
        super().validate(data)
        if not data.username:
            raise ValueError("User ID is required.")
