import { Action, GameState } from "@/types";
import { useState, useEffect } from "react";

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
  const [opponentHealth, setOpponentHealth] = useState<number>()


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
};
export default Game;
