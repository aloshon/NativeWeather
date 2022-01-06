import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, StatusBar, Platform, Button, SafeAreaView, TouchableOpacity, useWindowDimensions, Alert, ScrollView, ImageBackground, TouchableWithoutFeedback } from 'react-native';
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
    
            // const currentRes = await axios.get(`https://weatherbit-v1-mashape.p.rapidapi.com/current`, {params, headers});
            const currentRes = {
                "data": [
                    {
                        "rh": 39,
                        "pod": "d",
                        "lon": -118.56,
                        "pres": 973.1,
                        "timezone": "America/Los_Angeles",
                        "ob_time": "2022-01-05 20:10",
                        "country_code": "US",
                        "clouds": 25,
                        "ts": 1641413400,
                        "solar_rad": 547.6,
                        "state_code": "CA",
                        "city_name": "Stevenson Ranch",
                        "wind_spd": 8.9,
                        "wind_cdir_full": "north",
                        "wind_cdir": "N",
                        "slp": 1008.5,
                        "vis": 3.1,
                        "h_angle": 0,
                        "sunset": "00:58",
                        "dni": 839.51,
                        "dewpt": 41.8,
                        "snow": 0,
                        "uv": 4.37616,
                        "precip": 0,
                        "wind_dir": 359,
                        "sunrise": "15:01",
                        "ghi": 551.53,
                        "dhi": 100.44,
                        "aqi": 69,
                        "lat": 34.41,
                        "weather": {
                            "icon": "c01d",
                            "code": 800,
                            "description": "Clear sky"
                        },
                        "datetime": "2022-01-05:20",
                        "temp": 67.7,
                        "station": "SE756",
                        "elev_angle": 33.03,
                        "app_temp": 66.1
                    }
                ],
                "count": 1
            }
            // const forecastRes = await axios.get(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily`, {params, headers});
            const forecastRes = [
                {
                    "high": 69.8,
                    "low": 48.3,
                    "date": "2022-01-05",
                    "description": "Few clouds",
                    "uv": 0.6,
                    "icon_code": "c02d"
                },
                {
                    "high": 73.3,
                    "low": 47.4,
                    "date": "2022-01-06",
                    "description": "Scattered clouds",
                    "uv": 1,
                    "icon_code": "c02d"
                },
                {
                    "high": 61.3,
                    "low": 44.1,
                    "date": "2022-01-07",
                    "description": "Scattered clouds",
                    "uv": 0.9,
                    "icon_code": "c02d"
                },
                {
                    "high": 61.1,
                    "low": 45.5,
                    "date": "2022-01-08",
                    "description": "Overcast clouds",
                    "uv": 0.5,
                    "icon_code": "c04d"
                },
                {
                    "high": 61.3,
                    "low": 46.7,
                    "date": "2022-01-09",
                    "description": "Broken clouds",
                    "uv": 0.4,
                    "icon_code": "c03d"
                },
                {
                    "high": 57.5,
                    "low": 47,
                    "date": "2022-01-10",
                    "description": "Overcast clouds",
                    "uv": 0.8,
                    "icon_code": "c04d"
                },
                {
                    "high": 57.4,
                    "low": 46.1,
                    "date": "2022-01-11",
                    "description": "Broken clouds",
                    "uv": 0.9,
                    "icon_code": "c03d"
                },
                {
                    "high": 60.2,
                    "low": 43.6,
                    "date": "2022-01-12",
                    "description": "Scattered clouds",
                    "uv": 0.9,
                    "icon_code": "c02d"
                },
                {
                    "high": 59.1,
                    "low": 44.7,
                    "date": "2022-01-13",
                    "description": "Overcast clouds",
                    "uv": 1,
                    "icon_code": "c04d"
                },
                {
                    "high": 61.4,
                    "low": 48.4,
                    "date": "2022-01-14",
                    "description": "Broken clouds",
                    "uv": 0.9,
                    "icon_code": "c03d"
                },
                {
                    "high": 57.3,
                    "low": 52.4,
                    "date": "2022-01-15",
                    "description": "Overcast clouds",
                    "uv": 1,
                    "icon_code": "c04d"
                },
                {
                    "high": 59.9,
                    "low": 47.4,
                    "date": "2022-01-16",
                    "description": "Broken clouds",
                    "uv": 1.1,
                    "icon_code": "c03d"
                },
                {
                    "high": 57.3,
                    "low": 44.7,
                    "date": "2022-01-17",
                    "description": "Scattered clouds",
                    "uv": 1.1,
                    "icon_code": "c02d"
                },
                {
                    "high": 55.8,
                    "low": 45.3,
                    "date": "2022-01-18",
                    "description": "Broken clouds",
                    "uv": 1.1,
                    "icon_code": "c03d"
                },
                {
                    "high": 61,
                    "low": 47.6,
                    "date": "2022-01-19",
                    "description": "Broken clouds",
                    "uv": 1.1,
                    "icon_code": "c03d"
                },
                {
                    "high": 60.6,
                    "low": 47.4,
                    "date": "2022-01-20",
                    "description": "Clear Sky",
                    "uv": 1.2,
                    "icon_code": "c01d"
                }
            ]
            // console.log(currentRes.data);
            // console.log(forecastRes.data.data);
            setToday(currentRes.data[0]);

            setForecast(forecastRes);
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
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.container}>
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
      zIndex: 1,
    //   paddingTop: Platform.OS === "android" ? StatusBar.currentHight : 0,
    },
});  

export default WeatherWrapper;