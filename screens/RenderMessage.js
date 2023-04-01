import { FlatList, StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, RefreshControl, TouchableWithoutFeedback, Button, KeyboardAvoidingView } from 'react-native';
import { useEffect, useState } from 'react';
import { getUserByID } from '../firebaseConfig';

export default function RenderMessage ({message, authorID}) {
    const author = getUserByID(authorID)
    return (
        <View style={styles.message}>
            <Text style={styles.authorName}>{author.displayName}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
authorName : {
    backgroundColor: '#d7d7d7',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    padding: 5,
    borderRadius: 5,
  },
  message : {
    backgroundColor: '#d7d7d7',
    padding: 1,
    margin: 5,
    borderRadius: 5,
  }
})