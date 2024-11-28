from .baseController import BaseController
from model.request import FriendRequestReq
from model.response import FriendRequestResp

class FriendRequestController(BaseController):

    def __init__(self):
        super().__init__()

    async def forward(self, data: FriendRequestReq) -> FriendRequestResp:
        """
        Handle sending a friend request.
        """
        super().forward(data)

        resp = FriendRequestResp(status=True, message="Friend request sent")
        return resp
