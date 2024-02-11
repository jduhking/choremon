import { Pressable, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { appContext } from '../_layout';
import { app, appProvider, toDos } from '@/types';
import { truncate } from 'fs';
import useTodo from '@/hooks/usetodo';
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:30}}>Choose Mode</Text>
      <View style={{width:'100%', height:'10%', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity style={{backgroundColor:'orange', width:"20%", height:40, alignItems:'center', justifyContent:'center', borderRadius:8, marginHorizontal:6}}>
          <Link href="/parent/">
              <Text style={{color:"black"}}>parent</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'blue', width:"20%", height:40, alignItems:'center', justifyContent:'center', borderRadius:8, marginHorizontal:6}}>
          <Link href="/child/">
              <Text>Child</Text>
          </Link>
        </TouchableOpacity>
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
