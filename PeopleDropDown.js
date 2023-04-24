import React, {Component, useState} from "react";
import {View, Button, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, TouchableWithoutFeedback} from "react-native";
import * as RootNavigation from './RootNavigation';
import { getActiveUser } from './screens/LoginScreen';
import { updateUser, reportUser } from './firebaseConfig';

export default function PeopleDropDown ({ data = [], value = {}, onSelect = () =>{}, navigation })  {
    const [showOption, setShowOption] = useState(false);
    const [isReportVisible, setIsReportVisible] = useState(false);
    const [showBox, setShowBox] = useState(true);
    const [selectedUser, setSelectedUser] = useState('');

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
                        navigation.replace("No Chat Screen");
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

    const showReportConfirmation = () =>{
        return Alert.alert(
            `${selectedUser} has been reported`,
            'Thank you for keeping our community safe',
            [
                {
                    text: 'Close',
                    onPress: () =>{
                        setShowBox(false)
                    }
                }
            ]
        )
    }

    const showReportFailure = () =>{
        return Alert.alert(
            'You cannot report yourself',
            '',
            [
                {
                    text: 'Close',
                    onPress: () =>{setShowBox(false)}
                }
            ]
        )
    }

    const showReportWindow = (username) => {
        setIsReportVisible(true)
        setSelectedUser(username)
    }

    const reportSelected = (username) => {
        if(username != getActiveUser().username){
            reportUser(username)
            showReportConfirmation()
        }
        else {
            showReportFailure()
        }
        setIsReportVisible(false)
    }
  
    return (
        <View style = {styles.container}>
            <Modal visible={isReportVisible} transparent={true}>
                <TouchableWithoutFeedback onPress={()=>{setIsReportVisible(false)}}>
                    <View style={styles.modalContainer}>
                        <View style={styles.reportButtonsContainer}>
                            <Text style={{color: 'white'}}>Report {selectedUser}?</Text>

                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.reportButton}>
                                    <TouchableOpacity onPress={()=>{reportSelected(selectedUser)}}>
                                        <View style={{width: '100%', height: '100%'}}>
                                            <Text>yes</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={styles.reportButton}>
                                    <TouchableOpacity onPress={()=>{setIsReportVisible(false)}}>
                                        <Text>no</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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
                    if(val.name == 'Leave Chat') { 
                        return(
                            <TouchableOpacity
                                style = {styles.optionsStyle}
                                key={String(i)}
                                onPress={()=>showConfirmDialog()}
                            >
                                <Text style ={{fontSize: '15%', color: 'white'}}>{val.name}</Text> 
                            </TouchableOpacity> //add animation?
                        )
                    } else {
                        return(
                            <TouchableOpacity
                                style = {styles.optionsStyle}
                                key={String(i)}
                                onPress={()=>showReportWindow(val.name)}
                            >
                                <Text style ={{fontSize: '15%', color: 'white'}}>{val.name}</Text> 
                            </TouchableOpacity> //add animation?
                        )
                    }
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
    },
    modalContainer:{
        width: '100%', 
        height: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    reportButtonsContainer:{
        width: '85%',
        height: '20%',
        backgroundColor: '#3A3B50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white'
    },
    reportButton:{
        margin: '3%',
        backgroundColor: '#d7d7d7',
        borderRadius: 5,
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        width: '30%',
        height: '40%'
    }
});