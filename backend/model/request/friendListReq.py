from pydantic import BaseModel

class FriendListReq(BaseModel):
    username: str
