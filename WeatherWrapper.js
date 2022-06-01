import React, { useState, useEffect } from 'react';
import { Text, Alert } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import axios from "axios";
import TimeWrapper from "./TimeWrapper.js";
import { API_URL } from "@env";

// Gather all weather data from the Weather API and distribute info and background display
const WeatherWrapper = () => {
    const Night = "https://wallpapercave.com/wp/wp5111714.jpg";
    const weatherBGImages = {
        "sunny": "https://i.pinimg.com/564x/08/88/41/0888416ab798cea17945abe2288ba2cb.jpg", 
        "rainy" : "https://wallpaperaccess.com/full/3870826.jpg", 
        "clouds" : "https://www.photos-public-domain.com/wp-content/uploads/2012/04/cloudy-overcast-sky.jpg",
        "thunderstorm" : "https://s.w-x.co/util/image/w/0622lightning.jpg?v=at&w=532&h=532",
        "snow" : "https://previews.123rf.com/images/tatman/tatman1702/tatman170200008/71880359-vertical-image-of-a-long-driveway-in-the-woods-covered-with-snow-.jpg",
        "fog" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7Rnf_UTtYkqwtz7ST0UjLaf08c5iv6n4zg&usqp=CAU",
        "clear" : "https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618__480.jpg",
        "sleet" : "https://media.11alive.com/assets/WXIA/images/da0f7690-ab1b-480e-b86c-d398590a9c8f/da0f7690-ab1b-480e-b86c-d398590a9c8f_1920x1080.jpg",
        "smoke" : "https://media.wired.com/photos/59df8cf66d52e55cdead6b14/master/w_2560%2Cc_limit/NapaFire-TA-859999422.jpg",
        "misty" : "https://upload.wikimedia.org/wikipedia/commons/2/29/Misty_weather_over_Daqing_Pond.jpg",
    };

    const [today, setToday] = useState("");
    const [forecast, setForecast] = useState("");
    const [bgImage, setBgImage] = useState({uri: weatherBGImages.thunderstorm});

    const defineBgImage = (description) => {
        const wordsInDescription = description.split(" ");
        
        for(let word of wordsInDescription){
            word = word.toLowerCase();
            if(weatherBGImages[word] !== undefined) return setBgImage({uri: weatherBGImages[word]})
        }

        // If no word in the description matches any of the bg images
        // Set it to be Night image because it is beautiful
        setBgImage({uri: Night});
    }

    const requestWeatherData = async (lat, lon, units='imperial') => {
        try {
            const params = {
                lat,
                lon,
                units
            }
            const res = await axios.get(API_URL, {params})
            const {currentData, forecastData} = res.data;

            setToday(currentData);
            defineBgImage(currentData.weather.description);
            setForecast(forecastData);

        } catch(err) {
            console.log(err)
            Alert.alert(`Uh oh.. Something happened.. We are working on it!`)
        }
    }

    const getPermission = async () => {
        try {
            let { status } = await requestForegroundPermissionsAsync();
            
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

                if(permission !== 'granted'){
                    Alert.alert("We were denied!");
                    return
                } 
                const { coords } = await getCurrentPositionAsync({});
                
                requestWeatherData(coords.latitude, coords.longitude);
            } 
            catch(err) {
                console.error(err);
                Alert.alert("Uh oh... Try again later!");
            }
            return;
        };

        getCoords();

        return () => {};
    }, []);
    
    while(!forecast) return <Text>Loading</Text>;

    return (
        <TimeWrapper forecast={forecast} temperature={today.temp} description={today.weather.description} city={today.city_name} bgImageToday={bgImage} />
    )
}

export default WeatherWrapper;