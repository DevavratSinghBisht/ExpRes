from .baseController import BaseController
from model.request import SendMessageReq
from model.response import SendMessageResp
from utils.connectionManager import ChatConnectionManager
from dbConnect.mongoConnect import MongoConnect
from dbConnect.resDBQueries import ResDBQueries

class SendMessageController(BaseController):

    def __init__(self):
        super().__init__()
        self.chat_manager = ChatConnectionManager()
        self.resDBQueries = ResDBQueries()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: SendMessageReq) -> SendMessageResp:
        try:
           self.chat_manager.connect()
           print(f"Received message from {data.sender_username} "
                 f"to {data.receiver_username}: {data.message}")


           resDB_resp = self.resDBQueries.saveMessageinResDB(data.message,
                                                             data.sender_username,
                                                             data.receiver_username,
                                                             data.transactionId)

           self.mongoConnect.createPost(data.sender_username, data.message,
                                        resDB_resp.transactionId, data.reciever_username)

           response = SendMessageResp(message_status='Message successfully sent.',
                                      transactionId=resDB_resp.transactionId)
           return response

        except Exception as e:
            print(f"Error in SendMessageController.forward: {e}")
            return SendMessageResp(status='Message failed')
