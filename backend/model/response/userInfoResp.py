from pydantic import BaseModel

class userInfoResp(BaseModel):
    user_id: int
    username: str
    email: Optional[str] = None
    profile_picture: Optional[str] = None
    is_active: bool