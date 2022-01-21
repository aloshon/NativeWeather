import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, StatusBar, Platform, ScrollView } from 'react-native';
import { useDimensions } from "@react-native-community/hooks";
import Today from "./Today.js";
import Forecast from "./Forecast.js";

const TimeWrapper = ({forecast, temperature, city, bgImageToday}) => {
    const Night = "https://wallpapercave.com/wp/wp5111714.jpg";
    const Day = "https://i.pinimg.com/736x/80/2b/29/802b295cbda81367eb4580cf3816f45b.jpg";
    
    const {screen, window} = useDimensions();
    const {width, height} = Platform.OS === 'web' ? window : screen;
    const [time, setTime] = useState("");
    const [bgImageForecast, setBgImageForecast] = useState(null);

    const formatAMPM = (day) => {
        let hours = day.getHours();
        let minutes = day.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours !== 0 ? hours : 12; // 00:00 is actually 12:00
        minutes = minutes.toString().padStart(2, '0');
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const formatDayNight = (datetime) => {
        let [time, ampm] = datetime.split(" ");
        time = time.split(":")[0];

        if(time === "12") return ampm === 'pm' ? Day : Night;

        if(time >= 8 && ampm === 'pm' || time <= 6 && ampm === 'am' ){
            return Night
        } else {
            return Day
        }
    }

    // update the time every second
    useEffect(() => {
        setInterval(() => {
            const timeOfDay = formatDayNight(time);
            let current = new Date();
            console.log("HERE")
            const date = (current.getMonth()+1)+'-'+current.getDate()+'-'+current.getFullYear();
            setTime(formatAMPM(current) + ' ' + date);
            setBgImageForecast({uri: timeOfDay})
        }, 1000)
    }, [])

    return (
        <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        style={{ 
            width: width, 
            height: height
        }}>
            <View style={{width: width, height: height}}>
                <Today time={time} temperature={temperature} backgroundImage={bgImageToday} city={city}/>
            </View>
            <View style={{width: width, height: height}}>
                <Forecast forecastData={forecast} bgImage={bgImageForecast}/>
            </View>
        </ScrollView>
    )
}

export default TimeWrapper;