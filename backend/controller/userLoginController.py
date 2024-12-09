from .baseController import BaseController

from model.request import UserLoginReq
from model.response import UserLoginResp
from dbConnect.mongoConnect import MongoConnect
from utils import get_encoding

class UserLoginController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: UserLoginReq) -> UserLoginResp:
        super().forward()
        data.password = get_encoding(data.password)
        status = self.mongoConnect.loginUser(data)

        if status :
            resp = UserLoginResp(username=data.username, login_status="Login successful")
        else :
            resp = UserLoginResp(username=data.username, login_status="Login failed")

        return resp