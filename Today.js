import React from "react";
import { StyleSheet, Text, ImageBackground, View, Platform } from 'react-native';

const Today = ({time, temperature, description, backgroundImage, city}) => {

    return (
        <>
            <ImageBackground 
            source={backgroundImage} 
            style={styles.container}>
                <View>
                    <Text 
                    style={styles.temp}>
                        {temperature === undefined ? '...' : `${Math.floor(temperature)} °F`}
                    </Text>
                    <Text 
                    style={styles.texts}>
                        {time}
                    </Text>
                    <Text 
                    style={styles.texts}>
                        {city}
                    </Text>
                    <Text 
                    style={styles.texts}>
                        {description}
                    </Text>
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
        fontSize: 80, 
        margin: 28
    },
    texts: {
        color: 'white', 
        fontFamily: 'Montserrat-Light', 
        fontSize: 40, 
        margin: 21
    },
});  

export default Today;