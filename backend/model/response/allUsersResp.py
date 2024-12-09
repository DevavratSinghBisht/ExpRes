from pydantic import BaseModel
from typing import List
from model.response.userInfoResp import UserInfoResp

class AllUsersResp(BaseModel):
     users : List[UserInfoResp]