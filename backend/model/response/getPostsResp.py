from pydantic import BaseModel
from typing import List

class GetPostsResp(BaseModel):
    posts : List[str]