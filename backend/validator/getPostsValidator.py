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

        if not data.username :
            raise ValueError("Username cannot be empty")
        
        if len(data.limit) > 5 : # Optional to keep this
            self.handle_error("Only 5 posts can be fetched at a time")
