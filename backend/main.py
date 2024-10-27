from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import ALLOW_ORIGINS, ALLOW_CREDENTIALS, ALLOW_METHODS, ALLOW_HEADERS

from models.request import HealthReq, UserRegReq, UserLoginReq
from models.response import UserRegResp, UserLoginResp
from validator import UserRegValidator, UserLoginValidator
from controller import UserRegController, UserLoginController
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_credentials=ALLOW_CREDENTIALS,
    allow_methods=ALLOW_METHODS,
    allow_headers=ALLOW_HEADERS
)


@app.get('/')
def health_check() -> HealthReq:
    return HealthReq()

@app.post('/userRegister')
def userRegister(data: UserRegReq) -> UserRegResp:

    # data validation
    validator = UserRegValidator()
    validator.validate(data)

    # logic
    controller = UserRegController()
    resp = controller.forward(data)

    return resp

@app.post('/userLogin')
def userLogin(data: UserLoginReq) -> UserLoginResp:

    # data validation
    validator = UserLoginValidator()
    validator.validate(data)

    # logic
    controller = UserLoginController()
    resp = controller.forward(data)

    return resp