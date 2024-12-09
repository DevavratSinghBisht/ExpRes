from pydantic import BaseModel

class GetPostsReq(BaseModel):
    username: str
    limit: int
