from .baseController import BaseController
from backend.model.request import SendMessageReq
from backend.model.response import SendMessageResp
from backend.utils.connectionManager import ChatConnectionManager
from backend.dbConnect.mongoConnect import MongoConnect
from backend.dbConnect.resDBQueries import ResDBQueries

class SendMessageController(BaseController):

    def __init__(self):
        super().__init__()
        self.chat_manager = ChatConnectionManager()
        self.resDBQueries = ResDBQueries()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: SendMessageReq) -> SendMessageResp:
        try:
            target_connection = next(
                    (conn for conn in self.chat_manager.active_connections
                     if conn.client == data.receiver_username),
                    None
            )

            if target_connection:
                await self.chat_manager.send_personal_message(
                        f"{data.sender_username}: {data.message}", target_connection
                )
            else:
                raise ValueError(f"Receiver {data.receiver_username} is not connected.")

            print(f"Received message from {data.sender_username} to {data.receiver_username}: {data.message}")
            response = SendMessageResp(message_status='Message successfully sent.')

            resDB_resp = self.resDBQueries.saveMessageinResDB(data.message)
            self.mongoConnect.createPost(data.sender_username, data.message,
                                         resDB_resp.transactionId)
            return response

        except Exception as e:
            print(f"Error in SendMessageController.forward: {e}")
            return SendMessageResp(status='Message failed')
