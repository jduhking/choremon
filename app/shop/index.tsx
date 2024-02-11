import { View, Text, TouchableOpacity, Image } from "react-native";
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
  } = useShop();

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", paddingHorizontal: "5%" }}>
        <Text style={{ flex: 1, color: "white" }}>Shop</Text>
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
      <View style={{ paddingHorizontal: "5%" }}>
        <TouchableOpacity
          onPress={() => {
            buyPotion();
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderWidth: 1,
              borderColor: "white",
              margin: "10%",
              backgroundColor: "#424242",
            }}
          >
            <Image
              source={require("../../assets/images/icons/potion.png")}
              style={{ width: 96, height: 96 }}
            ></Image>
            <Text style={{ color: "white", padding : "5%" }}>{potionForSale} left</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            buyMana();
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderWidth: 1,
              borderColor: "white",
              margin: "10%",
              backgroundColor: "#424242",
            }}
          >
            <Image
              source={require("../../assets/images/icons/mana.png")}
              style={{ width: 96, height: 96 }}
            ></Image>
            <Text style={{ color: "white" , padding : "5%"}}>{manaForSale} left</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Shop;
