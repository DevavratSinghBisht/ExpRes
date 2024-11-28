from .baseValidator import BaseValidator
from model.request import SendMessageReq

class SendMessageValidator(BaseValidator):
    def __init__(self):
        pass

    async def validate(self, data: SendMessageReq):
        """
        Validates that sender_id, receiver_id, and message are present.
        """
        super().validate(data)
        if not data.sender_username:
            raise ValueError("Sender ID is required.")
        if not data.receiver_id:
            raise ValueError("Receiver ID is required.")
        if not data.message:
            raise ValueError("Message content is required.")
