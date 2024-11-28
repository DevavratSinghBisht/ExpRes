from .baseController import BaseController
from model.request import UserInfoReq
from model.response import UserInfoResp
from dbConnect.mongoConnect import MongoConnect


class UserInfoController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: UserInfoReq) -> UserInfoResp:
        """
        Retrieve user information.
        """
        super().forward(data)

        # User data retrieval
        resp = self.mongoConnect.getUserInfo(UserInfoReq)
        return resp
