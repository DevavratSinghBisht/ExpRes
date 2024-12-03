from pydantic import BaseModel, Field
from datetime import datetime

class AssetData(BaseModel):
    time: datetime = Field(default_factory=datetime.now)  # Automatically sets the current time
    transaction_id: str