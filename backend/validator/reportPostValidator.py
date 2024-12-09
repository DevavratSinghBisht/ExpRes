from .baseValidator import BaseValidator
from model.request.reportPostReq import ReportPostReq
from dbConnect.mongoConnect import MongoConnect


class ReportPostValidator(BaseValidator):
    def __init__(self):
        super().__init__()
        self.mongo = MongoConnect()

    async def validate(self, data: ReportPostReq):
        self.common_validation()

        if not data.reporter_username:
            raise ValueError("Repoter username cannot be empty")

        reporter = self.mongo.users.find_one({"username": data.reporter_username})
        if not reporter:
            raise ValueError(f"Reporter username '{data.reporter_username}' does not exist")

        if not data.message:
            raise ValueError("Message to be reported cannot be empty")

        if not data.reason:
            raise ValueError("Reason for reporting cannot be empty")
