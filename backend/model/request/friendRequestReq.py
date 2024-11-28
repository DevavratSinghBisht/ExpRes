from pydantic import BaseModel

class FriendRequestReq(BaseModel):
    sender_username: str
    receiver_username: str
    message: str
