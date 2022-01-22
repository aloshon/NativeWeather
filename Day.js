import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';

// Display specific data for individual day in 16 day forecast
// Icons can be found online
const Day = ({index, date, description, high, low, uv, icon_code}) => {

    return (
    <View style={index === 0 ? styles.todayStyle : styles.dayStyle}>
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
        height: 150,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(150,150,150,0.4)",
        margin: 5,
    },
    todayStyle: {
        height: 170,
        width: 170,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(200,200,200,0.7)",
        margin: 5
    },
})

export default Day;