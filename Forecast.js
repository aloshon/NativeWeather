import React from "react";
import Day from "./Day.js";
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';
// Display 16 day forecast
const Forecast = ({forecastData, bgImage, width}) => {

    return <>
        <ImageBackground source={bgImage} style={{flex:1, resizeMode: 'cover'}}>
            <ScrollView horizontal={true}
            showsHorizontalScrollIndicator={true}
            nestedScrollEnabled={true}
            contentContainerStyle={styles.container}
           >
                {forecastData.map((day, idx) => 
                    <Day 
                        key={idx}
                        index={idx}
                        date={day.date} 
                        description={day.description} 
                        high={day.high} 
                        low={day.low} 
                        uv={day.uv} 
                        icon_code={day.icon_code} 
                        width={width}
                    />
                )}
            </ScrollView>
        </ImageBackground>
    </>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

})

export default Forecast;