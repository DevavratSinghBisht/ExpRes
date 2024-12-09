from pydantic import BaseModel

class SendMessageReq(BaseModel):
    sender_username: str
    receiver_username: str
    message: str
    isForwarded: bool
    transactionId : str
