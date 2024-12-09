from pydantic import BaseModel

class SendMessageResp(BaseModel):
    message_status : str
    transactionId : str