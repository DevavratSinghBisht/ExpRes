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
        self.mongoConnect.blockUsers({data.username})

        self.mongoConnect.deletePost(data.id)
        resp = ReportPostResp(status = "Sucessfully reported")

        return resp