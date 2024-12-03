from .baseValidator import BaseValidator
from model.request import SendMessageReq

class SendMessageValidator(BaseValidator):
    def __init__(self):
        super().__init__()

    async def validate(self, data: SendMessageReq):
        """
        Validates that sender_id, receiver_id, and message are present.
        """
        self.common_validation()

        if not data.sender_username :
            raise ValueError("Sender username cannot be empty")
        
        if not data.receiver_username :
            raise ValueError("Receiver username cannot be empty")
        
        if not data.message :
            raise ValueError("Message content cannot be empty")
