from .baseController import BaseController

from models.request import UserLoginReq
from models.response import UserLoginResp

class UserLoginController(BaseController):

    def __init__(self):
        super().__init__()

    def forward(self, data: UserLoginReq) -> UserLoginResp:
        super().forward()
        
        resp = UserLoginResp(status=True)
        return resp