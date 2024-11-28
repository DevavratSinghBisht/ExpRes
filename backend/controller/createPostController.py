from .baseController import BaseController
from model.request import CreatePostReq
from model.response import CreatePostResp
from dbConnect.mongoConnect import MongoConnect

class CreatePostController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: CreatePostReq) -> CreatePostResp:
        super().forward(data)

        self.mongoConnect.createPost(data.username, data.content)
        resp = CreatePostResp(post_status=True)
        return resp
