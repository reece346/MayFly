import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import * as RootNavigation from './RootNavigation';

function Timer({maxRange}){
    const [counter,setCounter] = useState(maxRange);

    useEffect(() => {
        if(counter > 0){
            setTimeout(()=>setCounter(counter-1), 1000);
        }
        else if(counter == 0){
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

