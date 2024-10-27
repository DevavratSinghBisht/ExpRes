from .baseController import BaseController
from models.request import UserRegReq
from models.response import UserRegResp

from utils import get_encoding

class UserRegController(BaseController):

    def __init__(self):
        super().__init__()

    def forward(self, data: UserRegReq) -> UserRegResp:
        
        super().forward()
        data.password = get_encoding(data.password)

        print("encoded password", data.password)
        
        resp = UserRegResp(status=True)

        return resp

         
        