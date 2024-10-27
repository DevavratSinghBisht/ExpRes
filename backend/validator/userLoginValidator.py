from .baseValidator import BaseValidator
from model.request import UserLoginReq

class UserLoginValidator(BaseValidator):
    
    def __init__(self):
        pass

    def validate(self, data:UserLoginReq):
        '''
        '''
        super().validate()