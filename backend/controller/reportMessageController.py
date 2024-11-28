from .baseController import BaseController
from model.request import ReportMessageReq
from model.response import ReportMessageResp

class ReportMessageController(BaseController):

    def __init__(self):
        super().__init__()

    async def forward(self, data: ReportMessageReq) -> ReportMessageResp:
        """
        Handle reporting a message.
        """
        super().forward(data)

        resp = ReportMessageResp(status=True, message="Report received")
        return resp
