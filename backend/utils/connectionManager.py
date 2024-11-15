from fastapi import WebSocket

class ChatConnectionManager:
    '''
    Class for managing websocket connections for chatting
    '''
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        '''
        Connects to the given connection
        '''
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        '''
        Disconnets from the given connection
        '''
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        '''
        Sends a message only to the provided connection 
        '''
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        '''
        Broadcasts the message to every connection in the class object
        '''
        for connection in self.active_connections:
            await connection.send_text(message)