from abc import ABC, abstractmethod
from typing import Any

class BaseValidator(ABC):
    
    def __init__(self):
        super().__init__()

    @abstractmethod
    async def validate(self, data: Any):
        """
        Abstract method to be implemented by child validators.
        Should be used to validate incoming data in the child classes.
        """
        pass

    def handle_error(self, message: str) :
        """
        Handle errors and raise exceptions. This can be overridden if needed
        for custom error handling (logging, etc.)
        """
        raise ValueError(message)

    def common_validation(self) :
        """
        Implement any common validation logic that might be shared across
        different validators. This can be optional or be overridden by child classes.
        """
        print("Performing common validation tasks...")
        return True  # Return True if validation passes
