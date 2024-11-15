from .baseValidator import BaseValidator
from model.request import UserRegReq

class UserRegValidator(BaseValidator):
    
    def __init__(self):
        pass

    async def validate(self, data:UserRegReq):
        super().validate()
        data.password == data.password2