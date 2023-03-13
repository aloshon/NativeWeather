import React from "react";
import { StyleSheet, Text, ImageBackground, View, Image } from 'react-native';

const Today = ({time, temperature, description, backgroundImage, city, icon_code, width}) => {

    return (
        <>
            <ImageBackground 
            source={backgroundImage} 
            style={styles.container}>
                <View style={styles.container}>
                    <Text 
                    style={[styles.temp, {fontSize: width > 800 ? 110 : 80, margin: width > 800 ? 44 : 28}]}>
                        {temperature === undefined ? '...' : `${Math.floor(temperature)} °F`}
                    </Text>
                    <Text 
                    style={[styles.texts, {fontSize: width > 800 ? 70 : 40}]}>
                        { time.indexOf("/") === -1 ? time : "" }
                    </Text>
                    <Text 
                    style={[styles.texts, {fontSize: width > 800 ? 70 : 40,  marginLeft: width > 800 && 44}]}>
                        {city}
                    </Text>
                    <Text 
                    style={[styles.texts, {fontSize: width > 800 ? 70 : 40, marginLeft: width > 800 && 44}]}>
                        {description}
                    </Text>
                    {/* <Image
                    style={[styles.icon, {margin: width > 800 ? 130:26, height: width > 800 ? 150:110, width: width > 800 ? 150:110}]}
                    source={{
                        uri: `https://www.weatherbit.io/static/img/icons/${icon_code}.png`,
                        }} 
                    /> */}
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: 'fitContent',
        height: 'fitContent',
        color: 'rgba(0,0,0,0.5)'
    },
    temp: {
        color: 'white', 
        fontFamily: 'Montserrat-Light',
    },
    texts: {
        color: 'white', 
        fontFamily: 'Montserrat-Light', 
        margin: 21,
    },
    icon: {
        height: 80,
        width: 80,
        position: "absolute",
        alignSelf: "flex-end",
        top: "10px",
    },
});  

export default Today;