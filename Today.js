import React from "react";
import { StyleSheet, Text, ImageBackground, View, Platform } from 'react-native';

const Today = ({time, temperature, humidity, backgroundImage, city}) => {
    console.log(Platform.OS);
    
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
                        {Platform.OS === 'ios' ? "Welcome Apple User! Android sucks!"
                        : Platform.OS === 'web' ? "Welcome Web User! PC Master Race!" 
                        : "Welcome Android User! Apple sucks!"}
                    </Text>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent: 'flex-start', 
        alignItems:'flex-start',
        color: 'rgba(0,0,0,0.5)'
    //   paddingTop: Platform.OS === "android" ? StatusBar.currentHight : 0,
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
        fontSize: 48, 
        margin: 28
    },
});  

export default Today;