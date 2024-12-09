from .baseController import BaseController
from model.request import UserRegReq
from model.response import UserRegResp

from utils import get_encoding
from dbConnect.mongoConnect import MongoConnect


class UserRegController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: UserRegReq) -> UserRegResp:
        
        super().forward()
        data.password = get_encoding(data.password)
        print("encoded password", data.password)

        self.mongoConnect.registerUser(data)

        resp = UserRegResp(username=data.username, email=data.email, message="Registration successful")

        return resp

         
        