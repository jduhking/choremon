import {
  Action,
  ActionType,
  GameState,
  PlayerInfo,
  appProvider,
} from "@/types";
import {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { appContext } from "../_layout";
import { useRouter } from "expo-router";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { ChoremonData, ChoremonType } from "@/constants/Choremon";
import * as Progress from "react-native-progress";
import useItem from "@/hooks/useItem";

const Game = () => {
  const ws = useMemo(() => {
    return new WebSocket("https://testing.rondevu.app/ws");
  }, []);

  const { maxHealth, id, choremon, level, defense } = useContext(
    appContext
  ) as appProvider;
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

  const opponentMaxHealth = useRef(0);
  const myMaxHealth = useRef(0);

  const [playerHealth, setPlayerHealth] = useState<number | undefined>(
    maxHealth
  );
  const [opponentHealth, setOpponentHealth] = useState<number | undefined>(0);
  const [opponentType, setOpponentType] = useState<ChoremonType | undefined>(
    undefined
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
      id: id,
    };
    ws.send(JSON.stringify(payload));
    // setIsTurn(false)
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
            level: level,
          })
        );
      });
      ws.addEventListener("message", (val) => {
        console.log(typeof val.data);

        const state: GameState = JSON.parse(val.data);
        console.log(state);
        const type = state.type;
        console.log(Object.keys(state));
        console.log("the type is " + type);
        if (state.turn_id == id) {
          setIsTurn(true);
        } else {
          setIsTurn(false);
        }
        const me = state.player_info.filter((player) => player.id === id)[0];
        const them = state.player_info.filter((player) => player.id !== id)[0];

        switch (type) {
          case "init": // the game has begun, set the opponents health
            console.log("Init");
            const opponent: PlayerInfo = state.player_info.filter((player) => {
              return player.id !== id;
            })[0];
            const opponentHealth = opponent.health;
            const opponentType = opponent.type;
            console.log(opponentHealth);
            setOpponentHealth(opponentHealth);
            opponentMaxHealth.current = opponentHealth;
            myMaxHealth.current = me.health;
            setOpponentType(opponentType);
            setWaiting(false);
            break;
          case "continue":
            // check whose turn it is
            const myTurn: boolean = state.turn_id === id;
            if (myTurn) {
              console.log("its my turn");
              console.log(me.health);
              console.log(myMaxHealth.current);

              setPlayerHealth(me.health);
              setOpponentHealth(them.health);

              setIsTurn(true);
            } else {
              // if it is not my turn then deal damage to me if I am attacked
              console.log("its not my turn");
              setOpponentHealth(them.health);
              setPlayerHealth(me.health);

              // setPlayerHealth()
            }
            break;
          case "game_end":
            retrieveLoot(state.loot!)
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

  const [otherAttack, setOtherAttack] = useState("");
  const toggleOtherAttack = () => {
    setOtherAttack(uuidv4());
    setOtherHit("");
  };

  const [otherHit, setOtherHit] = useState("");
  const toggleOtherHit = () => {
    setOtherHit(uuidv4());
    setOtherAttack("");
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

  const { consumePotion, potion, mana, retrieveLoot } = useItem();

  const [itemView, setItemView] = useState(false);
  return (
    <ImageBackground
      style={{ flex: 1, backgroundColor: "white", paddingTop: "20%" }}
      source={require("../../assets/images/backgrounds/Battleground.png")}
    >
      <>
        {!gameEnd ? (
          <>
            <View
              style={{
                flex: 1,
                position: "absolute",
                bottom: "42%",
                left: "10%",
              }}
            >
              {choremon && (
                <>
                  <Progress.Bar
                    progress={playerHealth! / myMaxHealth.current}
                    width={150}
                    height={20}
                    color="#ec273f"
                  />
                  <AnimationView hit={""} attack={attack}>
                    <Image
                      source={choremon.images[(level as number)! - 1] as any}
                      style={{
                        width: 160,
                        height: 160,
                      }}
                    />
                  </AnimationView>
                </>
              )}
            </View>
            <View
              style={{ flex: 1, position: "absolute", top: "23%", right: "5%" }}
            >
              {opponentType && (
                <>
                  <Progress.Bar
                    progress={opponentHealth! / opponentMaxHealth.current}
                    width={150}
                    height={20}
                    color="#5ab552"
                  />
                  <AnimationView hit={hit} attack={otherAttack}>
                    <Image
                      source={
                        ChoremonData[opponentType === "Tony" ? 0 : 1].images[
                          (level as number)! - 1
                        ] as any
                      }
                      width={128}
                      height={128}
                      style={{
                        width: 128,
                        height: 128,
                      }}
                    />
                  </AnimationView>
                </>
              )}
            </View>
          </>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Game Over!</Text>
          </View>
        )}
        {isTurn && (
          <View style={{ position: "absolute", bottom: 5 }}>
            {!itemView ? (
              <View style={{ flexDirection: "row" }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      performAction("attack");
                      toggleAttack();
                    }}
                  >
                    <Image
                      source={require("../../assets/images/buttons/attack.png")}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      performAction("defend");
                    }}
                  >
                    <Image
                      source={require("../../assets/images/buttons/defend.png")}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      performAction("run");
                    }}
                  >
                    <Image
                      source={require("../../assets/images/buttons/run.png")}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setItemView(true);
                    }}
                  >
                    <Image
                      source={require("../../assets/images/buttons/items.png")}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    consumePotion().then(val => {
                      if(val){
                        performAction("heal");
                      }
                    });
                    setItemView(false);
                  }}
                >
                  <Image
                    source={require("../../assets/images/buttons/heal.png")}
                    resizeMode="contain"
                  />
                  <Text>{potion} potions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setItemView(false);
                  }}
                >
                  <Image
                    source={require("../../assets/images/buttons/mana.png")}
                    resizeMode="contain"
                  />
                  <Text>{mana} mana</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </>
    </ImageBackground>
  );
};
export default Game;
