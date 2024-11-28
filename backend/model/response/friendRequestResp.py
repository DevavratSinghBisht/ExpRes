from pydantic import BaseModel

class FriendRequestResp(BaseModel):
    receiver_username : str
    message           : str