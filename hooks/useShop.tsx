import { useState } from "react";
import useItem from "./useItem";

const useShop = () => {
  const {
    potion,
    mana,
    currency,
    saveHealPotionCount,
    saveCurrency,
    saveManaPotionCount,
  } = useItem();
  const potionPrice = 25;
  const manaPrice = 15;
  const [potionForSale, setPotionForSale] = useState(10);
  const [manaForSale, setManaForSale] = useState(10);
  const buyPotion = () => {
    if (potionForSale <= 0) {
      return;
    }
    if (currency < manaPrice) {
      return;
    }
    setPotionForSale(potionForSale - 1);
    saveHealPotionCount(potion + 1);
    saveCurrency(currency - potionPrice);
  };
  const buyMana = () => {
    if (manaForSale <= 0) {
      return;
    }
    if (currency < manaPrice) {
      return;
    }
    setManaForSale(manaForSale - 1);
    saveManaPotionCount(mana + 1);
    saveCurrency(currency - manaPrice);
  };
  return {
    buyPotion,
    buyMana,
    potion,
    mana,
    currency,
    potionForSale,
    manaForSale,
  };
};
export default useShop;
