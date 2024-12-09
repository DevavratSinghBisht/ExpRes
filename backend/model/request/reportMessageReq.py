from pydantic import BaseModel

class ReportMessageReq(BaseModel):
    reporter_username: str
    reported_username: str
    message: str
    reason: str
    transactionId : str

