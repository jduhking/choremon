import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import useShop from "@/hooks/useShop";

const Shop = () => {
  const {
    buyPotion,
    buyMana,
    mana,
    potion: healthPotions,
    currency,
    potionForSale,
    manaForSale,
    manaPrice,
    potionPrice,
  } = useShop();

  return (
    <ImageBackground
      source={require("../../assets/images/backgrounds/Shop.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: "5%",
            paddingTop: "5%",
          }}
        >
          <Text style={{ flex: 1, color: "white" }}></Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/icons/currency.png")}
              style={{ width: 32, height: 32 }}
            ></Image>
            {/* <MaterialIcons name="currency-exchange" size={24} color="white" /> */}
            <Text style={{ color: "white" }}> {currency}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <FontAwesome5 name="vial" size={24} color="white" /> */}
            <Image
              source={require("../../assets/images/icons/potion.png")}
              style={{ width: 32, height: 32 }}
            ></Image>
            <Text style={{ color: "white" }}>H {healthPotions}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <FontAwesome5 name="vial" size={24} color="white" /> */}
            <Image
              source={require("../../assets/images/icons/mana.png")}
              style={{ width: 32, height: 32 }}
            ></Image>
            <Text style={{ color: "white" }}>M {mana}</Text>
          </View>
        </View>
        <View style={{ alignItems: "center", paddingTop: "10%" }}>
          <Text style={{ color: "white" , fontSize : 32}}>SHOP</Text>
        </View>
        <View style={{ paddingHorizontal: "5%" }}>
          <TouchableOpacity
            onPress={() => {
              buyPotion();
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 2,
                  borderColor: "black",
                  margin: "10%",
                  backgroundColor: "white",
                  borderRadius: 9,
                }}
              >
                <Image
                  source={require("../../assets/images/icons/potion.png")}
                  style={{ width: 96, height: 96 }}
                ></Image>
              </View>
              <View style={{ padding: "5%" }}>
                <Text style={{ color: "white", fontSize : 18 }}>Heal Potion</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize : 18 }}>{potionForSale} left</Text>
                  <Image
                    source={require("../../assets/images/icons/currency.png")}
                  />
                  <Text style={{ color: "white", fontSize : 18 }}>{potionPrice}</Text>
                  <View></View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buyMana();
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 2,
                  borderColor: "black",
                  margin: "10%",
                  backgroundColor: "white",
                  borderRadius: 9,
                  paddingBottom: "10%",
                }}
              >
                <View>
                  <Image
                    source={require("../../assets/images/icons/mana.png")}
                    style={{ width: 96, height: 96 }}
                  ></Image>
                </View>
              </View>
              <View style={{ padding: "5%" }}>
                <Text style={{ color: "white" , fontSize : 18}}>Mana Potion</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "white" , fontSize : 18}}>{manaForSale} left</Text>
                  <Image
                    source={require("../../assets/images/icons/currency.png")}
                  />
                  <Text style={{ color: "white" , fontSize : 18}}>{manaPrice}</Text>
                  <View></View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Shop;
