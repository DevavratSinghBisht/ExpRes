from pydantic import BaseModel

class CreatePostReq(BaseModel):
    username: str
    content: str
    id: str
