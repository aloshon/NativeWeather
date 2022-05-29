import React from "react";
import { StyleSheet, Text, ImageBackground, View, Image } from 'react-native';

const Today = ({time, temperature, description, backgroundImage, city, width=0, icon_code}) => {

    return (
        <>
            <ImageBackground 
            source={backgroundImage} 
            style={styles.container}>
                <View>
                    <Text 
                    style={[styles.temp, {fontSize: width > 800 ? 110 : 80, margin: width > 800 ? 44 : 28}]}>
                        {temperature === undefined ? '...' : `${Math.floor(temperature)} °F`}
                    </Text>
                    <Text 
                    style={[styles.texts, {fontSize: width > 800 ? 70 : 40}]}>
                        {time}
                    </Text>
                    <Text 
                    style={[styles.texts, {fontSize: width > 800 ? 70 : 40,  marginLeft: width > 800 && 44}]}>
                        {city}
                    </Text>
                    <Text 
                    style={[styles.texts, {fontSize: width > 800 ? 70 : 40, marginLeft: width > 800 && 44}]}>
                        {description}
                    </Text>
                    <Image
                    style={styles.icon}
                    source={{
                        uri: `https://www.weatherbit.io/static/img/icons/${icon_code}.png`,
                        }} 
                    />
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
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
        height: 40,
        width: 40,
    },
});  

export default Today;