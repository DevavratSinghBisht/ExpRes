from pydantic import BaseModel

class ResponseToFriendRequest(BaseModel):
    sender_username     : str
    response_to_request : bool
