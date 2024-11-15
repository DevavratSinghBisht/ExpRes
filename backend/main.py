from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from model.request import HealthReq, UserRegReq, UserLoginReq
from model.response import UserRegResp, UserLoginResp

from validator import UserRegValidator, UserLoginValidator

from controller import UserRegController, UserLoginController

from config import ALLOW_ORIGINS, ALLOW_CREDENTIALS, ALLOW_METHODS, ALLOW_HEADERS

from utils import ChatConnectionManager
from utils import chatHTML

app = FastAPI()
chatConnectionManager = ChatConnectionManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_credentials=ALLOW_CREDENTIALS,
    allow_methods=ALLOW_METHODS,
    allow_headers=ALLOW_HEADERS
)


@app.get('/health')
async def health() -> HealthReq:
    return HealthReq()

@app.post('/userRegister')
async def userRegister(data: UserRegReq) -> UserRegResp:

    # data validation
    validator = UserRegValidator()
    validator.validate(data)

    # logic
    controller = UserRegController()
    resp = controller.forward(data)

    return resp

@app.post('/userLogin')
async def userLogin(data: UserLoginReq) -> UserLoginResp:

    # data validation
    validator = UserLoginValidator()
    validator.validate(data)

    # logic
    controller = UserLoginController()
    resp = controller.forward(data)

    return resp

@app.get("/")
async def get() -> HTMLResponse:
    return HTMLResponse(chatHTML)

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int) -> None:
    await chatConnectionManager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await chatConnectionManager.send_personal_message(f"You wrote: {data}", websocket)
            await chatConnectionManager.broadcast(f"Client #{client_id} says: {data}")
    except WebSocketDisconnect:
        chatConnectionManager.disconnect(websocket)
        await chatConnectionManager.broadcast(f"Client #{client_id} left the chat")