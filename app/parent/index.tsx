import { useState } from "react";
import { View, Button, Pressable, SafeAreaView } from "react-native";
import { Text } from "@/components/Themed";
import { Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import "react-native-get-random-values";
import { useContext, useEffect } from "react";
import { appContext } from "../_layout";
import { toDos } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { appProvider } from "@/types";
import { icons } from "@/constants/icons";

type TempType = { name: string; selected: boolean; id: string };
const AddTask = () => {
  const [tasks, setTask] = useState<toDos[]>([
    { image: icons["Trash"],name: "Trash", selected: false, id: uuidv4(), child_check: false, parent_check:false, difficulty:1},
    { image: icons["Mow lawn"], name: "Mow lawn", selected: false, id: uuidv4(), child_check: false, parent_check:false, difficulty:3},
    { image: icons["Laundry"], name: "Laundry", selected: false, id: uuidv4(), child_check: false, parent_check:false, difficulty:2},
    { image: icons["Dishes"], name: "Dishes", selected: false, id: uuidv4(), child_check: false, parent_check:false, difficulty:3},
    { image: icons["Clean Bed"], name: "Clean Bed", selected: false, id: uuidv4(), child_check: false, parent_check:false, difficulty:2},
    { image: icons["Homework"], name: "Homework", selected: false, id: uuidv4(), child_check: false, parent_check:false, difficulty:5},
    { image: icons["Read"], name: "Read", selected: false, id: uuidv4(), child_check: false, parent_check:false, difficulty:3}
  ]);

  const [tempTasks, setTempTasks] = useState<toDos[]>()
  const [remove, setRemove] = useState(false)


  const {toDos, addToDo, removeToDo, currentTask, intent, updateIntent, updateTask, deleteToDo} = useContext(appContext) as appProvider
  //const [selectedTask, setSelectedTask] = useState<TempType[]>([]);

  useEffect(()=>{
    if (intent == true) {
      removeToDo(currentTask as toDos)
      updateIntent(false)
    }
  },[intent])

  useEffect(()=>{
    if (remove == true) {
      deleteToDo(currentTask as toDos)
      setRemove(false)
    }
  },[remove])

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <View style={{ width: "70%", paddingTop: "5%", paddingBottom : "3%" }}>
        <Text style={{ fontSize: 18 }}>Chores</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#424242",
          width: "80%",
          paddingVertical: "2%",
          borderRadius: 9,
        }}
      >
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
              style={{ backgroundColor: task.selected ? "#FFA500" : undefined }}
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
                updateIntent(true)}}
            >
              <Ionicons name="checkmark" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() =>
                {updateTask(task)
                setRemove(true)}
              }
              style={{ paddingHorizontal: "2%" }}
            >
              <Entypo name="cross" size={24} color="white" />
            </Pressable>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default AddTask;
