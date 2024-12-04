from .baseController import BaseController
from model.request.responseToFriendRequestReq import ResponseToFriendRequestReq
from model.response.responseToFriendRequestResp import ResponseToFriendRequestResp
from dbConnect.mongoConnect import MongoConnect

class ResponseToFriendRequestController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: ResponseToFriendRequestReq) -> ResponseToFriendRequestResp:
        super().forward()

        if data.response_to_request:
           self.mongoConnect.makeUserFollower(data.curr_username, data.sender_username)
           resp = ResponseToFriendRequestResp(response_status = "Sucessfully added")
        else:
           resp = ResponseToFriendRequestResp(response_status="Successfully rejected")
        return resp
