from .baseController import BaseController
from backend.model.request import SendMessageReq
from backend.model.response import SendMessageResp
from backend.dbConnect.mongoConnect import MongoConnect

class SendMessageController(BaseController):

    def __init__(self):
        super().__init__()
        self.mongoConnect = MongoConnect()

    async def forward(self, data: SendMessageReq) -> SendMessageResp:
        super().forward(data)

        resp = SendMessageResp(status=True, message_id="mock_message_id")
        return resp
