from .baseController import BaseController
from model.request import FriendsListReq
from model.response import FriendsListResp

class FriendsListController(BaseController):

    def __init__(self):
        super().__init__()

    async def forward(self, data: FriendsListReq) -> FriendsListResp:
        """
        Retrieve a list of friends.
        """
        super().forward(data)

        resp = FriendsListResp(user_id=data.user_id, friends=["friend1", "friend2", "friend3"])
        return resp
