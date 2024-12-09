from pydantic import BaseModel

class UserLoginResp(BaseModel):
    username: str
    login_status: str