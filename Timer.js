import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import * as RootNavigation from './RootNavigation';
import createChat from './firebaseConfig';
import MessageList from './messageList';

function Timer({maxRange}){
    const [counter,setCounter] = useState(maxRange);

    useEffect(() => {
        if(counter > 0){
            setTimeout(()=>setCounter(counter-1), 1000);
        }
        else if(counter == 0){
            // Create 4 new messageLists for all messages to be placed in  for each chat
            for (i=0;i<5;i++)  {
                let thisMessageList = new MessageList(0);
                createMessageList(thisMessageList);
            }
            RootNavigation.navigate("NoChatScreen");
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

