import { useEffect } from "react";

const Game = () => {
  const ws = new WebSocket("https://testing.rondevu.app/ws");

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
    return;
    () => {ws.close()};
  }, [ws]);
};
export default Game;
