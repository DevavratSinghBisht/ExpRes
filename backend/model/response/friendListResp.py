from pydantic import BaseModel
from typing import List
from model.response import UserInfoResp

class FriendListResp(BaseModel):
    friend_list : List[UserInfoResp]