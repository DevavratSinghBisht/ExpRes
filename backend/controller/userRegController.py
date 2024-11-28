from .baseController import BaseController
from backend.model.request import UserRegReq
from backend.model.response import UserRegResp

from backend.utils import getEncoding
from backend.dbConnect.mongoConnect import MongoConnect


class UserRegController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: UserRegReq) -> UserRegResp:
        
        super().forward()
        data.password = getEncoding(data.password)
        print("encoded password", data.password)

        self.mongoConnect.registerUser(UserRegReq)

        resp = UserRegResp(message="Registration successful")

        return resp

         
        