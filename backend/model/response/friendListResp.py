from pydantic import BaseModel
from typing import List
from backend.model.response import UserInfoResp

class FriendListResp(BaseModel):
    friend_list : List[UserInfoResp]