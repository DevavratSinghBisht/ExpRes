from pydantic import BaseModel

class ChatHistoryReq(BaseModel):
    sender_username : str
    receiver_username : str