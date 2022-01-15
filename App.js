import React from 'react';
import WeatherWrapper from "./WeatherWrapper";
import { useFonts } from 'expo-font';
import { setCustomText } from 'react-native-global-props';

export default function App() {

  const [loaded] = useFonts({
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
  });

  const customTextProps = { 
    style: { 
      fontFamily: "Montserrat-Light",
      color: "#FFF",
    }
  };
  
  setCustomText(customTextProps);
  
  if (!loaded) {
    return null;
  }

  return (
    <WeatherWrapper />
  );
}
