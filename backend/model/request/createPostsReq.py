from pydantic import BaseModel

class CreatePostsReq(BaseModel):
    username: str
    content: str
