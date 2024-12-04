from .baseController import BaseController
from model.request import FriendRequestReq
from model.response import FriendRequestResp
from dbConnect.mongoConnect import MongoConnect

class FriendRequestController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: FriendRequestReq) -> FriendRequestResp:
        """
        Handle sending a friend request.
        """
        super().forward()

        if data.status:
           self.mongoConnect.makeUserFollower(data.receiver_username, data.sender_username)
           resp = FriendRequestResp(receiver_username=data.receiver_username,
                                    message="Reciever has become follower of sender")
        else:
           resp = FriendRequestResp(message="Reciever has not become follower")
        return resp
