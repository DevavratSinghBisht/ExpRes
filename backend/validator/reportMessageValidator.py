from .baseValidator import BaseValidator
from model.request import ReportMessageReq

class ReportMessageValidator(BaseValidator):
    def __init__(self):
        pass

    async def validate(self, data: ReportMessageReq):
        """
        Validates that reporter_id, message_id, and reason are present.
        """
        super().validate(data)
        if not data.reporter_username:
            raise ValueError("Reporter ID is required.")
        if not data.message:
            raise ValueError("Message ID is required.")
        if not data.reason:
            raise ValueError("Reason for reporting is required.")
