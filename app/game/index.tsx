import { Action, ActionType, GameState } from "@/types";
import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";

const Game = () => {
  const ws = new WebSocket("https://testing.rondevu.app/ws");


  const initialState: GameState = {
    turnId: undefined,
    players: []
  }
  const [gameState, setGameState] = useState<GameState>(initialState);

  const sendAction = (action: Action) => {
    console.log('Send action ' + action.actionType);
    // send action to backend
  }

  const updateGameState = (newState: GameState) => {
    console.log('Receiving state object')
    console.log(newState);
}


  const [playerHealth, setPlayerHealth] = useState<number>();
  const [opponentHealth, setOpponentHealth] = useState<number>();

  const dealDamageToOpponent = (damage: number) => {
    // deal damage to opponent
    setOpponentHealth(opponentHealth! - damage)
    // perform any animations

  }

  const dealDamageToPlayer = (damage: number) => {
    // deal damage to the player
    setPlayerHealth(playerHealth! - damage)
    // perform any animations
  }

  const performAction = (action: ActionType) => {

    // perform the action 

    // possibly do animation
    
  }


  useEffect(() => {
    if (ws) {
      ws.addEventListener("open", (val) => {
        console.log("Connected");

        ws.send(
          JSON.stringify({
            id: "Hello",
          })
        );
      });
      ws.addEventListener("message", (val) => {});
      ws.addEventListener("close", (val) =>{
        console.log("Connection closed");
        
      })
    }
    return () => {ws.close()};
  }, [ws]);

  return (
  <View style={{ flex: 1}}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
    <View >
      <Text>Player</Text>
      <Text>Player Health: {playerHealth}</Text>
    </View>
    <View>
      <Text>Opponent</Text>
      <Text>Opponent Health: {opponentHealth} </Text>
    </View>
    </View>
    <View>
      <Pressable
      onPress={() => performAction("attack")}>
        <Text>Attack</Text>
      </Pressable>
      <Pressable
      onPress={() => performAction("defend")}>
        <Text>Defend</Text>
      </Pressable>
    </View>

  </View>)
};
export default Game;
