from pydantic import BaseModel

class HealthModel(BaseModel):
    health: bool = True