from pydantic import BaseModel

class UserInfoReq(BaseModel):
    username: str
    isReported: bool
