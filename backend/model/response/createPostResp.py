from pydantic import BaseModel

class CreatePostResp(BaseModel):
    post_status : str