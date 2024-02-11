import { useState } from "react";
import { View, Button, Pressable } from "react-native";
import { Text } from "@/components/Themed";
import { Entypo, Ionicons } from "@expo/vector-icons";
import "react-native-get-random-values";
import { useContext, useEffect } from "react";
import { appContext } from "../_layout";
import { toDos } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { appProvider } from "@/types";

type TempType = { name: string; selected: boolean; id: string };
const AddTask = () => {
  const [tasks, setTask] = useState<toDos[]>([
    { name: "Trash", selected: false, id: uuidv4(), child_check: false, parent_check:false, difficulty:2},
    { name: "Clean", selected: false, id: uuidv4(), child_check: false, parent_check:false, difficulty:2},
    { name: "Laundry", selected: false, id: uuidv4(), child_check: false, parent_check:false, difficulty:2},
  ]);

  const [tempTasks, setTempTasks] = useState<toDos[]>()


  const {toDos, addToDo, removeToDo, currentTask, intent, updateIntent, updateTask} = useContext(appContext) as appProvider
  //const [selectedTask, setSelectedTask] = useState<TempType[]>([]);

  useEffect(()=>{
    if (intent == true) {
      removeToDo(currentTask as toDos)
    }
  },[intent])

  return (
    <View>
      <View>
        {tasks.map((task, index) => (
          <Pressable
            key={index}
            onPress={() => {
              task.selected = !task.selected
              task.id = uuidv4()
              setTask([...tasks])
              if (task.selected == true){
                setTempTasks(prevArray => [...(prevArray || []), task])
              }
              if (task.selected == false){
                setTempTasks(tempTasks?.filter(item => item.id != task.id))
              }
            }}
            style={{
              borderWidth: 2,
              
            }}
            onLongPress={() => {}}
          >
            <View
              style={{ backgroundColor: task.selected ? "#FFFFFF" : "#000000" }}
            >
              <Text
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                {task.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View>
        <Button
          onPress={()=> {
              tempTasks?.map((task)=>{addToDo(task)})
              tasks.map((task) => {
                task.selected = false
              })
              setTempTasks([])
            }
          }
          title="+"
        />
      </View>
      <View>
        {toDos?.map((task, id) => (
          <View key={id} style={{flexDirection : "row"}}>
            <Text style={{flex : 1}}>{task.name}</Text>
            <Pressable style={{paddingHorizontal : "2%"}}
              onPress={() =>
                {updateTask(task)
                updateIntent()}}
            >
              <Ionicons name="checkmark" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() =>
                {updateTask(task)
                updateIntent()}
              }
              style={{paddingHorizontal : "2%"}}
            >
              <Entypo name="cross" size={24} color="white" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AddTask;
