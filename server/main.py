from contextlib import asynccontextmanager
from datetime import datetime
import json
import random
from turtle import position
from typing import List, Literal, Tuple
from xmlrpc.client import boolean
from fastapi import FastAPI
from fastapi import APIRouter, BackgroundTasks, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field
from beanie import Document, PydanticObjectId, init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

@asynccontextmanager
async def lifespan(app : FastAPI):
    # before server starts
    print("Hello")
    await init(app)
    yield

    # before server ends
    print("World")
    pass

class Task(Document):
    name: str
    child_check: bool = Field(default=False)
    parent_check: bool = Field(default=False)
    difficulty: int
    ...

async def init(app):
    # connect to mongo
    client = AsyncIOMotorClient("mongodb+srv://hdudsns:Wde6V6mDiOn1jwoI@cluster0.2citqsi.mongodb.net/?retryWrites=true&w=majority")
    db = client.prod 
    await init_beanie(database=db, document_models = [Task], allow_index_dropping=True)
    try:
        info = await client.server_info()
        print(f"success, connected to {info}")
    except Exception as e:
        print(f"Failed with exception {e}")
    pass


app = FastAPI(lifespan=lifespan)
class AuthMessage(BaseModel):
    id : str
    health : int
    type : Literal["Tony" , "Skippy"]
    level : int
    defense : int = Field(default=0)

class PlayerInfo(BaseModel):
    health : int
    id : str
    defense : int = Field(default=0)
    type : Literal["Tony" , "Skippy"]
    level : int

class PlayerAction(BaseModel):
    action : Literal["attack", "defend", "run"]
    id : str

class GameState(BaseModel):
    type : Literal["game_end", "init", "continue"] = Field(default="init")
    player_info : List[PlayerInfo] = Field(default=[])
    game_end : bool = Field(default=False)
    turn_id : str = Field(default="")
    winner : str = Field(default="")

    def to_json(self):
        d = [x.model_dump() for x in self.player_info]
        dum = self.model_dump()
        dum["player_info"] = d
        return dum

class Manager(BaseModel):
    state : GameState = Field(default=GameState())

players : List[Tuple[PlayerInfo, WebSocket]]= []

manager = Manager()

async def broadcast(players: List[Tuple[PlayerInfo, WebSocket]] , message):
    print("message is ")
    print(message)
    for _, sock in players:
        await sock.send_json(message)
        ...

@app.websocket("/ws")
async def websoc(websocket : WebSocket):
    await websocket.accept()
    user = await websocket.receive_json()
    print("user is ")
    print(user)
    auth = AuthMessage(**user)
    players.append((PlayerInfo(health=auth.health, id=auth.id, level=auth.level, type=auth.type), websocket))
    if len(players) >=2:
        current_player = players[0][0]
        manager.state = GameState(type="init", player_info=[player for player, _ in players], turn_id=current_player.id)
        await broadcast(players, manager.state.model_dump())
        print("sent")
        print(manager.state)
    print(players)
   
    
    while True:
        
        print("begin")
        try:
            res: PlayerAction = await websocket.receive_json()
        except Exception:
            return
        try:
            print("got this message")
            print(res)
            res = PlayerAction(**res)

        except Exception as e:
            print(e)
            print("action parsing failed")
            continue

        if len(players) == 2:
            
            sender: PlayerInfo = list(filter(lambda x : x[0].id ==res.id, players))[0][0]
            if sender.id != manager.state.turn_id:
                print("Sorry, It is not your turn")
                continue
            
            opponent = list(filter(lambda x : x[0].id != res.id, players))[0][0]
            if res.action == "attack":
                print("attack")
                
                print(bool(opponent))
                attack_strength = random.randint(0, 3)
                defense = opponent.defense
                opponent.health -= attack_strength + defense
                if opponent.health < 0:
                    manager.state = GameState(type="game_end", turn_id=opponent.id, player_info=[sender, opponent], game_end=True, winner=sender.id)
                else:
                    manager.state = GameState(type="continue", turn_id=opponent.id, player_info=[sender, opponent])
                print(f"attack successful, health is now {opponent.health}")
                # await broadcast(players, manager.state.model_dump())
            elif res.action == "run":
                rand = random.randint(0 , 2 )
                if rand < 3:
                    manager.state = GameState(type= "game_end", turn_id=opponent.id, player_info=[sender, opponent], game_end=True)
                else:
                    manager.state = GameState(type= "continue", turn_id=opponent.id, player_info=[sender, opponent])

            elif res.action == "defend":
                manager.state = GameState(type="continue",turn_id=opponent.id, player_info=[sender, opponent])
            elif res.action == "heal":
                health_gain = 5
                sender.health += health_gain
                manager.state = GameState(type="continue", turn_id=opponent.id, player_info=[sender, opponent])
            await broadcast(players, manager.state.model_dump())
            if (len(players) < 2):
                continue
            print("Ret")
            print(players)
            
        else:
            print("Not the right amount of people")
    ...


@app.get("/tasks")
async def get_tasks() -> List[Task]:
    return await Task.find_all().to_list()

@app.post("/publish")
async def publish_task(task : Task) -> Task:
    await task.save()
    return task

@app.post("/check")
async def check_task(id : str, person : Literal["Parent", "Child"]) -> Task | None:
    task = await Task.get(id)
    if not task:
        return None
    if person == "Child":
        task.child_check = True
    else:
        task.parent_check = True
    await task.save()
    return task

@app.post("/delete")
async def delete_task(id:str) ->Task | None:
    task = await Task.get(id)
    if task:
        await task.delete()
        return task
    return None