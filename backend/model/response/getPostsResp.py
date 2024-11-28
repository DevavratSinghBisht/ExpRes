from pydantic import BaseModel
from typing import List
from post import Post

class GetPostsResp(BaseModel):
    posts : List[Post]