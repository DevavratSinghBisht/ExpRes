from pydantic import BaseModel

class UserRegResp(BaseModel):
    status : bool