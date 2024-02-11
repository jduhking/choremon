import { Pressable, StyleSheet, Button} from 'react-native';
import { useContext } from 'react';
import { appContext } from '../_layout';
import { app, appProvider, toDos } from '@/types';
import { truncate } from 'fs';
import useTodo from '@/hooks/usetodo';
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function TabOneScreen() {
  const {width, updateWidth, toDos, addToDo, currentTask, updateTask, removeToDo, intent, updateIntent} = useContext(appContext) as appProvider

  const handler = () => {
    updateWidth(),
    addToDo(
      {
        name:'add',
        id:"1",
        child_check: true,
        parent_check: true,
        difficulty: 1
      }
    )
  }

  if (intent == true) {
    removeToDo(currentTask as toDos),
    updateIntent()
  }
  const {storeTodo, retrieveTodo, deleteTodo} = useTodo()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Link href="/game/">
        <Text>Click here</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
