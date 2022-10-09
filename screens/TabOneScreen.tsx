import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import CustomButton from "../components/CustomButton";
export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      {/*THIS IS WHAT I CODED
      button that displays alert*/}
      <CustomButton onPress={()=> alert('Hello World!')} title = "A Button!"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
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
