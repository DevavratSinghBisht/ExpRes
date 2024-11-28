from .baseController import BaseController
from backend.model.request import GetPostsReq
from backend.model.response import GetPostsResp
from backend.dbConnect.mongoConnect import MongoConnect

class GetPostsController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: GetPostsReq) -> GetPostsResp:
        """
        Retrieve a list of posts.
        """
        super().forward(data)

        resp = self.mongoConnect.getUserPosts(data.username)
        return resp
