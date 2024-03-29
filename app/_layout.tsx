import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, createContext, useState } from 'react';
import { app, toDos, appProvider } from '@/types';
import "react-native-get-random-values";
import { v4 as uuidv4, v4 } from "uuid";

import { useColorScheme } from '@/components/useColorScheme';
import { Choremon, ChoremonData } from '@/constants/Choremon';
export const appContext = createContext<appProvider | undefined>(undefined)

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Honk: require('../assets/fonts/Honk-Regular.ttf'),
    Pokemon: require('../assets/fonts/PokemonGb-RAeo.ttf'),
    Bosmatic: require('../assets/fonts/Bosmatic.ttf'),
    Retro: require('../assets/fonts/Retro.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const initialMaxHealth: number = 10;
  const initialDefense: number = 5;
  const initialSpeed: number = 2;

  const colorScheme = useColorScheme();

  const [id, setId] = useState<string>(v4());
  const [choremon, setChoremon] = useState<Choremon | undefined>(undefined)
  const [toDos, setToDos] = useState<toDos[]>()
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [isParent, setIsparent] = useState<boolean>(false)
  const [level, setLevel] = useState<number>(1)
  const [currentTask, setCurrentTask] = useState<toDos>()
  const [intent, setIntent] = useState<boolean>(false)
  const [barNum, setBarNum] = useState<number>(0.0)

  // PLAYER STATS

  const [maxHealth, setMaxHealth] = useState<number>(initialMaxHealth);
  const [defense, setDefense] = useState<number>(initialDefense);
  const [speed, setSpeed] = useState<number>(initialSpeed);

  const addToDo = (tasks:toDos) => {
    setToDos(prevArray => [...(prevArray || []), tasks]);
  }

  const deleteToDo = (task:toDos) => {
    setToDos(toDos?.filter(item => item.id != task.id))
  }

  const removeToDo = (task:toDos) => {
    setToDos(toDos?.filter(item => item.id != task.id))
    let increase = barNum + (task.difficulty/10)
    setBarNum(increase)
    if(increase >= 1){
      updateLevel(increase - 1)
    }
  }

  const updateWidth = () => {
    setWidth(prev => prev + 1)
  }

  const updateHeight = () => {
    setHeight(prev => prev + 1)
  }

  const updateMode = () => {
    setIsparent(prev => !prev)
  }

  const updateLevel = (remainder: number) => {
    setLevel(prev => prev + 1)
    setBarNum(remainder)
  }
  const updateTask = (task:toDos) => {
    setCurrentTask(task)
  }

  const updateIntent = (val:boolean) => {
    setIntent(val)
  }

  const updateChildCheck = (task:toDos) => {
    const updatedItems = toDos?.map(item => {
      if (item.id === task.id) {
        // Return a new object with 'completed' property toggled
        return { ...item, child_check: true };
      }
      // Return unchanged object for other items
      return item;
    });

    // Update state with the new array of items
    setToDos(updatedItems);
  }

  const updateParentCheck = (task:toDos) => {
    const updatedItems = toDos?.map(item => {
      if (item.id === task.id) {
        // Return a new object with 'completed' property toggled
        return { ...item, parent_check: true };
      }
      // Return unchanged object for other items
      return item;
    });

    // Update state with the new array of items
    setToDos(updatedItems);
  }

  const selectChoremon = (choremon: Choremon) => {
    setChoremon(choremon)
  }

  const updateMaxHealth = (newMax: number) => {
    setMaxHealth(newMax);
  }

  const updateDefense = (newDefense: number) => {
    setDefense(newDefense);
  }

  const updateSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
  }

 

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <appContext.Provider value={{
        toDos,
        width,
        height,
        isParent,
        level,
        currentTask,
        intent,
        maxHealth,
        defense,
        speed,
        id,
        barNum,
        choremon,
        addToDo,
        removeToDo,
        updateWidth,
        updateHeight,
        updateMode,
        updateLevel,
        updateTask,
        updateIntent,
        updateMaxHealth,
        updateDefense,
        updateSpeed,
        deleteToDo,
        updateParentCheck,
        updateChildCheck,
        selectChoremon
      }}>
        <Stack screenOptions={{headerShown:false}}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </appContext.Provider>
    </ThemeProvider>
  );
}
