import React from "react";
import Day from "./Day.js";
import { StyleSheet, ImageBackground, View, ScrollView } from 'react-native';

// Display 16 day forecast
const Forecast = ({forecast, bgImage}) => {

    // Only get the data that we want
    const forecastData = forecast.data.data.map(day => {
        return {
            high: day.high_temp,
            low: day.low_temp,
            date: day.datetime,
            description: day.weather.description,
            uv: day.uv,
            icon_code: day.weather.icon,
        }
    });

    console.log(forecastData);
    return <>
        <ImageBackground source={bgImage} style={{flex:1, resizeMode: 'cover'}}>
        <View contentContainerStyle={styles.container}>
            <ScrollView horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.container}>
                {forecastData.map((day, idx) => 
                    <Day 
                        key={idx}
                        date={day.date} 
                        description={day.description} 
                        high={day.high} 
                        low={day.low} 
                        uv={day.uv} 
                        icon_code={day.icon_code} 
                    />
                )}
            </ScrollView>
        </View>
        </ImageBackground>
    </>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Forecast;