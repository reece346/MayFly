import React, { useEffect, useState } from 'react';
import {Image,StyleSheet,Text,View,TouchableOpacity,Button, Linking} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import { getActiveUser } from './LoginScreen';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import User from '../user';

 const Profile = ({navigation}) => {
    const [user, setUser] = useState(null);
    const [interestArray, setInterestArray] = useState('');
    const [displayNameSaved, setDisplayNameSaved] = useState('');
    const [numberOfFriends, setNumberOfFriends] = useState(0);

    useEffect(() => {
        async function fetchUserData() {
            const userData = await getActiveUser();
            setUser(userData);
            setInterestArray(userData.interests.join(','));
            setDisplayNameSaved(userData.displayName);
            setNumberOfFriends(userData.friendIDs.length);
        }
        fetchUserData();
    })

    return (
        <View style={styles.container}>
        <View style={styles.editProfile}>
            <View style={styles.imageContainer}>
                <View style={styles.avatarContainer}>
                    <Image style={{height:60, width:60, borderWidth:2, borderRadius: 60, borderColor: 'grey'}} source={require('./images/standardpfp.png')}/>
                </View>
                <View style={styles.profileNameContainer}>
                    <Text style={{fontSize:20, fontWeight:'bold', paddingBottom: 5}}>
                        {displayNameSaved}
                    </Text>
                    <Text style={{fontSize:16}}>
                        {displayNameSaved}
                    </Text>
                </View>
                <View style={styles.MayFlySinceContainer}>
                    <Text style={{fontSize:17, fontWeight: 'bold'}}>
                        Friends: {numberOfFriends}
                    </Text>
                    <TouchableOpacity onPress={()=>{navigation.push('Friends')}}>
                        <Text style={{fontSize: 16}}>
                            Add Friends
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {RootNavigation.navigate("Edit Profile")}}>
                    <Image style={{height:20, width:20}} source={require('./images/editProfileIcon.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.InterestsHeader}>
            <Text style={{fontSize: 25, color: 'white', fontWeight: '600', paddingBottom: 15}}>
                 Interests: 
            </Text>
            <Text style={{fontSize: 25, color: 'white',fontWeight: '600', marginLeft: '5%'}}>
                 {interestArray}
            </Text>
        </View>
        
        <View style={styles.FriendsHeader}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                    Friends: 
                </Text><TouchableOpacity onPress={() => {RootNavigation.navigate("Friends")}}>
                    <Image style={{height:25, width:25}} source={require('./images/addfriends.png')}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.linksContainer}>
            <View style={styles.InstagramButton}>
                <Button title='Instagram' onPress={()=>{Linking.openURL('https://www.instagram.com/')}}></Button>
            </View>
            <View style={styles.TwitterButton}>
                <Button title='Twitter' onPress={()=>{Linking.openURL('https://twitter.com/')}}></Button>
            </View>
            <View style={styles.YoutubeButton}>
                <Button title='Youtube' onPress={()=>{Linking.openURL('https://www.youtube.com/')}}></Button>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#3A3B50',
        flex: 1,
    },
    editProfile:{
        width : '85%',
        marginLeft: '7.5%',
        marginVertical : '5%',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        borderRadius: 20,
        flex: 2,
    },
    imageContainer:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    avatarContainer:{
        marginHorizontal: 10,
    },
    InterestsHeader:{
        flex: 5,
        paddingLeft: '5%',
    },
    FriendsHeader:{
        flex: 5,
        paddingLeft: '5%',
        paddingRight : '5%'
    },
    linksContainer:{
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
})

export default Profile;