from datetime import datetime
import json
import random
from turtle import position
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

class PlayerAction(BaseModel):
    action : Literal["attack", "defend", "run"]
    id : str

class GameState(BaseModel):
    type : Literal["game_end", "init", "continue"] = Field(default="init")
    player_info : List[PlayerInfo] = Field(default=[])
    game_end : boolean = Field(default=False)
    # timestamp : datetime = Field(default_factory=datetime.utcnow)
    turn_id : str = Field(default="")

class Manager(BaseModel):
    state : GameState = Field(default=GameState())

players : List[Tuple[PlayerInfo, WebSocket]]= []

manager = Manager()

async def broadcast(players: List[Tuple[PlayerInfo, WebSocket]] , message):
    print("message is ")
    print(message)
    for _, sock in players:
        await sock.send_json(message)

@app.websocket("/ws")
async def websoc(websocket : WebSocket):
    await websocket.accept()
    user = await websocket.receive_json()
    
    auth = AuthMessage(**user)
    players.append((PlayerInfo(health=200, id=auth.id), websocket))
    if len(players) >=2:
        current_player = players[0][0]
        manager.state = GameState(type="init", player_info=[player for player, _ in players], turn_id=current_player.id)
        await broadcast(players, manager.state.model_dump())
        print("sent")
        print(manager.state)
    print(players)
   
    
    while True:
        
        print("begin")
        res: PlayerAction = await websocket.receive_json()
        try:
            print("got this message")
            print(res)
            res = PlayerAction(**res)

        except Exception as e:
            print(e)
            print("action parsing failed")
            continue

        if len(players) == 2:
            
            sender = list(filter(lambda x : x[0].id ==res.id, players))[0][0]
            if sender.id != manager.state.turn_id:
                print("Sorry, It is not your turn")
                continue
            
            opponent = list(filter(lambda x : x[0].id != res.id, players))[0][0]
            if res.action == "attack":
                print("attack")
                
                print(bool(opponent))
                attack_strength = random.randint(0, 15)
                opponent.health -= attack_strength
                manager.state = GameState(type="continue", turn_id=opponent.id, player_info=[sender, opponent])
                print(f"attack successful, health is now {opponent.health}")
                broadcast(players, manager.state)
            if res.action == "run":
                rand = random.randint(0, 9)
                if rand < 3:
                    manager.state = GameState(type= "game_end", turn_id=opponent.id, player_info=[sender, opponent], game_end=True)
                    await broadcast(players, manager.state)
                else:
                    manager.state = GameState(type= "continue", turn_id=opponent.id, player_info=[sender, opponent])

            if res.action == "defend":
                manager.state = GameState(type="continue",turn_id=opponent.id, player_info=[sender, opponent])

            if (len(players) < 2):
                continue
            print("Ret")
            print(players)
            
        else:
            print("Not the right amount of people")
    ...