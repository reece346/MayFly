import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert, Modal} from "react-native"
import React, {useEffect, useState} from "react"
import { sendCode2FA, confirm2FA } from "./firebaseConfig";
export default function TwoFactorModal ({codeVisible}) {
	const [codeNum, setCodeNum] = useState('');
	//const [codeVisible, setCodeVisible] = useState(false);

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
		<Modal
	    	    animationType="fade"
	    	    transparent={true}
	    	    visible={codeVisible}
	    	    onRequestClose={() => {
		        setCodeVisible(!codeVisible);
		    }}>
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
	        </Modal>
	);
};
