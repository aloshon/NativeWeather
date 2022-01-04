import React from 'react';
import WeatherWrapper from "./WeatherWrapper";
import { useFonts } from 'expo-font';

export default function App() {

  const [loaded] = useFonts({
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <WeatherWrapper />
  );
}
