import { Pressable, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useContext } from 'react';
import { appContext } from '../_layout';
import { app, appProvider, toDos } from '@/types';
import { truncate } from 'fs';

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Pressable style={{width:"30%", height:"10%", backgroundColor:'blue', justifyContent:'center', borderRadius:8, alignItems:'center'}} onPress ={handler}>
        <Text> press me {width}</Text>
      </Pressable>
      {toDos?.map((item)=>(
        <Text 
          style={{color:'white'}}
          key={item.id}
          onPress={
            ()=>{
              updateTask(item)
              updateIntent()
            }}
        >
          {item.name}
        </Text>
      ))}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <View>
        <Button
          onPress={() => {
            storeTodo();
          }}
          title="Test1"
        />
        <Button
          onPress={() => {
            retrieveTodo();
          }}
          title="Test2"
        />
        <Button
          onPress={() => {
            deleteTodo("string2");
          }}
          title="Test3"
        />
      </View>
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
