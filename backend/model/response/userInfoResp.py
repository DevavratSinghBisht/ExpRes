from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserInfoResp(BaseModel):
    username        : str
    email           : Optional[str] = None
    profile_picture : Optional[str] = None
    is_active       : bool
    created_at      : datetime
    last_login_at   : datetime
    visibility      : bool = False  # Default to False
    followers       : list   # Default to an empty list
    following       : list # Default to an empty list