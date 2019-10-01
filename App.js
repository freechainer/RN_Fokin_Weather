import React from 'react';
import { Alert } from "react-native";
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "dcc9249aff94f29b4ebb11d4169d5ee7";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (latitude, longtitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&APPID=${API_KEY}`
    );
    console.log(data);
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longtitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longtitude);
      this.setState({ isLoading: flase });
    } catch (error) {
      Alert.alert("Can't find you", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}