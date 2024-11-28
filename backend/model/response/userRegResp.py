from pydantic import BaseModel

class UserRegResp(BaseModel):
    username: str
    email: str
    message: str
    profilePicture: Optional[str] = None 