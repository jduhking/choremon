import { Action, ActionType, GameState, appProvider } from "@/types";
import { useState, useEffect, useContext, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { appContext } from "../_layout";

const Game = () => {

  const ws = useMemo(() => { 
    return new WebSocket("https://testing.rondevu.app/ws")
  }, []);

  const { maxHealth, id } = useContext(appContext) as appProvider;

  const initialState: GameState = {
    turn_id: undefined,
    game_end: false,
    player_info: [],
    type: "init"
    
  };
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [waiting, setWaiting] = useState<boolean>(true);
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [isTurn, setIsTurn] = useState<boolean>(true);

  const updateGameState = (newState: GameState) => {
    console.log("Receiving state object");
    console.log(newState);
  };

  const [playerHealth, setPlayerHealth] = useState<number | undefined>(
    maxHealth
  );
  const [opponentHealth, setOpponentHealth] = useState<number | undefined>(
    0
  );

  const dealDamageToOpponent = (damage: number) => {
    // deal damage to opponent
    setOpponentHealth(opponentHealth! - damage);
    // perform any animations
  };

  const dealDamageToPlayer = (damage: number) => {
    // deal damage to the player
    setPlayerHealth(playerHealth! - damage);
    // perform any animations
  };

  const performAction = (actionType: ActionType) => {
    // perform the action
    console.log("performing action " + actionType);
    // possibly do animation

    let payload: Action = {
      action: actionType,
      id: id
    }
    ws.send(JSON.stringify(payload))
  };

  useEffect(() => {
    if (ws) {
      console.log('Hello')
      ws.addEventListener("open", (val) => {
        console.log("Connected");
        console.log(id)
        ws.send(
          JSON.stringify({
            id: id,
            health: playerHealth
          })
        );
      });
      ws.addEventListener("message", (val) => {
        console.log(typeof val.data);
        
        const state: GameState = JSON.parse(val.data);
        console.log(state)
        const type = state.type
        console.log('the type is ' + type)
        switch(type){
          case "init": // the game has begun, set the opponents health
            console.log('Init')
            const opponentHealth = state.player_info.filter((player) => { return player.id !== id})[0].health
            console.log(opponentHealth)
            setOpponentHealth(opponentHealth)
            setWaiting(false)
          case "continue": 
            // check whose turn it is
            const myTurn: boolean = state.turn_id === id;
            if(myTurn){
              setIsTurn(true)
            } else {
              // if it is not my turn then deal damage to me
            }
          case "game_end": 
            

            

        }
      });
      ws.addEventListener("close", (val) => {
        console.log("Connection closed");
      });
    }
    return () => {
      ws.close();
    };
  }, [ws]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {
        waiting ? (<View style={{ flex: 1}}>
          <Text style={{ fontSize: 32}}>Waiting for opponent...</Text>
        </View>) : gameEnd ? 
        (<View style={{ flex: 1}}>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <View>
              <Text>Player</Text>
              <Text>Player Health: {playerHealth}</Text>
            </View>
            <View>
              <Text>Opponent</Text>
              <Text>Opponent Health: {opponentHealth} </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: "5%",
            }}
          >
            <Pressable onPress={() => performAction("attack")}>
              <Text>Attack</Text>
            </Pressable>
            <Pressable onPress={() => performAction("defend")}>
              <Text>Defend</Text>
            </Pressable>
          </View>
        </View>) : 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Game Over!</Text>
        </View>
        }

    </View>
  );
};
export default Game;
