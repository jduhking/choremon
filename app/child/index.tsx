import React, {useContext, useEffect, useState} from 'react'
import { Text, View, Image, FlatList, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { StatusBar, Modal } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { appContext } from '../_layout';
import * as Progress from 'react-native-progress'
import { appProvider, toDos } from '@/types'
import Checkbox from 'expo-checkbox';

StatusBar.setBarStyle('dark-content')


const Child = () => {
    const{barNum, level, updateLevel, toDos, removeToDo} = useContext(appContext) as appProvider
    const [selectItem, setSelectItem] = useState<toDos>()
    const [visible, setVisible] = useState(false)
    const [isChecked, setIschecked] = useState<boolean>()

    const renderItem = ({item}: {item: toDos}) => {
        return (
            <>
                <TouchableOpacity style={{width:90, height:90, marginHorizontal:12, borderWidth:3, borderRadius:8, alignItems:'center', justifyContent:'center'}} onPress={()=> {setSelectItem(item) 
                setVisible(true)}}>
                    <Image
                        source={item.image as ImageSourcePropType}
                        style={{width:"90%", height:'90%'}}
                    />
                </TouchableOpacity>
                <Modal
                    visible={visible}
                    animationType='slide'
                    transparent={true}
                >
                    <View style={{height:'40%', backgroundColor:'#D9D9D9', marginTop: 'auto', borderRadius:30, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:20, marginBottom: 15}}>Mark {selectItem?.name} as done?
                        <Text>  </Text>
                        <Checkbox
                            value={item.child_check}
                            onValueChange={()=>{setIschecked(true)
                                removeToDo(selectItem as toDos)
                                setVisible(false)
                                // let timeout

                                // function myFunction() {
                                //     timeout = setTimeout(()=>setVisible(false), 2000);
                                //   }
                            }}
                        />
                        </Text>
                    </View>
                </Modal>
            </>

        );
      };

  return (
    <View style={{flex:1, backgroundColor:'white', paddingTop:"15%", paddingHorizontal:'6%'}}>
        <View style={{flex: 5}}>
            <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{fontSize:20}}>Choremon</Text>
                <MaterialCommunityIcons name="account-multiple" size={40} color="black" />
            </View>
            <View style={{ flexDirection:'row'}}>
                <View style={{ width:100,height:400, flexDirection:'column-reverse', alignItems:'center'}}>
                    <Progress.Bar progress={barNum} width={300} height={40}
                        style={{transform: [{ rotate: '270deg'}], position:'absolute', left:-100, top:200}}
                        />
                    <Text style={{fontSize:20}}>level {level}</Text>
                </View>
                <View style={{width:'70%', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:30, marginBottom:20}}>Taylor</Text>
                    <Image
                        source={require('../../assets/images/c3bd278b8ec64126e0033e1437716616.png')}
                        style={{
                            width:220,
                            height:220
                        }}
                    />
                    
                </View>
            </View>
        </View>
        <View style={{flex:2.5, alignItems:'center'}}>
            <Text style={{fontSize:25, marginBottom:20}}>Chores</Text>
             {toDos && <FlatList
                data={toDos}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                horizontal={true}
                style={{width:'100%', position:'relative'}}
             /> }      
        </View>
    </View>
  )
}

export default Child