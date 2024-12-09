from pydantic import BaseModel

class FriendRequestReq(BaseModel):
    sender_username: str
    curr_username: str
    status : bool