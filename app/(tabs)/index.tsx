import { Pressable, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useContext } from 'react';
import { appContext } from '../_layout';

export default function TabOneScreen() {
  const  width = useContext(appContext)
  const updateWidth = useContext(appContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Pressable style={{width:"30%", height:"10%", backgroundColor:'blue', justifyContent:'center', borderRadius:8, alignItems:'center'}} onPress ={()=>updateWidth}>
        <Text> press me {width}</Text>
      </Pressable>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
