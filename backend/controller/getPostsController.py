from .baseController import BaseController
from model.request import GetPostsReq
from model.response import GetPostsResp

class GetPostsController(BaseController):

    def __init__(self):
        super().__init__()

    async def forward(self, data: GetPostsReq) -> GetPostsResp:
        """
        Retrieve a list of posts.
        """
        super().forward(data)

        resp = GetPostsResp(posts=[{"post_id": "1", "content": "Hello World"}, {"post_id": "2", "content": "Another Post"}])
        return resp
