from pydantic import BaseModel
from typing import List

class ReportMessageResp(BaseModel):
    report_status : bool
    transactionId : str