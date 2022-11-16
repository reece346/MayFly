import React, {Component, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
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
    setShowOption(false);
    onSelect(val);
    
}
    return (
        <View style = {styles.container}>
            <TouchableOpacity 
                style = {styles.dropDownStyle}
                activeOpacity={0.8}
                onPress={() => setShowOption(!showOption)}
            >
                <Text>{!!value ? value?.name : 'Hamburger Menu'}</Text>
            </TouchableOpacity>
            {showOption && (<View>
                {data.map((val, i) => {
                    return(
                        <TouchableOpacity
                            style = {styles.optionsStyle}
                            key={String(i)}
                            onPress={()=>onSelectedItem(val)}
                            //TODO: switch screens
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
        alignSelf: 'flex-end',
        marginTop: -5,
        backgroundColor: 'blue',
        padding: 8,
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