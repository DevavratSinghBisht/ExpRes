from pydantic import BaseModel

class GetPostsReq(BaseModel):
    user_name: str
    limit: int
