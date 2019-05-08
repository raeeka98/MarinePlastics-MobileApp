import React from 'react';

import {createStackNavigator, createNavigationContainer, createAppContainer} from 'react-navigation';

import { StyleSheet, Text, View, Button } from 'react-native';
import {Root} from 'native-base'

// optimization?
import { useScreens } from 'react-native-screens';
useScreens();

import HomePage from './screens/HomePage';
import BoardingPage from './screens/BoardingPage';
import LogInPage from './screens/LogInPage';
import ProfilePage from './screens/ProfilePage';
import SurveyPage from './screens/SurveyPage';
import Publish from './screens/Publish/Publish';
import ChooseBeachPage from './screens/ChooseBeachPage';
import TeamInfo from './screens/survey/TeamInfo';
import Area from './screens/survey/Area';
import SurfaceRibScan from './screens/survey/SurfaceRibScan';
import AccumulationSweep from './screens/survey/AccumulationSweep';
import MicroDebris from './screens/survey/MicroDebris';
import Scanner from './screens/Publish/Scanner';
import SurveyContainer from './screens/survey/SurveyContainer'



const MainNavigator = createStackNavigator(
  {
    Boarding: {screen: BoardingPage},
    Home: {screen: HomePage},
    Login: {screen: LogInPage},
    Profile: {screen: ProfilePage},
    SurveyEntry: {screen: SurveyPage},
    Publish: {screen: Publish},
    ChooseBeach: {screen: ChooseBeachPage},
    SurveyContainer: {screen: SurveyContainer},
    Scanner : {screen : Scanner}
  },
  {
    // First init route is for testing, second init route is for published app
    initialRouteName: (__DEV__ ? 'Publish' : 'Boarding')

  }
);

const NavigationApp = createAppContainer(MainNavigator);

//export default App;


export default class App extends React.Component {


  render() {
    return (
      <Root>
        <NavigationApp/>
      </Root>
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
