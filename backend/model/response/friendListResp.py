from pydantic import BaseModel
from typing import List

class FriendListResp(BaseModel):
    friend_list : List[str]