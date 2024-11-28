from .baseController import BaseController

from backend.model.request import UserLoginReq
from backend.model.response import UserLoginResp
from backend.dbConnect.mongoConnect import MongoConnect

class UserLoginController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: UserLoginReq) -> UserLoginResp:
        super().forward()

        status = self.mongoConnect.loginUser(UserLoginReq)

        if status :
            resp = UserLoginResp(username=data.username, login_status="Login successful")
        else :
            resp = UserLoginResp(username=data.username, login_status="Login failed")
        return resp