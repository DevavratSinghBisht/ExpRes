from pyexpat.errors import messages

from .baseController import BaseController
from model.request.chatHistoryReq import ChatHistoryReq
from model.response.chatHistoryResp import ChatHistoryResp
from dbConnect.mongoConnect import MongoConnect
from dbConnect.resDBQueries import ResDBQueries
from model.response.message import Message
import ast

class ChatHistoryController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()
        self.resDBQueries = ResDBQueries()

    async def forward(self, data: ChatHistoryReq) -> ChatHistoryResp:
        super().forward()

        transactionIds = self.mongoConnect.getTransactionIds(data.sender_username, data.receiver_username)
        messages = []

        for transactionId in transactionIds:
            data = self.resDBQueries.getMessageFromResDB(transactionId)
            # Extract the asset string
            asset_str = data["getTransaction"]["asset"]
            # Convert the string to a dictionary using ast.literal_eval() (safer than eval)
            asset_dict = ast.literal_eval(asset_str)
            content = asset_dict["data"]["content"]
            message = Message(message = content, transactionId = transactionId)
            messages.append(message)

        resp = ChatHistoryResp(messages = messages)
        print(messages)
        return resp
