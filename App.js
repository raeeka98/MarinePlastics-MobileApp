import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createNavigationContainer} from 'react-navigation';
import NavigationApp from './FirstPageTest'

export default class App extends React.Component {
  

  render() {
    return (
      <NavigationApp/>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
