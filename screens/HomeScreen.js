import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, RefreshControl, TouchableWithoutFeedback, Button, KeyboardAvoidingView } from 'react-native';
import DropDown from '../DropDown';
import { initializeApp } from 'firebase/app';
import { getChatByChatID, sendMessage as sendMSG } from '../firebaseConfig';
import Message from '../message'
import Chat from '../chat'
import { getDatabase, onValue, ref, set, push, onChildAdded, child, get } from 'firebase/database';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { render } from 'react-dom';
import { getActiveUser } from './LoginScreen';
import {app, getUserByID} from '../firebaseConfig';
import PeopleDropDown from '../PeopleDropDown';
import Timer from '../Timer';


let hamburger =[{id:1, name: 'View Profile'}, {id:2, name:'Friends'},{id:4, name:'Logout'}]
let users =[{id:1, name: 'User1'}, {id:2, name:'User2'}, {id:3, name:'User3'}, {id:4, name:'User4'}, {id:5, name:'Leave Chat'}]

let systemSeconds = new Date().getSeconds(); 
let systemMinutes = new Date().getMinutes();
let systemHours = new Date().getHours();
let systemTimeInSecs = (systemHours * 60 * 60) + (systemMinutes * 60) + systemSeconds;

//TODO: 21600 must be replaced with timeCreated from database
let chatDuration = (86400 - (systemTimeInSecs - 21600));    

const userChatID = getActiveUser().currentChatID;
//console.log("Users Chat ID: " + userChatID);

export function chatMessage ({item}) {
  return (
    <View>
      <Text> thing</Text>
    </View>
  )
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [characterDesc, setCharacterDesc] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [testMessage, setTestMessage] = useState('wrong');
  const [message, setMessage] = useState('')
  // const [message, setMessage] = useState('')
  
  //TO-DO: change each reference to be dependent on user's chatID
  const database = getDatabase(app);
  const messagesRef = ref(database, 'messages/test2')
  const chatRef = ref(database, 'chats/' + userChatID);

  useEffect(()=> {
    onChildAdded(messagesRef, (snapshot) => {
      const currData = snapshot.val();
      getUserByID(currData.authorID).then(user => {
	      console.log("Current data: " + JSON.stringify(currData));
	      console.log("Current message: " + currData.contents);
	      const author = user.displayName;
	      console.log("Current author: " + author);
	      const data = {message: currData.contents, displayName: author};
	      setMessageList((messageList) => [data, ...messageList]);
      });
    })
    onValue(chatRef, (snapshot) => {
      const val = snapshot.val();
      const timeCreated = val.timeCreated;
      console.log("Time Created: " + timeCreated);
    }, (error) => {
      console.log(error);
    });
  },[])

  const [selectedItem, setSelectedItem] = useState(null)

  const onSelect = (item) =>{
    setSelectedItem(item)
  }

  //TO-DO: Get active user's name and display next to message
  const renderMessage = ({item}) => (
    <View style={styles.message}>
      <Text style={styles.authorName}>{item.displayName}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  )
  
  //TO-DO: Replace 'testuser' with currentUser, and have 'test2' replaced with the user's chatID
  const sendMessage = () => {
	  if (message == '')
		  return;
	  const newMessage = new Message(0, getActiveUser().userID, Date.now(), message, {});
	  sendMSG(newMessage, 'test2');
	  setMessage('');
  }

  /*
  // Array of User IDs
  const userIDs = ["-NP1kwfgqrAolBf1cYR9", "-NP1lG4cx5dtd6e18FFD", "-NP1lPuiZGLHFaJ6QfK8",
    "-NP1lbXi4Vk0mizuaKYS", "-NP2tOCY4Fsn7ovrmyzq", "-NPEZGeADwiK-8V-hHRW", 
    "-NPEZQHTqZ4igjgeYM_s", "-NPEbUeRwlNHaO7mOfLG", "testuser"];
  const chatMemberMax = 4;
  var usersInChat = [];

  
  // randomly assign four test users to a chat
  const assignGroupMembers = () => {
    for (let i=0; i<chatMemberMax-1; i++) {
      const j = Math.floor(Math.random() * (4));
      for (let )
    }
  }
*/

//TO-DO: Remove 'getActiveUser().displayName' from line 128
  return (
    <View style={styles.container}>
        <View style={styles.topBar}>
          <DropDown
            value = {selectedItem}
            data = {hamburger}
            onSelect={onSelect}
          />
          <View style={{borderRadius: 5, backgroundColor: '#d7d7d7', paddingHorizontal : 5, paddingVertical: 5, height: '27%', justifyContent: 'center', alignItems: 'center' }}>
            <Timer maxRange={chatDuration}/>
          </View>

          <PeopleDropDown
            data={users}
            onSelect={onSelect}
            value={selectedItem}
          />
        </View>
        
        <KeyboardAvoidingView {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})} style={{flex: 5}}>
        <FlatList
          style={{padding: 10}}
          data={messageList}
          inverted={true}
          renderItem={renderMessage}
          keyExtractor={item => item.name}

          ListEmptyComponent={
            <View>
              <Text>Start the Conversation!</Text>
            </View>
          }
        />
        <View style={styles.chatBoxContainer}>
          <TextInput placeholder={'Send a message'} onChangeText={message => setMessage(message)} value={message} style={styles.messageInput}/>
          <Button onPress={() => {sendMessage()}} style={styles.sendButton} color='blue' title='Send'/>
        </View>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3B50',
    paddingHorizontal: 10,
    paddingBottom: 10,
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
    width: '90%',
  },
  topBar : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    zIndex: 5
  },
  chatBoxContainer : {
    marginBottom: 100,
    padding: 10,
    flexDirection: 'row',
  },
  messageInput : {
    borderRadius: 4,
    backgroundColor: '#d7d7d7',
    color: 'black',
    padding: 5,
    margin: 5,
    width: '80%'
  },
  authorName : {
    backgroundColor: '#d7d7d7',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    padding: 5,
    borderRadius: 5,
  },
  message : {
    backgroundColor: '#d7d7d7',
    padding: 1,
    margin: 5,
    borderRadius: 5,
  }
});
