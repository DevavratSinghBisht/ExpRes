from pydantic import BaseModel
from typing import List
from model.response.post import Post

class GetPostsResp(BaseModel):
    posts : List[Post]