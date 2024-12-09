from pydantic import BaseModel

class ReportPostReq(BaseModel):
    content     : str
    id          : str
    username    : str