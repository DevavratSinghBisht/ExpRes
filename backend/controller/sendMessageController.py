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
           print(f"Received message from {data.sender_username} "
                 f"to {data.receiver_username}: {data.message}")


           resDB_resp = self.resDBQueries.saveMessageinResDB(data.message,
                                                             data.sender_username,
                                                             data.receiver_username,
                                                             data.transactionId)

           transaction_id = resDB_resp['postTransaction']['id']

           print("Saved the message into the ResDB :", transaction_id)

           self.mongoConnect.saveMessage(data.sender_username, data.receiver_username, transaction_id)
           print("Saved the message into the MongoDB :", transaction_id)

           response = SendMessageResp(message_status='Message successfully sent.',
                                      transactionId=transaction_id)
           return response

        except Exception as e:
            print(f"Error in SendMessageController.forward: {e}")
            return SendMessageResp(status='Message failed')
