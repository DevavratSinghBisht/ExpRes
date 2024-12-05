from .baseController import BaseController
from model.response.allUsersResp import AllUsersResp
from dbConnect.mongoConnect import MongoConnect


class AllUsersRespController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self) -> AllUsersResp:
        super().forward()

        # User data retrieval
        users = self.mongoConnect.getAllUsers()

        response = AllUsersResp(users = users)
        return response


