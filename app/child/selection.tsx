import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Choremon, ChoremonData } from '@/constants/Choremon'
import { appContext } from '../_layout';
import { appProvider } from '@/types';
import { useRouter } from 'expo-router';

const screenHeight = Dimensions.get('window').height;

const SelectionScreen = () => {
    const choremons = ChoremonData;
    const {selectChoremon} = useContext(appContext) as appProvider
    const router = useRouter();

    const handleSelection = (choremon: Choremon) => {
        selectChoremon(choremon);
        // go to the child route
        
    }
    const renderItem = ({ item, index } : { item: Choremon, index: number }) => {
        return (
            <TouchableOpacity
            onPress={() => {
                handleSelection(item)
                router.replace('/child/')
            }}>
                <View style={{ justifyContent: 'center', 
                alignItems: 'center'}}>
                    <Text style={{ fontSize: 32}}>{item.type}</Text>
                    <Image 
                    source={item.images[0] as any}
                    />
                </View>
            </TouchableOpacity>
        )
    }
  return (
    <View style={{ flex: 1, paddingTop: screenHeight * 0.2, backgroundColor: 'white', 
    alignItems: 'center'}}>
    <View style={{ marginBottom: '25%'}}>
      <Text 
      style={{ fontSize: 32}}>Select Your Choremon!</Text>
    </View>
      <FlatList 
      data={choremons}
      keyExtractor={(choremon) => { return choremon.type} }
      renderItem={renderItem as any}
      horizontal
      />
    </View>
  )
}

export default SelectionScreen

const styles = StyleSheet.create({})