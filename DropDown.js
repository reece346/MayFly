import React, {Component, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import * as RootNavigation from './RootNavigation';

const DropDown =({
    data = [],
    value = {},
    onSelect = () =>{}
}) => {

const [showOption, setShowOption] = useState(false);

const onSelectedItem = (val) =>{
    if (val.name == "View Profile")
        RootNavigation.navigate("Profile");
    if (val.name == "Friends")
        RootNavigation.navigate("Friends");
    setShowOption(false);
}
    return (
        <View style = {styles.container}>
            <TouchableOpacity 
                //style = {styles.dropDownStyle}
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
                            <Text>{val.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>)}
        </View>
    );
};

const styles = StyleSheet.create({
    dropDownStyle:{
        height: 15,
        width: 35,
        alignSelf: 'flex-end',
        marginTop: -50,
        padding: 25,
        borderRadius: 6,
        minHeight: 42,
        justifyContent: 'center'
    },
    optionsStyle:{
        alignSelf: 'flex-end',
        marginTop: -1,
    }
});

export default DropDown;
