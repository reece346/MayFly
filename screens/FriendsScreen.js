import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import {FlatList,Image,StyleSheet,Text,View,TouchableOpacity, TextInput, Button} from 'react-native';
import * as RootNavigation from '../RootNavigation';

const friendsDATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Reece Peters',
        desc: 'Friends Since: Sept 22, 2022'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Bea Dyar',
        desc: 'Friends Since: Sept 04, 2022'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Miller Kershaw',
        desc: 'Friends Since: Nov 12, 2022'
    },
    {
        id: '3af68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Bea Dyar',
        desc: 'Friends Since: Dec 02, 2022'
    },
    {
        id: '586f4a0f-3da1-471f-bd96-145571e29d72',
        name: 'Miller Kershaw',
        desc: 'Friends Since: Dec 01, 2022'
    },
];

const FriendScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {RootNavigation.navigate("Profile")}}>
            <View style={styles.ProfileCards}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitles}>{item.desc}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.SearchFriendsSection}>
                <View style={styles.SearchFriendHeader}>
                    <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                        Search Users
                    </Text>
                    <View style={{ position: 'absolute', marginVertical: 30, width: '100%'}}>
                        <TextInput style={{
                            borderRadius: 10,
                            margin: 10,
                            color: '#000',
                            borderColor: '#666',
                            backgroundColor: '#FFF',
                            borderWidth: 1,
                            height: 45,
                            paddingHorizontal: 10,
                            fontSize: 18,
                        }}
                        placeholder={'Username'}
                        placeholderTextColor={'#666'}
                        />
                    </View>
                </View>
                <View style={styles.AddButton}>
                    <TouchableOpacity onPress= {toggleModal} style={{flexDirection: 'row', alignSelf: 'center', }}>
                        <Text style={{color: 'white'}}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.allFriendsSection}>
                <View style={styles.allFriendsHeader}>
                    <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                        All Friends
                    </Text>
                </View>
                    <FlatList
                        data={friendsDATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: '#3A3B50'
    },
    SearchFriendsSection : {
        top: 20,
        marginHorizontal: 30
    },
    SearchFriendHeader : {
        flexDirection: 'row'
    },
    allFriendsSection : {
        top: 80,
        left: 30
    },
    allFriendsHeader : {
        flexDirection: 'row'
    },
    ProfileCards : {
        backgroundColor: '#EAEAEA',
        top: 10,
        height: 75,
        width: 352,
        padding: 10,
        marginVertical: 8,
    },
    AddButton : {
        marginVertical: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#5D5F82',
        borderRadius: 5,
        height: 25,
        width: 75,
        flexDirection: 'row',
        top: 40
    },
    title : {
        left: '20%',
        fontWeight: 'bold',
        fontSize: 20,
    },
    subtitles : {
        left: '20%',
        marginVertical: 5,
        fontSize: 15
    }
})

export default FriendScreen;