from pydantic import BaseModel

class FriendsListReq(BaseModel):
    username: str
