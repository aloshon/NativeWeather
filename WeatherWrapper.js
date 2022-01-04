import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, StatusBar, Platform, Button, SafeAreaView, TouchableOpacity, useWindowDimensions, Alert, ScrollView, ImageBackground } from 'react-native';
import { useDimensions } from "@react-native-community/hooks";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
const favicon = require('./assets/favicon.png');
import axios from "axios";
import Today from "./Today.js";
import Forecast from "./Forecast.js";

// All weather descriptions I know:
// There are lots of variants of rain so maybe just check if rain is listed then put rain image
// Sunny, Clear, Overcast, Cloudy, Mist, Partly Cloudy, Fog, Heavy Rain, 

const WeatherWrapper = () => {
    console.log("APP EXECUTED");
    console.log(useDimensions());

    const {screen, window} = useDimensions();
    const {width, height} = Platform.OS === 'web' ? window : screen;
    const [today, setToday] = useState("");
    const [forecast, setForecast] = useState("");
    let current = new Date();
    const date = (current.getMonth()+1)+'-'+current.getDate()+'-'+current.getFullYear();
    const formatAMPM = (day) => {
        let hours = day.getHours();
        let minutes = day.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes.toString().padStart(2, '0');
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
      
    const time = formatAMPM(current) + ' ' + date;
    const [city, setCity] = useState("");
    const Sunny = "https://i.pinimg.com/564x/08/88/41/0888416ab798cea17945abe2288ba2cb.jpg";
    const night = "https://wallpapercave.com/wp/wp5111714.jpg";
    const rainy = "https://wallpaperaccess.com/full/3870826.jpg";
    const Overcast = "https://i2.pickpik.com/photos/453/12/984/air-sky-cloud-background-thumb.jpg";
    const [bgImage, setBgImage] = useState({uri: Sunny});
    const [bgImageForecast, setBgImageForecast] = useState({uri: Overcast});


    const test = async (lat, lon, units='imperial') => {
        try {
            const params = {
                lat,
                lon,
                units
            }
            
            const headers = {
                'x-rapidapi-key': '3d25a73809msh92d1a102dce0e6ep1b8032jsn5208093ebcc3'
              }
    
            const currentRes = await axios.get(`https://weatherbit-v1-mashape.p.rapidapi.com/current`, {params, headers});
            const dailyRes = await axios.get(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily`, {params, headers});
            console.log(currentRes.data);
            console.log(dailyRes.data.data);
            setToday(currentRes.data.data[0]);

            setForecast(dailyRes);
            console.log(today.temp)
            console.log(forecast)

        } catch(err) {
            throw new Error(err)
        }
    }
    
    const handlePress = () => {
        console.log("PRESSED ASS")
    }

    const getPermission = async () => {
        try {
            let { status } = await requestForegroundPermissionsAsync();
            console.log(status);
            return status
        }
        catch(err) {
            Alert.alert("We were denied!");
            return
        }
    }

    useEffect(() => {
        const getCoords = async () => {
            try {
                const permission = await getPermission();
                console.log(permission);

                if(permission !== 'granted'){
                    Alert.alert("We were denied!");
                    return
                } 
                const { coords } = await getCurrentPositionAsync({});
                console.log(coords);
                test(coords.latitude, coords.longitude);
            } 
            catch(err) {
                console.error(err);
                Alert.alert("Uh oh... Try again later!");
            }
            return () => {}
        };

        getCoords();

        return;
    }, []);

    while(forecast === "") return null;

    return (
        // <SafeAreaView style={styles.container}>
        //   <Text numberOfLines={1} onPress={handlePress}>Open up App.js to start app! {temperature} {location}</Text>
        //   <StatusBar style="auto" />
        //   <Image source={favicon}/>
        //   <TouchableOpacity onPress={() => console.log("HEY")}>
        //   <Image 
        //   // blurRadius={}
        //   source={{ 
        //     uri: "https://picsum.photos/200/300",
        //     width: 200,
        //     height: 300,
        //     }}/>
        //     </TouchableOpacity>
        // {/* <Button title="Click MEEE!!!!!" onPress={() => Alert.alert("YOU SAVED ME!", "YAY THANK YOU", [
        //   {text: "Yes", onPress: () => console.log("Good samaritan :)")},
        // ])}/>
        // <View style={{ 
        //   width: "50%", 
        //   height: 200, 
        //   backgroundColor:"dodgerblue"}}>
        // </View> */}
        // {/* <Image 
        // // blurRadius={}
        // source={{ 
        //   uri: icon,
        //   width: 80,
        //   height: 80,
        //   }}/> */}

        // <Button title="Get Location" onPress={getCoords}/>
        <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
            <View style={{width: width, height: height}}>
                <Today style={styles.fonts} time={time} temperature={today.temp} humidity={90} backgroundImage={bgImage} city={today.city_name}/>
            </View>
            <View style={{width: width, height: height}}>
                <Forecast forecast={forecast} bgImage={bgImageForecast}/>
            </View>
        </ScrollView>
    // </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#bbb',
    //   paddingTop: Platform.OS === "android" ? StatusBar.currentHight : 0,
    },
    // fonts: {
    //   fontSize: 82,
    //   fontFamily: 'Montserrat-Light'
    // },
});  

export default WeatherWrapper;