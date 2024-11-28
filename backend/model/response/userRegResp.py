from pydantic import BaseModel

class UserRegResp(BaseModel):
    user_id: int 
    username: str
    email: str
    message: str
    profilePicture: Optional[str] = None 