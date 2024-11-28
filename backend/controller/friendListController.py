from .baseController import BaseController
from model.request.friendListReq import FriendListReq
from model.response.friendListResp import FriendListResp
from dbConnect.mongoConnect import MongoConnect


class FriendsListController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: FriendListReq) -> FriendListResp:
        super().forward(data)

        resp = self.mongoConnect.getUserFollowers(data.username)
        return resp
