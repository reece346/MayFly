import React, { useEffect } from 'react';
import {Image,StyleSheet,Text,View,TouchableOpacity,Button, Linking} from 'react-native';
import * as RootNavigation from '../RootNavigation';

const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => {RootNavigation.navigate("EditProfile")}}>
                    <Image style={{height:20, width:20, color: 'black', left: 315, top: 10}} source={require('./images/editProfileIcon.png')}/>
                </TouchableOpacity>
                <View style={styles.avatarBorderContainer}>
                    <Image style={{height:'100%', width:'100%', borderRadius:70, color: 'black'}} source={require('./images/blackCircleBorder.jpg')}/>
                </View>
                <View style={styles.avatarContainer}>
                    <Image style={{height:'100%', width:'100%', borderRadius:60}} source={require('./images/persona.png')}/>
                </View>
                <View style={styles.profileNameContainer}>
                   <Text style={{fontSize:20,lineheight:50,fontWeight:'bold'}}>
                        Chad Thompson
                    </Text>
                </View>
                <View style={styles.userNameContainer}>
                   <Text style={{fontSize:16,lineheight:50}}>
                        chadt12345
                    </Text>
                </View>
                <View style={styles.MayFlySinceContainer}>
                   <Text style={{fontSize:15,lineheight:50}}>
                        Been a MayFly since:
                    </Text>
                    <Text style={{fontSize:15,lineheight:50, left: 25}}>
                        08/10/2022
                    </Text>
                </View>
            </View>
            <View style={styles.InterestsHeader}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                    Interests
                </Text>
            </View>
            <View style={styles.FriendsHeader}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                    Friends
                </Text>
            </View>
            <View style={styles.LinkedAccountsHeader}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                    Linked Accounts
                </Text>
            </View>
            <View style={styles.InstagramButton}>
                <Button title='Instagram' onPress={()=>{Linking.openURL('https://www.instagram.com/')}}></Button>
            </View>
            <View style={styles.TwitterButton}>
                <Button title='Twitter' onPress={()=>{Linking.openURL('https://twitter.com/ChadT12054309')}}></Button>
            </View>
            <View style={styles.YoutubeButton}>
                <Button title='Youtube' onPress={()=>{Linking.openURL('https://www.youtube.com/channel/UCZjQDA528gyGjo_LNDRE3HQ')}}></Button>
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 3,
        backgroundColor: '#3A3B50',
    },
    imageContainer:{
        left: 30,
        top:30,
        height:150,
        width:350,
        backgroundColor:'#EAEAEA',
        borderRadius:22,
        elevation:2
    },
    avatarBorderContainer:{
        height:110,
        width:110,
        position:'absolute',
        left: 15,
        top: 20
    },
    avatarContainer:{
        height:100,
        width:100,
        position:'absolute',
        left: 20,
        top: 25
    },
    profileNameContainer:{
        position:'absolute',
        top: 30,
        left: 135,
        alignItems:'center',
        color: 'black'
    },
    userNameContainer:{
        position:'absolute',
        top: 58,
        left: 145,
        alignItems:'center',
    },
    MayFlySinceContainer:{
        position:'absolute',
        top: 85,
        left: 138,
        alignItems:'center',
    },
    InterestsHeader:{
        top: 50,
        left: 30
    },
    FriendsHeader:{
        top: 200,
        left: 30
    },
    LinkedAccountsHeader:{
        top: 375,
        left: 30
    },
    InstagramButton:{
        position:'absolute',
        alignItems:'left',
        top: 630,
        left: 30
    },
    TwitterButton:{
        position:'absolute',
        alignItems:'left',
        top: 630,
        left: 173

    },
    YoutubeButton:{
        position:'absolute',
        alignItems:'left',
        top: 630,
        left: 300
    }
})

export default Profile;;