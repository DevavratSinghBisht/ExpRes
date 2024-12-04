from pydantic import BaseModel
from datetime import datetime


class CreatePostResp(BaseModel):
    post_status : str
    transactionId : str
    content: str
    likes: int
    created_at: datetime