from .baseController import BaseController
from dbConnect.mongoConnect import MongoConnect
from dbConnect.resDBQueries import ResDBQueries

class SendTextMessageController(BaseController):

    def __init__(self):
        super().__init__()
        self.resDBQueries = ResDBQueries()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: str, client_info : str) :
        try:
           parts = client_info.split("||")

           # Handle case where transactionId might be missing
           sender_username = parts[0]
           receiver_username = parts[1] if len(parts) > 1 else None
           transactionId = parts[2] if len(parts) > 2 else None
           message = data
           print(f"Received message from {sender_username} "
                 f"to {receiver_username}: {message}")


           resDB_resp = self.resDBQueries.saveMessageinResDB(message,sender_username,
                                                             receiver_username,transactionId)

           transaction_id = resDB_resp['postTransaction']['id']

           self.mongoConnect.saveMessage(data.sender_username, data.reciever_username, transaction_id)

           print("Message transaction saved successfully")

        except Exception as e:
            print(f"Error in SendMessageController.forward: {e}")
            return SendMessageResp(status='Message failed')
