import { useState } from "react";
import { View, Button, Pressable } from "react-native";
import { Text } from "@/components/Themed";
import { Entypo, Ionicons } from "@expo/vector-icons";
import "react-native-get-random-values";

import { v4 as uuidv4 } from "uuid";

type TempType = { name: string; selected: boolean; id: string };
const AddTask = () => {
  const [tasks, setTask] = useState<TempType[]>([
    { name: "Trash", selected: false, id: uuidv4() },
    { name: "Clean", selected: false, id: uuidv4() },
    { name: "Laundry", selected: false, id: uuidv4() },
  ]);
  const [selectedTask, setSelectedTask] = useState<TempType[]>([]);
  return (
    <View>
      <View>
        {tasks.map((task, index) => (
          <Pressable
            key={index}
            onPress={() => {
              const newTask = {
                name: task.name,
                selected: !task.selected,
                id: task.id,
              };
              tasks[index] = newTask;
              setTask([...tasks]);
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
          onPress={() => {
            setSelectedTask([
              ...selectedTask,
              ...tasks.filter((tasks) => tasks.selected == true),
            ]);
            setTask([
              ...tasks.map((task) => {
                return { name: task.name, id: uuidv4(), selected: false };
              }),
            ]);
          }}
          title="+"
        />
      </View>
      <View>
        {selectedTask.map((task, index) => (
          <View key={index} style={{flexDirection : "row"}}>
            <Text style={{flex : 1}}>{task.name}</Text>
            <Pressable style={{paddingHorizontal : "2%"}}>
              <Ionicons name="checkmark" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() =>
                setSelectedTask([
                  ...selectedTask.filter((val) => val.id != task.id),
                ])
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
