from datetime import datetime
from typing import List, Literal, Tuple
from xmlrpc.client import boolean
from fastapi import FastAPI
from fastapi import APIRouter, BackgroundTasks, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field

app = FastAPI()
class AuthMessage(BaseModel):
    id : str

class PlayerInfo(BaseModel):
    health : int
    id : str

class GameState(BaseModel):
    type : Literal["game_end"]
    player_info : List[PlayerInfo]
    game_end : boolean = Field(default=False)
    timestamp : datetime = Field(default_factory=datetime.utcnow)
    turn_id : str

players : List[Tuple[PlayerInfo, WebSocket]]= []
game_state = None
@app.websocket("/ws")
async def websoc(websocket : WebSocket):
    await websocket.accept()
    user = await websocket.receive_json()
    try:
        auth = AuthMessage(**user)
        players.append((PlayerInfo(health=200, id=auth.id), websocket))
        if len(players) >=2:
            current_player = players[0][0]
            game_state = GameState(type="game_end", player_info=[player for player, _ in players], turn_id=current_player.id)
            await websocket.send_text(str(game_state))
        print(players)
    except Exception:
        print("d")
        await websocket.close()
    
    while True:
        
        print("begin")
        res = await websocket.receive()
        if (len(players) < 2):
            continue
        print("Ret")
        print(players)
        if len(players) < 2:
            print("yes")
       
    ...