from pydantic import BaseModel

class ResponseToFriendRequestResp(BaseModel):
    response_status : str