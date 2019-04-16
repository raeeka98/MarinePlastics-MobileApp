import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {createStackNavigator, createAppContainer, StackNavigator, createNavigationContainer} from 'react-navigation';
import HomePage from './screens/HomePage';
import BoardingPage from './screens/BoardingPage';
import LogInPage from './screens/LogInPage';
import ProfilePage from './screens/ProfilePage';
import SurveyPage from './screens/SurveyPage';
import PublishPage from './screens/PublishPage';
import ChooseBeachPage from './screens/ChooseBeachPage';


const MainNavigator = createStackNavigator({
  Boarding: {screen: BoardingPage},
  Home: {screen: HomePage},
  Login: {screen: LogInPage},
  Profile: {screen: ProfilePage},
  SurveyEntry: {screen: SurveyPage},
  PublishFinalizeSurvey: {screen: PublishPage},
  ChooseBeach: {screen: ChooseBeachPage},
});

const App = createNavigationContainer(MainNavigator);

export default App;

/*
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
