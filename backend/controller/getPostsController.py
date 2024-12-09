from .baseController import BaseController
from model.request.getPostsReq import GetPostsReq
from model.response.getPostsResp import GetPostsResp
from dbConnect.mongoConnect import MongoConnect

class GetPostsController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: GetPostsReq) -> GetPostsResp:
        super().forward()

        posts = self.mongoConnect.getUserPosts(data.username)
        print("Fetched posts successfully", posts)

        print(f"Number of posts: {len(posts)}")
        resp = GetPostsResp(posts=posts)
        print("completed")
        return resp
