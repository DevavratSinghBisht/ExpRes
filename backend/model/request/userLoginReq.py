from pydantic import BaseModel

class UserLoginReq(BaseModel):

    username    : str
    password    : str