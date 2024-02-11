import { useState } from "react";
import { View, Button, Pressable } from "react-native";
import { Text } from "@/components/Themed";
import { Entypo, Ionicons, Octicons } from "@expo/vector-icons";
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
    <View style={{ alignItems: "center" }}>
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
              const newTask = {
                name: task.name,
                selected: !task.selected,
                id: task.id,
              };
              tasks[index] = newTask;
              setTask([...tasks]);
            }}
            style={{
              width: "95%",
              alignItems: "center",
              paddingVertical: "2%",
              marginVertical: "1%",
              backgroundColor: task.selected ? "#FFA500" : "#000",
              borderRadius: 9,
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

      <View style={{ minWidth: "50%" }}>
        <Pressable
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
          style={{
            paddingVertical: "1%",
            backgroundColor: "#424242",
            alignItems: "center",
            marginVertical: "3%",
            borderRadius: 999,
          }}
        >
          <Octicons name="plus" size={24} color="white" />
        </Pressable>
      </View>
      {selectedTask.length > 0 && (
        <View
          style={{
            width: "70%",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingBottom: "3%",
          }}
        >
          <Text style={{ fontSize: 18 }}>Progress</Text>
        </View>
      )}
      <View
        style={{
          width: "80%",
          backgroundColor: "#424242",
          borderRadius: 5,
          padding: selectedTask.length > 0 ? "2%" : undefined,
        }}
      >
        {selectedTask.map((task, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              paddingVertical: "1%",
              marginVertical: "2%",
              backgroundColor: "#000",
              borderRadius: 9,
            }}
          >
            <Text style={{ flex: 1, paddingLeft: "5%" }}>{task.name}</Text>
            <Pressable style={{ paddingHorizontal: "2%" }}>
              <Ionicons name="checkmark" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() =>
                setSelectedTask([
                  ...selectedTask.filter((val) => val.id != task.id),
                ])
              }
              style={{ paddingHorizontal: "2%" }}
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
