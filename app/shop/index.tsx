import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Shop = () => {
  const currency = 100;
  const healthPotions = 0;
  const mana = 0;
  return (
    <View>
      <View>
        <Text style={{ flex: 1 }}>Shop</Text>
        <View>
          <MaterialIcons name="currency-exchange" size={24} color="black" />
          <Text>{currency}</Text>
        </View>
        <View>
          <FontAwesome5 name="vial" size={24} color="black" />
          <Text>Health: {healthPotions}</Text>
        </View>
        <View>
          <FontAwesome5 name="vial" size={24} color="black" />
          <Text>Mana: {mana}</Text>
        </View>
      </View>
      <View>Hello</View>
    </View>
  );
};
export default Shop;
