import React from 'react'
import { Text, View, SafeAreaView, NativeModules } from 'react-native'
import { StatusBar } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

StatusBar.setBarStyle('dark-content')

const {StatusBarManager} = NativeModules;

const Child = () => {

  return (
    <View style={{flex:1, backgroundColor:'white', paddingTop:"15%", paddingHorizontal:'6%'}}>
        <View style={{flex: 5}}>
            <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{fontSize:20}}>Choremon</Text>
                <MaterialCommunityIcons name="account-multiple" size={40} color="black" />
            </View>
        </View>
        <View style={{flex:2.5, backgroundColor:'black'}}>

        </View>
    </View>
  )
}

export default Child