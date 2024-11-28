from pydantic import BaseModel

class ResponseToFriendRequestReq(BaseModel):
    sender_username     : str
    response_to_request : bool
