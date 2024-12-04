from typing import Optional

from pydantic import BaseModel, Field
from datetime import datetime

class AssetData(BaseModel):
    transactionId: Optional[str]
    sender_username: str
    receiver_username: Optional[str]
    content : str
