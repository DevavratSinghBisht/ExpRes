from .baseController import BaseController
from model.request import UserInfoReq
from model.response import UserInfoResp

class UserInfoController(BaseController):

    def __init__(self):
        super().__init__()

    async def forward(self, data: UserInfoReq) -> UserInfoResp:
        """
        Retrieve user information.
        """
        super().forward(data)

        # Simulated user data retrieval
        resp = UserInfoResp(user_id=data.user_id, username="mock_user", email="user@example.com")
        return resp
