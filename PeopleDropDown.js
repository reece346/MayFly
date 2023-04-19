import React, {Component, useState} from "react";
import {View, Button, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, TouchableWithoutFeedback} from "react-native";
import * as RootNavigation from './RootNavigation';
import { getActiveUser } from './screens/LoginScreen';
import { updateUser } from './firebaseConfig';

const PeopleDropDown = ({ 
    data = [], 
    value = {},
    onSelect = () =>{}
}) => {
    const [showOption, setShowOption] = useState(false);
    const [isReportVisible, setIsReportVisible] = useState(false);
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
            <Modal visible={isReportVisible} transparent={false} style={{width: '100%', height: '100%'}}>
                <TouchableWithoutFeedback style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,1)', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{setIsReportVisible(false)}}>
                    <View style={{width: '90%', height: '30%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Report person?</Text>

                        <View>
                            <TouchableOpacity>
                                <Text>yes</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity>
                                <Text>no</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
                            onPress={()=>setIsReportVisible(true)}
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