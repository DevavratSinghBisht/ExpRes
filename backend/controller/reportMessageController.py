from .baseController import BaseController
from backend.model.request import ReportMessageReq
from backend.model.response import ReportMessageResp
from backend.dbConnect.resDBConnect import ResDBConnect
from backend.dbConnect.mongoConnect import MongoConnect
from backend.dbConnect.resDBQueries import ResDBQueries

class ReportMessageController(BaseController):

    def __init__(self):
        super().__init__()
        self.resDBConnect = ResDBConnect()
        self.mongoConnect = MongoConnect()
        self.resDBQueries = ResDBQueries()

    async def forward(self, data: ReportMessageReq) -> ReportMessageResp:
        super().forward(data)

        post = self.mongoConnect.getPostFromMongo(data.message)
        transaction_id = post.transaction_id

        data = self.resDBQueries.getMessageFromResDB(transaction_id)
        original_transaction_id = data.assetData.transaction_id
        sender_username = data.sender_username

        original_username = (self.mongoConnect.
                             getPostFromMongoThroughId(original_transaction_id))
        self.mongoConnect.blockUsers({sender_username, original_username})

        resp = ReportMessageResp(status=True, message="Report received")
        return resp
