import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import useTodo from "@/hooks/usetodo";

export default function TabOneScreen() {
  const { storeTodo, retrieveTodo, deleteTodo } = useTodo();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
