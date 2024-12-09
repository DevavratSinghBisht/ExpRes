from pydantic import BaseModel
from datetime import datetime


class Post(BaseModel):
    id: str
    content: str
    likes: int
    created_at: datetime
    is_reported: bool = False
    username: str