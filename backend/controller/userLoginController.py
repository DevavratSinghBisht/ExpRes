from .baseController import BaseController

from model.request import UserLoginReq
from model.response import UserLoginResp

class UserLoginController(BaseController):

    def __init__(self):
        super().__init__()

    async def forward(self, data: UserLoginReq) -> UserLoginResp:
        super().forward()
        
        resp = UserLoginResp(status=True)
        return resp