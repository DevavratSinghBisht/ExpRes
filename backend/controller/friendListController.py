from .baseController import BaseController
from backend.model.request.friendListReq import FriendListReq
from backend.model.response.friendListResp import FriendListResp
from backend.dbConnect.mongoConnect import MongoConnect


class FriendsListController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: FriendListReq) -> FriendListResp:
        """
        Retrieve a list of friends.
        """
        super().forward(data)

        resp = self.mongoConnect.getUserFollowers(data.username)
        return resp
