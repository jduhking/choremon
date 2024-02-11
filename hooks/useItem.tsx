import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const useItem = () => {
  const [potion, setPotion] = useState(0);
  const [mana, setMana] = useState(0);
  const [currency, setCurrency] = useState(0);

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
    setPotion(value);
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
    setMana(value);
  };

  const getCurrency = async () => {
    const result = await AsyncStorage.getItem("currency");
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
  const saveCurrency = (value: number) => {
    AsyncStorage.setItem("currency", value.toString());
    setCurrency(value);
  };
  getHealPotionCount().then((val) => {
    setPotion(val);
  });
  getManaPotionCount().then((val) => {
    setMana(val);
  });
  getCurrency().then((val): any => {
    setCurrency(val);
  });
  return {
    getHealPotionCount,
    saveHealPotionCount,
    getManaPotionCount,
    saveManaPotionCount,
    getCurrency,
    saveCurrency,
    potion,
    mana,
    currency,
  };
};

export default useItem;
