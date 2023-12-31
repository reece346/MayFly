import React, {useEffect, useState, useRef} from 'react';
import {Text} from 'react-native';
import * as RootNavigation from './RootNavigation';
import createChat from './firebaseConfig';
import MessageList from './messageList';
import { onValue } from 'firebase/database';
import { assignUsersToChats, createNewMessageLocations } from './screens/HomeScreen';

function Timer({maxRange}){
    const [counter, setCounter] = useState(maxRange);
    const maxRangeRef = useRef(maxRange);

    //console.log("max Range: "  + maxRange)
    
    useEffect(() => {
        maxRangeRef.current = (maxRange);
        setCounter(maxRange);
        
    }, [maxRange]);

    useEffect(() => {
        //console.log("Counter: " + counter);
        if(counter > 0){
            setTimeout(()=>setCounter(counter-1), 1000);
        }
        else if(counter == 0) {
            // Create 4 new messageLists for all messages to be placed in  for each chat
            createNewMessageLocations();
            assignUsersToChats();
            RootNavigation.navigate("No Chat Screen");
        }
    },[counter])


    let hours = Math.floor(counter/60/60);
    let mins = Math.floor((counter/60)%60);
    let seconds = Math.floor(counter%60)
    
    let displayHours = hours < 10 ? `0${hours}`:hours;
    let displayMins = mins < 10 ? `0${mins}`:mins;
    let displaySecs = seconds < 10 ? `0${seconds}`:seconds;

    return(
        <Text>
            {displayHours}:{displayMins}:{displaySecs}
        </Text>
    )
}
export default Timer;

