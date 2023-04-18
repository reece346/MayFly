import React, {Component, useState} from "react";
import {View, Button, Text, StyleSheet, TouchableOpacity, Image, Alert} from "react-native";
import * as RootNavigation from './RootNavigation';
import { getActiveUser } from './screens/LoginScreen';
import { updateUser } from './firebaseConfig';

const PeopleDropDown = ({ 
    data = [], 
    value = {},
    onSelect = () =>{}
}) => {
    const [showOption, setShowOption] = useState(false);

    const [showBox, setShowBox] = useState(true);

    //Confirmation of leaving a chat
    const showConfirmDialog = () => {
        return Alert.alert(
            "Are you sure?",
            "This will remove you from the chat.",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        let tempUser = getActiveUser();
                        console.log('=====================' + tempUser.currentChatID)
                        tempUser.currentChatID = "";
                        updateUser(tempUser);
                        console.log(' +++++++++++++++++++++++++' + tempUser.currentChatID)
                        RootNavigation.navigate("NoChatScreen");
                    },
                },
                {
                    text: "No",
                    onPress: () => {
                        setShowBox(false);
                    },
                },
            ]
        );
    };


    const onSelectedItem = (val) =>{
        if (val.name == "User1") {

        }
        if (val.name == "User2") {

        }
        if (val.name == "User3") {

        }
        if (val.name == "User4") {

        }
        if (val.name == "Leave Chat") {
            showConfirmDialog();
        }
        setShowOption(false);
    }
  
    return (
        <View style = {styles.container}>
            <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => setShowOption(!showOption)}
            >
                <Image style={styles.dropDownStyle} source={require('./screens/images/hamburger.png')} />
            </TouchableOpacity>
            {showOption && (<View>
                {data.map((val, i) => {
                    return(
                        <TouchableOpacity
                            style = {styles.optionsStyle}
                            key={String(i)}
                            onPress={()=>onSelectedItem(val)}
                        >
                            <Text style ={{fontSize: '15%', color: 'white'}}>{val.name}</Text> 
                        </TouchableOpacity> //add animation?
                    )
                })}
            </View>)}
        </View>
);
};
const styles = StyleSheet.create({
    dropDownStyle:{
        height: 42,
        width: 35,
        borderRadius: 6,
        minHeight: 42,
        justifyContent: 'flex-end',
        zIndex: 2
    },
    optionsStyle:{
        marginTop: 0,
        width: '100%',
        padding: 8,
        backgroundColor: '#5D5F82'
    }
});
  
export default PeopleDropDown;