import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Image,StyleSheet,Text,View,TouchableOpacity} from 'react-native';

export default function LogOutScreen(){
    return (


        <View style={styles.container}>
            <View style={styles.imageContainer}>
                
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
    }
})