from .baseController import BaseController
from model.request import CreatePostReq
from model.response import CreatePostResp

class CreatePostController(BaseController):

    def __init__(self):
        super().__init__()

    async def forward(self, data: CreatePostReq) -> CreatePostResp:
        """
        Handle creating a post.
        """
        super().forward(data)

        resp = CreatePostResp(status=True, post_id="mock_post_id")
        return resp
