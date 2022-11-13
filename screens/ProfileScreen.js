import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Image,StyleSheet,Text,View,TouchableOpacity} from 'react-native';

export default function Component(){
    return (


        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View>
                    <Image style={{height:130,width:'100%',borderTopLeftRadius:20,borderTopRightRadius:20}} source={require('./images/sea.png')}/>

                    </View>

                    <View style={styles.avatarContainer}>

                        <Image style={{height:'100%',width:'100%',borderRadius:60}} source={require('./images/persona.png')}/>

                    </View>

                   <View style={styles.textContainer}>

                   <Text style={styles.text}>

                        Chad Thompson

                    </Text>

                    <Text style={{fontSize:20,lineheight:50,fontWeight:'bold',top:150,right:100}}>

                        Interests

                    </Text>

                    <View style={styles.buttonContainer}>

                    <TouchableOpacity style={{height:32,width:110,borderRadiuus:30,backgroundColor:'blue',alignItems:'center',justifyContent:'center'}}>

                        <Text style={{fontsize:15,color:'white',lineheight:20,fontWeight:'bold'}}>
                            Add Friend

                        </Text>
                    </TouchableOpacity>

                    </View>
                    <View style={styles.interestContainer}>

                    <Image style={{height:'100%',width:'100%',borderRadius:60}} source={require('./images/lifting.png')}/>

                    </View>

                    <View style={styles.interest2Container}>

                    <Image style={{height:'100%',width:'100%',borderRadius:60}} source={require('./images/beer.png')}/>

                    </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#FF7070',
        alignItems:'center',
        justifyCOntent:'center',
    },
    imageContainer:{
        height:330,
        width:310,
        backgroundColor:'white',
        borderRadius:22,
        elevation:2,
        top:80
    },
    avatarContainer:{
        height:100,
        width:100,
        alignSelf:'center',
        position:'absolute',
        top:100,
    },
    textContainer:{
        height:25,
        width:170,
        position:'absolute',
        top:210,
        left:70,
        alignItems:'center',
    },
    text:{
        alignSelf:'center',
        fontWeight:'bold'
    },
    buttonContainer:{
        height:32,
        width:165,
        alignItems:'center',
        position:'absolute',
        alignSelf:'center',
        flexDirection:'row',
        top:30,
        left:30
    },
    interestContainer:{
        height:100,
        width:100,
        alignSelf:'center',
        position:'absolute',
        top:250,
        right:120,

    },
    interest2Container:{
        height:100,
        width:100,
        alignSelf:'center',
        position:'absolute',
        top:250,
        left:120,

    }

})