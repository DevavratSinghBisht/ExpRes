from pydantic import BaseModel
from typing import List
from model.response.message import Message

class ChatHistoryResp(BaseModel):
    messages : List[Message]