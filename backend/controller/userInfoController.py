from .baseController import BaseController
from model.request import UserInfoReq
from model.response import UserInfoResp
from dbConnect.mongoConnect import MongoConnect


class UserInfoController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: UserInfoReq) -> UserInfoResp:
        super().forward()

        # User data retrieval
        resp = self.mongoConnect.getUserInfo(data)

        response = UserInfoResp(username = resp["username"],email = resp["email"],
                                profile_picture = resp["profilePicture"],
                                is_banned = False, created_at = resp["created_at"],
                                followers = resp["followers"], following = resp["following"],
                                is_active = True, last_login_at = resp["last_login_at"])
        return response
