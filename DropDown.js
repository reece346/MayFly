import React, {Component, useContext, useState} from "react";
import {View, Button, Text, StyleSheet, TouchableOpacity, Image, Alert} from "react-native";
import * as RootNavigation from './RootNavigation';
import { screens } from "./App";
import UIContext from "./screens/UIHandler";

export default function DropDown({
    data = [screens],
    value = {},
    onSelect = () =>{},
}) {

const [showOption, setShowOption] = useState(false);
const {setCurrentScreen, currentScreen} = useContext(UIContext)
const [showBox, setShowBox] = useState(true);

const showConfirmDialog = () => {
    return Alert.alert(
        "Are you sure?",
        "This will log you out and take you to the Login screen",
        [
            {
                text: "Yes",
                onPress: () => {
                    RootNavigation.navigate("Login");
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
    if (val.key == "View Profile")
        setCurrentScreen("Profile");
    if (val.key == "Friends")
        setCurrentScreen("Friends");
    if (val.key == "Add Friends")
        setCurrentScreen("AddFriends");
    if (val.key == "Logout")
        showConfirmDialog();
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
                            <Text style ={{fontSize: 10, color: 'white'}}>{val.name}</Text> 
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
        padding: 8,
        backgroundColor: '#5D5F82'
    }
});

