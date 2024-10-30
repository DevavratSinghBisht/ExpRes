from abc import ABC, abstractmethod

class BaseController(ABC):

    def __init__(self):
        super().__init__()

    @abstractmethod
    def forward(self):
        pass