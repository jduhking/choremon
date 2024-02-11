import { useState } from "react";
import { View, Button, Pressable, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Image , ImageBackground} from "react-native";
import { Text } from "@/components/Themed";
import { Entypo, Ionicons, Octicons, FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import "react-native-get-random-values";
import { useContext, useEffect } from "react";
import { appContext } from "../_layout";
import { toDos } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { appProvider } from "@/types";

StatusBar.setBarStyle('dark-content')

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
    <ImageBackground style={{ alignItems: "center", flex:1}} source={require('../../assets/images/parentsbackground.png')}>
      <View style={{marginTop: "12%", alignItems:'center', backgroundColor:'white',}}>
        <Text style={{ fontFamily:'Honk', color:"#E31B4D", fontSize:60, fontWeight:'700' }}>Chores</Text>
      </View>
      <View
        style={{
          alignItems: "center",
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
              marginVertical: 10,
              width:'95%',
              height:40,
              alignItems:'center',
              justifyContent:'center',
              borderRadius:9,
              backgroundColor:'white'
            }}
          >
            <View
              style={{ backgroundColor: task.selected ? "#FFA500" : undefined , width:"100%", height:'100%', alignItems:'center',justifyContent:'center',borderRadius:6}}
            >
              <Image
                source={require('../../assets/images/box.png')}
                style={{width:"115%", height:"160%", position:'absolute', objectFit:'fill', right:-30, left:-21}}
              />
              <Text
                style={{color:'black', fontSize:15, fontFamily:'Pokemon', fontWeight:'600'}}
              >
                {task.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View>
        <TouchableOpacity
                    onPress={()=> {
                      tempTasks?.map((task)=>{addToDo(task)})
                      tasks.map((task) => {
                        task.selected = false
                      })
                      setTempTasks([])
                    }
                  }
        >
              <Image
                source={require('../../assets/images/plus.png')}
                style={{width:40, height:40, marginBottom:2}}
              />
        </TouchableOpacity>

      </View>
      <View style={{ marginTop: 5}}>
        {toDos?.map((task, id) => (
          <View key={id} style={{flexDirection : "row", width:'80%', backgroundColor:'#D9D9D9', marginBottom:10, height:40, alignItems:'center', paddingHorizontal:20, borderRadius:10}}>
              <Image
                source={require('../../assets/images/solid.png')}
                style={{width:"120%", height:"120%", position:'absolute', objectFit:'fill', right:-7}}
              />
            <Text style={{flex : 1, color: 'black', fontSize:15, fontFamily:'Pokemon', paddingLeft:9, paddingTop:5}}>{task.name}
            <Text> </Text>
            </Text>
            <Pressable
              onPress={() =>
                {updateTask(task)
                updateIntent(true)}}
            >
              <Image
                source={require('../../assets/images/thumbs.png')}
                style={{width:40, height:40}}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                {updateTask(task)
                setRemove(true)}
              }
              style={{ paddingHorizontal: "2%" }}
            >
              <Image
                source={require('../../assets/images/trash.png')}
                style={{width:40, height:40}}
              />
            </Pressable>
          </View>
        ))}
      </View>
    </ImageBackground>
  );
};

export default AddTask;
