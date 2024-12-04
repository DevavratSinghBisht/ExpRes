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
        super().forward()

        response = self.resDBQueries.savePostinResDB(data.content,
                                                              data.username)

        # Accessing the id
        transaction_id = response['postTransaction']['id']
        post = self.mongoConnect.createPost(data.username, data.content,
                                     transaction_id)

        resp = CreatePostResp(post_status="Successfully posted", transactionId = transaction_id, content=post["content"],
                              likes = 0, created_at = post["created_at"])
        return resp
