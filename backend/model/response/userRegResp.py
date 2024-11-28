from pydantic import BaseModel
from typing import Optional

class UserRegResp(BaseModel):
    user_id: int 
    username: str
    email: str
    message: str
    profilePicture: Optional[str] = None 