import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, RefreshControl, TouchableWithoutFeedback, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { getAllUsers, getUserByID, banUser } from '../firebaseConfig';

export default function ReportedUsers ({navigation}) {
    const [reportedUsers, setReportedUsers] = useState([])

    const showConfirmBan = (username) => {
        return Alert.alert(
            `Are you sure you want to ban ${username}?`,
            '',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        banUser(username)
                    }
                },
                {
                    text: 'No'
                }
            ]
        )
    }

    useEffect(()=>{
        async function populateReportedusers() {
            let allUsers = await getAllUsers()

            for (user in allUsers) {
                let temp = await getUserByID(allUsers[user])
                console.log('temp is: ', temp)
                if(temp.isReported){
                    setReportedUsers([temp, ...reportedUsers])
                }
            }
            console.log('reportedUsers is: ', reportedUsers)
        }

        populateReportedusers();
    }, [])

    return(
        <View style= {styles.container}>
            <Text>Reported Users:</Text>
            
            {/* <FlatList
                data = {reportedUsers}
                renderItem={renderUser}
                keyExtractor={item=>item.userID}

                ListEmptyComponent={
                    <View>
                        <Text>
                            Thankfully nobody
                        </Text>
                    </View>
                }
            /> */}

            {reportedUsers.map((user)=>{
                return(
                    <View>
                        <View style={{flexDirection: 'row', height: '30%'}}>
                            <View style={{margin: '2%', padding: '2%'}}>
                                <Text style={{color: 'white'}}> {user.username} </Text>
                            </View>
                            <TouchableOpacity onPress={()=>{showConfirmBan(user.username)}}>
                                <View style={{margin: '2%', padding: '2%', backgroundColor: 'white', borderRadius: 5}}>
                                    <Text>
                                        ban
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
        </View>
    )

    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      backgroundColor: '#3A3B50',
      padding: '5%'
    },
})