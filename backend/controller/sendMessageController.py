from .baseController import BaseController
from model.request import SendMessageReq
from model.response import SendMessageResp

class SendMessageController(BaseController):

    def __init__(self):
        super().__init__()

    async def forward(self, data: SendMessageReq) -> SendMessageResp:
        """
        Handle sending a message.
        """
        super().forward(data)

        resp = SendMessageResp(status=True, message_id="mock_message_id")
        return resp
