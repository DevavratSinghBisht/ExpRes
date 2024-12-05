from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserInfoResp(BaseModel):
    username        : str
    email           : Optional[str] = None
    profile_picture : Optional[str] = None
    is_active       : bool = False
    created_at      : datetime
    last_login_at   : datetime
    visibility      : bool = False
    followers       : list   # Default to an empty list
    following       : list # Default to an empty list
    is_banned       : bool = False