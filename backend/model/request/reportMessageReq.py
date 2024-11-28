from pydantic import BaseModel

class ReportMessageReq(BaseModel):
    reporter_id: str
    message_id: str
    reason: str
