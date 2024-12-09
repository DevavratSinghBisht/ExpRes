from .baseController import BaseController
from model.request.friendListReq import FriendListReq
from model.response.friendListResp import FriendListResp
from dbConnect.mongoConnect import MongoConnect
from model.response.userInfoResp import UserInfoResp

class FriendsListController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: FriendListReq) -> FriendListResp:
        super().forward()

        followers = self.mongoConnect.getUserFollowers(data.username)
        friends = []
        for follower in followers:
            resp = self.mongoConnect.getUserInfo(follower)
            response = UserInfoResp(username=resp["username"], email=resp["email"],
                                    profile_picture=resp["profilePicture"],
                                    is_banned=resp["isBanned"], created_at=resp["created_at"],
                                    followers=resp["followers"], following=resp["following"],
                                    is_active=True, last_login_at=resp["last_login_at"])
            friends.append(response)

        resp = FriendListResp(friend_list = friends)
        return resp
