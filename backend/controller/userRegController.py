from .baseController import BaseController
from backend.model.request import UserRegReq
from backend.model.response import UserRegResp

from backend.utils import getEncoding

class UserRegController(BaseController):

    def __init__(self):
        super().__init__()

    async def forward(self, data: UserRegReq) -> UserRegResp:
        
        super().forward()
        data.password = getEncoding(data.password)

        print("encoded password", data.password)


        resp = UserRegResp(status=True)

        return resp

         
        