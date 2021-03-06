import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';

// Display specific data for individual day in 16 day forecast
// Icons can be found online

const Day = ({index, date, description, high, low, uv, icon_code, width}) => {  

    return (
    <View style={index === 0 ? [styles.todayStyle, {margin: width > 800 ? 5:3, width: width > 800 ? 170:140, height: width > 800 ? 170:140,}] 
    : [styles.dayStyle, {margin: width > 800 ? 5:3, height: width > 800 ? 150:125, width: width > 800 ? 150:125,} ]}>
        <Text>{date}</Text>
        <Text>{high}°F</Text>
        <Text>{low}°F</Text>
        <Text>{uv} uv</Text>
        <Image
        style={styles.icon} 
        source={{
            uri: `https://www.weatherbit.io/static/img/icons/${icon_code}.png`,
            }} 
        />
        <Text>{description}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        height: 40,
        width: 40,
    },
    dayStyle: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(150,150,150,0.6)",
    },
    todayStyle: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(200,200,200,0.8)",
    },
})

export default Day;