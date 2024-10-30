from abc import ABC, abstractmethod

class BaseValidator(ABC):

    def __init__(self):
        super().__init__()

    @abstractmethod
    async def validate(self):
        '''
        '''
        pass