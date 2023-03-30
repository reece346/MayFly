import { StyleSheet, Text, View } from 'react-native';
import DropDown from '../DropDown';
import { useEffect, useState } from 'react';


let hamburger =[{id:1, name: 'View Profile'}, {id:2, name:'Friends'}, {id:3, name:'Add Friends'}, {id:4, name:'Logout'}]

export default function NoChatScreen() {
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
            />
            </View>
        </View>
    )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3B50',
    paddingHorizontal: 10,
    paddingBottom: 10,
  }
});