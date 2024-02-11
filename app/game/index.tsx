import { Action, ActionType, GameState, appProvider } from "@/types";
import {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import { View, Text, Pressable, Animated, Button, Image } from "react-native";
import { appContext } from "../_layout";
import { useRouter } from "expo-router";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { ChoremonData, ChoremonType } from "@/constants/Choremon";
const Game = () => {
  const ws = useMemo(() => {
    return new WebSocket("https://testing.rondevu.app/ws");
  }, []);

  const { maxHealth, id, choremon, level, defense } = useContext(appContext) as appProvider;
  const router = useRouter();

  const initialState: GameState = {
    turn_id: undefined,
    game_end: false,
    player_info: [],
    type: "init",
  };
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [waiting, setWaiting] = useState<boolean>(true);
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [isTurn, setIsTurn] = useState<boolean>(false);

  const updateGameState = (newState: GameState) => {
    console.log("Receiving state object");
    console.log(newState);
  };

  const [playerHealth, setPlayerHealth] = useState<number | undefined>(
    maxHealth
  );
  const [opponentHealth, setOpponentHealth] = useState<number | undefined>(0);
  const [opponentType, setOpponentType] = useState<ChoremonType | undefined>(undefined);
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
      id: id,
    };
    ws.send(JSON.stringify(payload));
    setIsTurn(false)
  };

  useEffect(() => {
    if (ws) {
      console.log("Hello");
      ws.addEventListener("open", (val) => {
        console.log("Connected");
        console.log(id);
        ws.send(
          JSON.stringify({
            id: id,
            health: playerHealth,
            defense: defense,
            type: choremon?.type,
            level: level
          })
        );
      });
      ws.addEventListener("message", (val) => {
        console.log(typeof val.data);

        const state: GameState = JSON.parse(val.data);
        console.log(state);
        const type = state.type;
        console.log(Object.keys(state))
        console.log("the type is " + type);
        switch (type) {
          case "init": // the game has begun, set the opponents health
            console.log("Init");
            const opponentHealth = state.player_info.filter((player) => {
              return player.id !== id;
            })[0].health;
            console.log(opponentHealth);
            setOpponentHealth(opponentHealth);
            setWaiting(false);
            break;
          case "continue":
            // check whose turn it is
            const myTurn: boolean = state.turn_id === id;
            if (myTurn) {
              setIsTurn(true);
            } else {
              // if it is not my turn then deal damage to me if I am attacked
              
            }
            break;
          case "game_end":
            // set the game to game over
            setGameEnd(true);
            // get the winner
            // route to the game over screen with the winner.
            router.replace("/gameover/");
            ws.close();
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
  const [attack, setAttack] = useState("");
  const toggleAttack = () => {
    setAttack(uuidv4());
    setHit("");
  };
  const [hit, setHit] = useState("");
  const toggleHit = () => {
    setHit(uuidv4());
    setAttack("");
  };
  const AnimationView = ({
    attack,
    children,
    hit,
  }: {
    attack?: string;
    hit?: string;
    children: ReactNode;
  }) => {
    const opac = useRef(new Animated.Value(1)).current;
    useEffect(() => {
      console.log();

      console.log("anim starting");
      if (attack !== "") {
        Animated.sequence([
          Animated.timing(opac, {
            toValue: 0,
            duration: 1,
            useNativeDriver: true,
          }),
          Animated.timing(opac, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opac, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(opac, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [opac, attack]);

    useEffect(() => {
      console.log(hit);

      if (hit !== "") {
        Animated.sequence([
          Animated.timing(opac, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(opac, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(opac, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(opac, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(opac, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(opac, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [opac, hit]);
    return (
      <Animated.View style={{ flex: 1, opacity: opac }}>
        {children}
      </Animated.View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: '20%' }}>
      {!gameEnd ? (
        <View style={{ flex: 1 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
            {choremon && (
              <Image
                source={choremon.images[(level as number)! - 1] as any}
                width={256}
                height={256}
              />
            )}
              <Text>Player</Text>
              <Text>Player Health: {playerHealth}</Text>
            </View>
            <View>
              {
                opponentType && (
              <Image
                  source={ChoremonData[opponentType === "Tony" ? 0 : 1].images[(level as number)! - 1] as any}
                  width={128}
                  height={128}
                />)
              }
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
            {isTurn && (
              <>
                <Pressable onPress={() => performAction("attack")}>
                  <Text>Attack</Text>
                </Pressable>
                <Pressable onPress={() => performAction("defend")}>
                  <Text>Defend</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Game Over!</Text>
        </View>
      )}
    </View>
  );
};
export default Game;
