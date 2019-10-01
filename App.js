import React from 'react';
import { Alert } from "react-native";
import Loading from './Loading';
import * as Location from 'expo-location';
import { isLoading } from 'expo-font';

export default class extends React.Component {
  state = {
    isLoding: true
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longtitude }
      } = await Location.getCurrentPositionAsync();
      this.setState({ isLoding: flase });
    } catch (error) {
      Alert.alert("Can't find you", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoding } = this.state;
    return isLoading ? <Loading /> : null;
  }
}