import React from 'react'
import {StyleSheet,Text,View} from 'react-native'

export default Interests = ({list}) => {
    return (
        <View style={[styles.listContainer, {backgroundColor: list.color}]}>
            <Text style={styles.listTitle} numberOfLines={1}>
                {list.name}
            </Text>
        </View>
    );

};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 42,
        paddingHorizontal: 20,
        alignitems: 'center',
        width: 100
    },
    listTitle: {
        fontSize: 16,
        fontweight: "700",
        color: 'white',
        marginBottom: 18

    }
})