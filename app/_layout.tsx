import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, createContext, useState } from 'react';
import { app, toDos, appProvider } from '@/types';


import { useColorScheme } from '@/components/useColorScheme';
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
  const colorScheme = useColorScheme();

  const [toDos, setToDos] = useState<toDos[]>()
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [isParent, setIsparent] = useState<boolean>()
  const [level, setLevel] = useState<number>()

  const addToDo = (task:toDos) => {
    setToDos(prevArrray => prevArrray?.concat(task))
  }

  const removeToDo = (task:toDos) => {
    setToDos(toDos?.filter(item => item.id != task.name))
  }

  const updateWidth = () => {
    setWidth(prev => prev + 1)
  }

  const updateHeight = () => {
    setHeight(prev => prev + 1)
  }

  const updateMode = (userMode:boolean) => {
    setIsparent(userMode)
  }

  const updateLevel = (newLevel:number) => {
    setLevel(newLevel)
  }


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <appContext.Provider value={{
        toDos,
        width,
        height,
        isParent,
        level,
        addToDo,
        removeToDo,
        updateWidth,
        updateHeight,
        updateMode,
        updateLevel
      }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </appContext.Provider>
    </ThemeProvider>
  );
}
