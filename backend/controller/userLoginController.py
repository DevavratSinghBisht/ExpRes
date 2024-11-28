from .baseController import BaseController

from backend.model.request import UserLoginReq
from backend.model.response import UserLoginResp

class UserLoginController(BaseController):

    def __init__(self):
        super().__init__()

    async def forward(self, data: UserLoginReq) -> UserLoginResp:
        super().forward()
        
        resp = UserLoginResp(status=True, message="Login successful")
        return resp