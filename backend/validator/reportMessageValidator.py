from .baseValidator import BaseValidator
from backend.model.request import ReportMessageReq

class ReportMessageValidator(BaseValidator):
    def __init__(self):
        pass

    async def validate(self, data: ReportMessageReq):
        """
        Validates that reporter_id, message_id, and reason are present.
        """
        super().validate(data)

        if not data.reporter_username:
            raise ValueError("Repoter username cannot be empty")
        
        if not data.message:
            raise ValueError("Message to be reportedcannot be empty")
        
        if not data.reason:
            raise ValueError("Reason for reporting cannot be empty")
