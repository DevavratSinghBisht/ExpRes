from pydantic import BaseModel

class HealthReq(BaseModel):
    health: bool = True