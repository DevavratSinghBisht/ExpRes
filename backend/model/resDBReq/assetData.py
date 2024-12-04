from pydantic import BaseModel, Field
from datetime import datetime

class AssetData(BaseModel):
    time: datetime = Field(default_factory=datetime.now)
    transactionId: str
    sender_username: str
    receiver_username: str
