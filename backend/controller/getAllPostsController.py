from .baseController import BaseController
from dbConnect.mongoConnect import MongoConnect
from model.response.getPostsResp import GetPostsResp

class GetAllPostsController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()


    async def forward(self) -> GetPostsResp:
        super().forward()

        posts = self.mongoConnect.getAllPosts()
        print("Fetched posts successfully", posts)

        print(f"Number of posts: {len(posts)}")
        resp = GetPostsResp(posts=posts)
        print("completed")
        return resp
