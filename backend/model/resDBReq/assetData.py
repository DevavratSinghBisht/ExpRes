from typing import Optional

from pydantic import BaseModel, Field

class AssetData(BaseModel):
    transactionId: Optional[str]
    sender_username: str
    receiver_username: Optional[str]
    content : str
