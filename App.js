import React from 'react';
import {createStackNavigator, createNavigationContainer} from 'react-navigation';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Root} from 'native-base'

import HomePage from './screens/HomePage';
import BoardingPage from './screens/BoardingPage';
import LogInPage from './screens/LogInPage';
import ProfilePage from './screens/ProfilePage';
import SurveyPage from './screens/SurveyPage';
import PublishPage from './screens/PublishPage';
import ChooseBeachPage from './screens/ChooseBeachPage';
import TeamInfo from './screens/survey/TeamInfo'
import Area from './screens/survey/Area'
import SurfaceRibScan from './screens/survey/SurfaceRibScan'
import AccumulationSweep from './screens/survey/AccumulationSweep'
import MicroDebris from './screens/survey/MicroDebris'
import SurveyContainer from './screens/survey/SurveyContainer'


const MainNavigator = createStackNavigator(
  {
    Boarding: {screen: BoardingPage},
    Home: {screen: HomePage},
    Login: {screen: LogInPage},
    Profile: {screen: ProfilePage},
    SurveyEntry: {screen: SurveyPage},
    PublishFinalizeSurvey: {screen: PublishPage},
    ChooseBeach: {screen: ChooseBeachPage},
    SurveyContainer: {screen: SurveyContainer}
  },
  {
    initialRouteName: 'SurveyContainer'
  }
);

const NavigationApp = createNavigationContainer(MainNavigator);

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
