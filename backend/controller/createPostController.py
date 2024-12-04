from .baseController import BaseController
from model.request import CreatePostReq
from model.response import CreatePostResp
from dbConnect.mongoConnect import MongoConnect
from dbConnect.resDBQueries import ResDBQueries

class CreatePostController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()
        self.resDBQueries = ResDBQueries()

    async def forward(self, data: CreatePostReq) -> CreatePostResp:
        super().forward(data)

        resDB_response = self.resDBQueries.saveMessageinResDB(data.content)

        self.mongoConnect.createPost(data.username, data.content,
                                     resDB_response.transaction_id)
        resp = CreatePostResp(post_status=True)
        return resp
