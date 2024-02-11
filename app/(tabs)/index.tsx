import { Pressable, StyleSheet, Button, TouchableOpacity, ImageBackground, View, Text, Image} from 'react-native';
import { useContext } from 'react';
import { appContext } from '../_layout';
import { app, appProvider, toDos } from '@/types';
import { truncate } from 'fs';
import useTodo from '@/hooks/usetodo';
import EditScreenInfo from "@/components/EditScreenInfo";
import { Link, useRouter } from "expo-router";

export default function TabOneScreen() {
  
  const {choremon} = useContext(appContext) as appProvider

  const router = useRouter();

  const handleChildRoute = () => {
    if(choremon){
      router.push('/child/')
    } else {
      router.push('/child/selection')
    }
  }
  return (
    <ImageBackground
    style={{ flex: 1, paddingTop: '50%'}}
    source={require('../../assets/images/backgrounds/titlescreen.png')}>
      
      <Text style={{fontSize:64,fontFamily:'Bosmatic', textAlign: 'center'}}><Text style={{fontSize:96,fontFamily:'Honk', textAlign: 'center'}}>C</Text>horemon</Text>
      <View style={{ marginTop: '20%'}}><Text style={{ fontSize: 32, fontFamily: 'Pokemon', textAlign: 'center'}}>
        Are you?</Text></View>
      <View style={{width:'100%', height:'10%', flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginTop: '10%' }}>
        
        <TouchableOpacity style={{backgroundColor:'orange', width:"30%", paddingVertical: '5%', alignItems:'center', paddingHorizontal: '5%', justifyContent:'center', borderRadius:8, marginHorizontal:6}}
        onPress={() => router.push('/parent/')}>
              <Text style={{color:"black",fontFamily: 'Pokemon',}}>parent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'blue', width:"30%", alignItems:'center', justifyContent:'center', borderRadius:8, marginHorizontal:6,
        paddingVertical: '5%'}}
        onPress={handleChildRoute}>
              <Text style={{color:"white",fontFamily: 'Retro' }}>Child</Text>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <Image 
        source={require('../../assets/images/choremons/tonylevel1.png')}
        style={{
          width: 128,
          height: 128
        }}
        />
      </View>
    </ImageBackground>
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
