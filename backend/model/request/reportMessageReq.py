from pydantic import BaseModel

class ReportMessageReq(BaseModel):
    reporter_username: str
    message: str
    reason: str
    reporter_key: str
