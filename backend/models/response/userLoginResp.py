from pydantic import BaseModel

class UserLoginResp(BaseModel):
    status : bool