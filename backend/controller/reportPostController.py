from .baseController import BaseController
from model.request.reportPostReq import ReportPostReq
from model.response.reportPostResp import ReportPostResp
from dbConnect.mongoConnect import MongoConnect

class ReportPostController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: ReportPostReq) -> ReportPostResp:
        super().forward()

        resp = ReportPostResp(status = "Sucessfully added")

        return resp