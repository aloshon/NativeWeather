import React from "react";
import { StyleSheet, Text, ImageBackground, View, Platform, Image } from 'react-native';
import { inlineStyles } from "react-native-svg";

// Display specific data for individual day in 16 day forecast
// Icons can be found online, I either download them or use a link
// However the link may be unreliable
const Day = ({date, description, high, low, uv, icon_code}) => {

    return (
    <View style={styles.dayStyle}>
        <Text>{date}</Text>
        <Text>{description}</Text>
        <Text>{high}°F</Text>
        <Text>{low}°F</Text>
        <Text>{uv}</Text>
        <Image
        style={styles.icon} 
        source={{
            uri: `https://www.weatherbit.io/static/img/icons/${icon_code}.png`,
            }} 
        />
    </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        height: 40,
        width: 40,
    },
    dayStyle: {
        border: "1px black solid",
        height: 150,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Day;