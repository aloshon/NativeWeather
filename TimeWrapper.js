import React, {useState, useEffect} from 'react';
import { View, Platform, ScrollView } from 'react-native';
import { useDimensions } from "@react-native-community/hooks";
import Today from "./Today.js";
import Forecast from "./Forecast.js";

const TimeWrapper = ({forecast, temperature, description, city, bgImageToday}) => {
    const Night = "https://wallpapercave.com/wp/wp5111714.jpg";
    const Day = "https://i.pinimg.com/736x/80/2b/29/802b295cbda81367eb4580cf3816f45b.jpg";
    
    const {screen, window} = useDimensions();
    const {width, height} = Platform.OS === 'web' ? window : screen;
    let currentTime = new Date();
    const [time, setTime] = useState(currentTime.toLocaleString());
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
        let currTime = datetime.split(",")[1];
        let [, time, ampm] = currTime.split(" ")
        time = time.split(":")[0];

        if(time === "12") return ampm === 'pm' ? Day : Night;

        if(time >= 8 && ampm === 'PM' || time <= 6 && ampm === 'AM' ){
            return Night
        } else {
            return Day
        }
    }

    useEffect(() => {
        const timeOfDay = formatDayNight(time);
        setBgImageForecast({uri: timeOfDay});

         // update the time every second
        setInterval(() => {
            let current = new Date();
            const date = (current.getMonth()+1)+'-'+current.getDate()+'-'+current.getFullYear();
            setTime(formatAMPM(current) + '\n' + date);
        }, 1000);
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
                <Today 
                    time={time} 
                    temperature={temperature} 
                    description={description} 
                    backgroundImage={bgImageToday} 
                    city={city}
                    icon_code={forecast[0].icon_code}
                    width={width}
                />
            </View>
            <View style={{width: width, height: height}}>
                <Forecast forecastData={forecast} bgImage={bgImageForecast} width={width}/>
            </View>
        </ScrollView>
    )
}

export default TimeWrapper;