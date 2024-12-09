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
        try:
            await websocket.accept()
            self.active_connections.append(websocket)
        except Exception as e:
            print(f"Error while connecting: {e}")

    def disconnect(self, websocket: WebSocket):
        try:
            if websocket in self.active_connections:
                self.active_connections.remove(websocket)
        except Exception as e:
            print(f"Error while disconnecting: {e}")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        try:
            if websocket in self.active_connections:
                await websocket.send_text(message)
        except Exception as e:
            print(f"Error while sending personal message: {e}")
            self.disconnect(websocket)

    async def broadcast(self, message: str):
        '''
        Broadcasts the message to every connection in the class object
        '''
        for connection in self.active_connections[:]:  # Create a copy to avoid mutation issues
            try:
                await connection.send_text(message)
            except Exception as e:
                print(f"Error while broadcasting to {connection.client}: {e}")
                self.disconnect(connection)
