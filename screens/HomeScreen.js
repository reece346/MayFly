import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import DropDown from '../DropDown';

let hamburger =[{id:1, name: 'View Profile'}, {id:2, name:'Friends'}, {id:3, name:'Logout'}]

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [characterDesc, setCharacterDesc] = useState('');
  const [characterList, setCharacterList] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

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

  const addCharacter = () => {
    let newCharacter ={
      name: characterName,
      desc: characterDesc,
      key: characterList.length+1,
    }

    setCharacterList((characterList)=>[...characterList, newCharacter])
    console.log('character list is ', characterList)
  }

  const renderCharacter = ({item}) => (
    <View style={styles.characterContainer}>
      <View style={{padding: 5}}>
        <Text>
          {item.name}
        </Text>
      </View>
      <Text style={{padding: 5}}>
        {item.desc}
      </Text>
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
      <Modal visible = {modalVisible}>
        <TouchableOpacity style = {styles.modalBackground} onPress={toggleModal}>
          <View style={styles.centered}>
            <Text style={{padding: 5}}>Add a Character</Text>
            <TextInput onChangeText={name => setCharacterName(name)} placeholder='Name' style={styles.modalInput}/>
            <TextInput onChangeText={desc => setCharacterDesc(desc)} placeholder='Description' style={styles.modalInput}/>
            <View style = {{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
              <TouchableOpacity onPress={addCharacter} style={styles.modalButtons}>
                <Text style={{color: 'white', padding: 2}}>
                  Add Character
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={clearModal} style={styles.modalButtons}>
                <Text style={{color: 'white', padding: 2}}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.title}>
        <Text style={{fontSize: 20}}>
          Character Wallet
        </Text>
      </View>

      <TouchableOpacity onPress={toggleModal} style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
        <View style={styles.addButton}>
          <Text style={{color: 'white'}}>Add a Character</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={characterList}
        extraData={characterDesc}

        renderItem={renderCharacter}
        keyExtractor={item => item.name}

        ListEmptyComponent={
          <View>
          <Text>You currently have no characters</Text>
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
  }
});
