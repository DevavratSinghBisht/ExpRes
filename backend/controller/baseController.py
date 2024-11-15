from abc import ABC, abstractmethod

class BaseController(ABC):

    def __init__(self):
        super().__init__()

    @abstractmethod
    async def forward(self):
        pass