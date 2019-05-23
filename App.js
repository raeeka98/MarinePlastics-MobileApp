import React from 'react';
import {createStackNavigator, createNavigationContainer, createAppContainer} from 'react-navigation';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Root} from 'native-base'

// optimization?
import { useScreens } from 'react-native-screens';
useScreens();

// Screens
import HomePage from './screens/HomePage';
import BoardingPage from './screens/BoardingPage';
import LogInPage from './screens/LogInPage';
import SurveyPage from './screens/SurveyPage';
import PublishContainer from './screens/Publish/PublishContainer';
import SurveyContainer from './screens/survey/SurveyContainer'


// Navigator to different screens/pages.
const MainNavigator = createStackNavigator(
  { 
    Boarding: {screen: BoardingPage},
    Home: {screen: HomePage},
    Login: {screen: LogInPage},
    SurveyEntry: {screen: SurveyPage},
    PublishContainer: {screen: PublishContainer},
    SurveyContainer: {screen: SurveyContainer},
  },
  {
    // First init route is for testing, second init route is for published app
    initialRouteName: (__DEV__ ? 'Home' : 'Boarding')

  }
);

// Create the appcontainer that will navigate between screens.
const NavigationApp = createAppContainer(MainNavigator);


export default class App extends React.Component {

  // Render the items in the class. (DO NOT CHANGE).
  render() {
    return (
      <Root>
        <NavigationApp/>
      </Root>
    );
  }
}
