import AsyncStorage from "@react-native-async-storage/async-storage";

const useItem = () => {
  const getHealPotionCount = async () => {
    const result = await AsyncStorage.getItem("health");
    if (!result) {
      return 0;
    } else {
      try {
        return parseInt(result);
      } catch {
        return 0;
      }
    }
  };
  const saveHealPotionCount = (value: number) => {
    AsyncStorage.setItem("health", value.toString());
  };
  const getManaPotionCount = async () => {
    const result = await AsyncStorage.getItem("mana");
    if (!result) {
      return 0;
    } else {
      try {
        return parseInt(result);
      } catch {
        return 0;
      }
    }
  };
  const saveManaPotionCount = (value: number) => {
    AsyncStorage.setItem("mana", value.toString());
  };
  return {
    getHealPotionCount,
    saveHealPotionCount,
    getManaPotionCount,
    saveManaPotionCount,
  };
};

export default useItem;
