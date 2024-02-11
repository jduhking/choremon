import { useState } from "react";
import useItem from "./useItem";

const useShop = () => {
  const [potion, setPotion] = useState(0);
  const [mana, setMana] = useState(0);
  const { getHealPotionCount, getManaPotionCount } = useItem();
  getHealPotionCount().then((val) => {
    setPotion(val);
  });
  getManaPotionCount().then((val) => {
    setMana(val);
  });
  return [potion, mana];
};
export default useShop;
