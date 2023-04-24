import { StyleSheet, Text, View } from 'react-native';
import DropDown from '../DropDown';
import { useEffect, useState } from 'react';


let hamburger =[{id:1, name: 'View Profile'}, {id:2, name:'Friends'}, {id:3, name:'Logout'}]

export default function NoChatScreen({navigation}) {
    const [selectedItem, setSelectedItem] = useState(null)
        const onSelect = (item) => {
        setSelectedItem(item)
        }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
            <DropDown
                value = {selectedItem}
                data = {hamburger}
                onSelect={onSelect}
                navigation={navigation}
            />
            </View>
            <Text style={styles.messageBold}>
                You are not currently in a chat!
            </Text>
            <Text style={styles.message}>
                A new chat should be created soon!
            </Text>
            <Text style={styles.message}>
                In the meantime, you can check out your Profile or add a few of your friends!
            </Text>
            <Text style={styles.message}>
                Check back soon for your new chat!
            </Text>
        </View>
    )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3B50',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageBold: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    top: 200,
    padding: 10,
    textAlign: 'center'
  },
  message: {
    color: 'darkgrey',
    top: 200,
    textAlign: 'center',
    padding: 8,
    fontSize: 18
  }
});