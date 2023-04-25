import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert, Modal, StyleSheet} from "react-native"
import React, {useEffect, useState} from "react"
import { sendCode2FA, confirm2FA } from "./firebaseConfig";
export default function TwoFactorModal () {
	const [codeNum, setCodeNum] = useState('');
	//const send2FA = async () => {
	//	if (phoneNum == "") {
	//		return Alert.alert("Input required");
	//	}
	//	const sendCodeSuccess = await sendCode2FA("+1" + phoneNum, recaptchaVerifier.current);
	//	if (sendCodeSuccess)
	//		setCodeVisible(true);
	//	else
	//		return Alert.alert("Invalid!");
    //}
	const input2FACode = async (code) => {
		if (code == "") {
			return Alert.alert("Input required");
		}
		const codeSuccess = await confirm2FA(code);
		if (codeSuccess)
			login();
		else
			return Alert.alert("Invalid code!");
	}

	return (
		<View style={styles.codeViewOutside}>
			<View style={styles.codeView}>
				<Text>Type Code Below</Text>
				<TextInput style = {styles.input}
				    clearButtonMode='always'
				    placeholder= 'ex. 123456'
				    placeholderTextColor= 'gray'
				    onChangeText={(code) => setCodeNum(code)}
				    keyboardType = {Platform.OS === 'ios' ? 
					"number-pad" : "numeric"}
				    maxLength={10}
				/>
				<TouchableOpacity style={styles.button}
					onPress={() => {input2FACode(codeNum)}}>
					<Text style={styles.buttonText}>Go</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#5D5F82',
        padding: 5,
        marginTop: 8,
        borderRadius:5
    },
    buttonText:{
        fontSize: 20,
        color: "white"
    },
    title: {
        color: "white",
        padding: 5,
        fontSize: 20
    },
    logo:{
        height: "30%",
        width: "50%",
        marginTop: 100,
    },
    container: {
        flex: 1,
        backgroundColor: '#3A3B50',
        alignItems: "center"
      },
    codeViewOutside:{
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: 55,
	backgroundColor: '#3A3B5080',
    },
    input:{
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        marginBottom:8,
        marginTop: 1,
        width: 200,
        color: 'white',
    },
    codeView:{
	margin: 20,
	backgroundColor: 'white',
	borderRadius: 20,
	padding: 35,
	alignItems: 'center',
	shadowColor: '#000',
	shadowOffset: {
	    width: 0,
	    height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 4,
	elevation: 5,
    }
})
