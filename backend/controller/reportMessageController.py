from .baseController import BaseController
from model.request import ReportMessageReq
from model.response import ReportMessageResp
from dbConnect.resDBConnect import ResDBConnect
from dbConnect.mongoConnect import MongoConnect
from dbConnect.resDBQueries import ResDBQueries
import ast
class ReportMessageController(BaseController):

    def __init__(self):
        super().__init__()
        self.resDBConnect = ResDBConnect()
        self.mongoConnect = MongoConnect()
        self.resDBQueries = ResDBQueries()


    async def forward(self, data: ReportMessageReq) -> ReportMessageResp:
        super().forward()

        response = self.resDBQueries.getMessageFromResDB(data.transactionId)
        asset_str = response["getTransaction"]["asset"]
        asset_dict = ast.literal_eval(asset_str)
        original_sender = asset_dict["data"]["sender_username"]

        self.mongoConnect.blockUsers({data.reported_username, original_sender})
        resp = ReportMessageResp(report_status=True, transactionId=data.transactionId)
        print("User is successfully reported")
        return resp
