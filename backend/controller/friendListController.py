from .baseController import BaseController
from model.request.friendListReq import FriendListReq
from model.response.friendListResp import FriendListResp
from dbConnect.mongoConnect import MongoConnect


class FriendsListController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: FriendListReq) -> FriendListResp:
        super().forward()

        followers = self.mongoConnect.getUserFollowers(data.username)

        resp = FriendListResp(friend_list = followers)
        return resp
