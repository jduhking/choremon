import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageSourcePropType,
  ImageBackground,
  Pressable,
} from "react-native";
import { StatusBar, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { appContext } from "../_layout";
import * as Progress from "react-native-progress";
import { appProvider, toDos } from "@/types";
import Checkbox from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";

StatusBar.setBarStyle("dark-content");

const Child = () => {
  const {
    barNum,
    level,
    updateLevel,
    toDos,
    choremon,
    removeToDo,
    updateChildCheck,
  } = useContext(appContext) as appProvider;
  const [selectItem, setSelectItem] = useState<toDos>();
  const [visible, setVisible] = useState(false);
  const [isChecked, setIschecked] = useState<boolean>();
  const router = useRouter();
  const renderItem = ({ item }: { item: toDos }) => {

    let checkedVisible:boolean = false
    return (
      <>
        <TouchableOpacity
          style={{
            width: 128,
            height: 128,
            marginHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            opacity: item.child_check ? 0.5 : 1,
          }}
          disabled={item.child_check}
          onPress={() => {
            setSelectItem(item);
            setVisible(true);
          }}
        >
          <ImageBackground
            source={require("../../assets/images/icons/widget.png")}
            style={{ width: 128, height: 128 }}
          >
            <Image
              source={item.image as any}
              style={{ width: "90%", height: "90%" }}
            />
          </ImageBackground>
        </TouchableOpacity>
        <Modal visible={visible} animationType='slide' transparent={true}>
          <ImageBackground
            style={{
              height: "40%",
              marginTop: "auto",
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
            source={require('../../assets/images/model_photo.jpg')}
            imageStyle={{width:"100%", height:"100%", borderRadius:30, alignItems:'center', justifyContent:'center'}}
          >
            <Text style={{ fontSize: 40, marginBottom: 30 , fontFamily:'Honk', textAlign:'center', flexDirection:'column'}}>
              Mark {selectItem?.name} as done?
              <Text> </Text>
              <TouchableOpacity onPress={()=>{
                    checkedVisible = true
                    updateChildCheck(selectItem as toDos);
                    setVisible(false);
              }}
              style={{marginHorizontal:10}}
              >
                <Image
                    source={require('../../assets/images/yes.png')}
                    style={{width:80, height:60,}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> setVisible(false)}>
                <Image
                    source={require('../../assets/images/no.png')}
                    style={{width:80, height:60,}}
                />
              </TouchableOpacity>
            </Text>
          </ImageBackground>
        </Modal>
      </>
    );
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: "15%",
        paddingHorizontal: "6%",
      }}
      source={require("../../assets/images/backgrounds/background1.png")}
    >
      <View style={{ flex: 5 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 50, fontFamily:'Honk' }}>Choremon</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="account-multiple"
              size={40}
              color="black"
              style={{ paddingRight: 10 }}
            />
            <Link href={"/shop/"}>
              <Entypo name="shop" size={40} color="black" />
            </Link>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 100,
              height: 400,
              flexDirection: "column-reverse",
              alignItems: "center",
            }}
          >
            <Progress.Bar
              progress={barNum}
              color="#cf352e"
              width={300}
              height={40}
              style={{
                transform: [{ rotate: "270deg" }],
                position: "absolute",
                left: -100,
                top: 200,
              }}
            />
            <Text style={{ fontSize: 30 , fontFamily:'Honk', top:-8}}>level {level}</Text>
          </View>
          <View
            style={{
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 50, fontFamily:'Honk' }}>{choremon?.type}</Text>
            {choremon && (
              <Image
                source={choremon.images[(level as number)! - 1] as any}
                width={256}
                height={256}
              />
            )}
          </View>
        </View>
      </View>
      <View style={{ flex: 2.5, alignItems: "center" }}>
        <Text style={{ fontSize: 50, marginBottom: 20, fontFamily:'Honk' }}>Chores</Text>
        {toDos && (
          <FlatList
            data={toDos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal={true}
            style={{ width: "100%", position: "relative" }}
          />
        )}
      </View>
      <View style={{ position: "absolute", bottom: "40%", right: "30%" }}>
        <TouchableOpacity onPress={() => router.push("/game/")}>
            <Image
                source={require('../../assets/images/play.png')}
                style={{width:130, height:60, marginTop:12, left:28}}
            />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Child;
