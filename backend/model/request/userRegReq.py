from pydantic import BaseModel

class UserRegReq(BaseModel):

    firstName   : str
    lastName    : str
    username    : str
    dateOfBirth : str
    contactNo   : int
    email       : str
    password    : str
    password2   : str
    profilePicture : str