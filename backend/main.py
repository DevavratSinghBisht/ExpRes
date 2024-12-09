from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from model.request import (
    HealthReq, UserRegReq, UserLoginReq, UserInfoReq, FriendListReq,ResponseToFriendRequestReq,
    CreatePostReq, SendMessageReq, GetPostsReq, ReportMessageReq, ChatHistoryReq, ReportPostReq
)

from model.response import (
    UserRegResp, UserLoginResp, UserInfoResp, FriendListResp, ResponseToFriendRequestResp, AllUsersResp,
    CreatePostResp, SendMessageResp, GetPostsResp, ReportMessageResp,ChatHistoryResp, ReportPostResp
)

from validator import (
    UserRegValidator, UserLoginValidator, UserInfoValidator,
    FriendsListValidator, CreatePostValidator, SendMessageValidator, GetPostsValidator,
    ReportMessageValidator, ResponseToFriendRequestValidator, ChatHistoryValidator, ReportPostValidator
)

from controller import (
    UserRegController, UserLoginController, UserInfoController, SendTextMessageController,AllUsersRespController,
    FriendsListController, CreatePostController, SendMessageController, GetPostsController,GetAllPostsController,
    ReportMessageController, ResponseToFriendRequestController, ChatHistoryController, ReportPostController
)


from config import ALLOW_ORIGINS, ALLOW_CREDENTIALS, ALLOW_METHODS, ALLOW_HEADERS

from utils import ChatConnectionManager
from utils import chatHTML

app = FastAPI()
chatConnectionManager = ChatConnectionManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
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
    resp = await controller.forward(data)

    return resp

@app.post('/userLogin')
async def userLogin(data: UserLoginReq) -> UserLoginResp:

    # data validation
    validator = UserLoginValidator()
    validator.validate(data)

    # logic
    controller = UserLoginController()
    resp = await controller.forward(data)

    return resp


@app.post('/getUserInfo')
async def getUserInfo(data: UserInfoReq) -> UserInfoResp:
    # data validation
    validator = UserInfoValidator()
    validator.validate(data)

    # logic
    controller = UserInfoController()
    resp = await controller.forward(data)

    return resp

@app.post('/getAllUsers')
async def getAllUsers() -> AllUsersResp:
    # logic
    controller = AllUsersRespController()
    resp = await controller.forward()

    return resp

@app.post('/getPosts')
async def getPosts(data: GetPostsReq) -> GetPostsResp:
    # data validation
    validator = GetPostsValidator()
    validator.validate(data)

    # logic
    controller = GetPostsController()
    resp = await controller.forward(data)

    return resp

@app.post('/getAllPosts')
async def getAllPosts() -> GetPostsResp:

    # logic
    controller = GetAllPostsController()
    resp = await controller.forward()

    return resp


@app.post('/createPost')
async def createPost(data: CreatePostReq) -> CreatePostResp:
    # data validation
    validator = CreatePostValidator()
    validator.validate(data)

    # logic
    controller = CreatePostController()
    resp = await controller.forward(data)

    return resp

@app.post('/sendMessage')
async def sendMessage(data: SendMessageReq) -> SendMessageResp:
    # data validation
    validator = SendMessageValidator()
    validator.validate(data)

    # logic
    controller = SendMessageController()
    resp = await controller.forward(data)

    return resp

@app.post('/getFriendsList')
async def getFriendsList(data: FriendListReq) -> FriendListResp:
    # data validation
    validator = FriendsListValidator()
    validator.validate(data)

    # logic
    controller = FriendsListController()
    resp = await controller.forward(data)

    return resp


@app.post('/reportTheMessage')
async def reportTheMessage(data: ReportMessageReq) -> ReportMessageResp:
    # data validation
    validator = ReportMessageValidator()
    validator.validate(data)

    # logic
    controller = ReportMessageController()
    resp = await controller.forward(data)

    return resp

@app.post('/responseToFriendRequest')
async def responseToFriendRequest(data: ResponseToFriendRequestReq) -> ResponseToFriendRequestResp:
    # data validation
    validator = ResponseToFriendRequestValidator()
    validator.validate(data)

    # logic
    controller = ResponseToFriendRequestController()
    resp = await controller.forward(data)

    return resp

@app.post('/getChatHistory')
async def getChatHistory(data: ChatHistoryReq) -> ChatHistoryResp:
    # data validation
    validator = ChatHistoryValidator()
    validator.validate(data)

    # logic
    controller = ChatHistoryController()
    resp = await controller.forward(data)

    return resp

@app.post('/reportPost')
async def reportPost(data: ReportPostReq) -> ReportPostResp:
    # data validation
    validator = ReportPostValidator()
    validator.validate(data)

    # logic
    controller = ReportPostController()
    resp = await controller.forward(data)

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