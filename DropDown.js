import React, {Component, useState} from "react";
import {View, Button, Text, StyleSheet, TouchableOpacity, Image, Alert} from "react-native";
import * as RootNavigation from './RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DropDown =({
    data = [],
    value = {},
    onSelect = () =>{}
}) => {

const [showOption, setShowOption] = useState(false);

const [showBox, setShowBox] = useState(true);

const logOutCurrentUser = async () => {
    try {
        await AsyncStorage.removeItem('@userData');
        updateActiveUser({})
    }
    catch(e) {
        return false
    }
}

const showConfirmDialog = () => {
    return Alert.alert(
        "Are you sure?",
        "This will log you out and take you to the Login screen",
        [
            {
                text: "Yes",
                onPress: () => {
                    logOutCurrentUser().then(
                        RootNavigation.navigate("Login")
                    )
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
    if (val.name == "View Profile")
        RootNavigation.navigate("Profile");
    if (val.name == "Friends")
        RootNavigation.navigate("Friends");
    if (val.name == "Logout")
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
        padding: 8,
        width:'200%',
        backgroundColor: '#5D5F82'
    }
});

export default DropDown;
