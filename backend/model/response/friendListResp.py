from pydantic import BaseModel
from typing import List

class friendListResp(BaseModel):
    post_status : List[str]