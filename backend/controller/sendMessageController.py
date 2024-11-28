from .baseController import BaseController
from model.request import SendMessageReq
from model.response import SendMessageResp
from utils.connectionManager import ChatConnectionManager

class SendMessageController(BaseController):

    def __init__(self):
        super().__init__()
        self.chat_manager = ChatConnectionManager()

    async def forward(self, data: SendMessageReq) -> SendMessageResp:
        super().forward(data)

        resp = SendMessageResp(status=True, message_id="mock_message_id")
        return resp
