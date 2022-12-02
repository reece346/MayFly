import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, RefreshControl, TouchableWithoutFeedback, Button, KeyboardAvoidingView } from 'react-native';
import { useEffect, useState } from 'react';
import DropDown from '../DropDown';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

let hamburger =[{id:1, name: 'View Profile'}, {id:2, name:'Friends'}, {id:3, name:'Add Friends'}, {id:4, name:'Logout'}]


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
  // TODO Need some way of getting the user's phone number. Making do with an example one
  const phoneNumber = "+16505553434" // Test number, has been added to Firebase
  // TODO Also need some form of way to get the code from the user.
  const code = "123456"; // Test code tied to above phone number

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyBc4K_VsAO60P-Gmqg8x9B9e2oJ4R-ECdQ',
    authDomain: 'odyssey-490.firebaseapp.com',
    databaseURL: 'https://odyssey-490-default-rtdb.firebaseio.com/',
    projectId: 'odyssey-490',
    storageBucket: 'odyssey-490.appspot.com',
    messagingSenderId: '747613227593',
    appId: '1:747613227593:web:5ea3e82de1cdc0470b8d98'
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const messagesRef = ref(database, 'messages/test')

  useEffect(()=> {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      setTestMessage(data.testmsg.contents)
    })
  },[])

  const [selectedItem, setSelectedItem] = useState(null)

  const onSelect = (item) =>{
    setSelectedItem(item)
  }

  const renderMessage = ({item}) => (
    <View>{item.authorID}</View>
  )
  
  const sendMessage = () => {
    set(ref(database, '/messages/test/testmsg'), {
      authorID : 'testuser',
      contents : message,
      timestamp : '1668390616'
    })
  }

  return (
    <KeyboardAvoidingView {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})} style={styles.container}>
      <View style={styles.topBar}>
        <DropDown
          value = {selectedItem}
          data = {hamburger}
          onSelect={onSelect}
        />
        <View>
          <Text>
            Alive for
          </Text>
          <Text>
            A While
          </Text>
        </View>

        <View>
          <Text>
            people
          </Text>
        </View>
      </View>
      

      <FlatList
        style={{padding: 10}}
        data={messageList}
        inverted={true}

        renderItem={chatMessage
        }
        keyExtractor={item => item.name}

        ListEmptyComponent={
          <View>
            <Text>Start the Conversation!</Text>
          </View>
        }

        ListHeaderComponent={
          <View style={styles.chatBoxContainer}>
            <TextInput placeholder='Send a message' onChangeText={message => setMessage(message)}  style={styles.messageInput}/>
            <Button onPress={() => {sendMessage()}} style={styles.sendButton} color='blue' title='Send'/>
          </View>
        }
        ListFooterComponent={
          <View>
            <Text>{testMessage}</Text>
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3B50',
    paddingHorizontal: 10,
    paddingBottom: 10,
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
  topBar : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20
  },
  chatBoxContainer : {
    marginBottom: 75,
    padding: 10,
    flexDirection: 'row',
  },
  messageInput : {
    borderRadius: 4,
    backgroundColor: '#d7d7d7',
    padding: 5,
    margin: 5,
    width: '80%'
  }
});
