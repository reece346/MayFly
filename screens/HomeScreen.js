import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, RefreshControl, TouchableWithoutFeedback, Button } from 'react-native';
import { useState } from 'react';
import DropDown from '../DropDown';

let hamburger =[{id:1, name: 'View Profile'}, {id:2, name:'Friends'}, {id:3, name:'Logout'}]

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [characterDesc, setCharacterDesc] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState('');

  const help = () => {
    console.log(characterList);
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const clearModal = () => {
    setModalVisible(false);
    setCharacterDesc('');
    setCharacterName('');
  }

  const sendMessage = () => {
    let newMessage = {
      content : message
    }
    setMessageList((messageList)=>[...messageList, newMessage])
  }

  const renderMessage = ({item}) => (
    <View style={styles.characterContainer}>
      <Text>{item.content}</Text>
    </View>
  )

  const [selectedItem, setSelectedItem] = useState(null)

  const onSelect = (item) =>{
    setSelectedItem(item)
  }


  return (
    <View style={styles.container}>
      <DropDown
        value = {selectedItem}
        data = {hamburger}
        onSelect={onSelect}
      />
      

      <FlatList
        style={{padding: 10}}
        extraData={messageList}
        data={messageList}
        inverted={true}

        renderItem={renderMessage}
        keyExtractor={item => item.name}

        ListEmptyComponent={
          <View>
            <Text>Start the Conversation!</Text>
          </View>
        }

        ListHeaderComponent={
          <View>
            <TextInput placeholder='Send a message' onChangeText={message => setMessage(message)}  style={styles.messageInput}/>
            <Button onPress={() => {sendMessage}} style={styles.sendButton} color='blue' title='Send'/>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 100,
    justifyContent: 'center',
    alignContent: 'center',
  },
  centered : {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    margin: 20
  },
  modalBackground : {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(155,155,155,100)'
  },
  modalInput :{
    borderColor: '#ced4da',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 12,
    margin: 12,
  },
  modalButtons: {
    borderRadius: 5,
    backgroundColor: '#4630EB',
    width: 100,
    marginHorizontal: 10,
  },
  title : {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row'
  },
  addButton: {
    alignContent: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: '#4630EB',
    borderRadius: 5,
    width: 115,
    flexDirection: 'row'
  },
  characterContainer: {
    borderRadius: 10,
    backgroundColor: '#ced4da',
    width: '90%'
  },
  messageInput : {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    backgroundColor: '#fff'
  }
});
