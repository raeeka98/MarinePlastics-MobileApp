import React from 'react';

import {createStackNavigator, createNavigationContainer, createAppContainer, createDrawerNavigator, createSwitchNavigator} from 'react-navigation';

import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import {Root, Spinner, Switch} from 'native-base'
import {Constants, Font} from 'expo'

// optimization?
import { useScreens } from 'react-native-screens';
useScreens();

import HomePage from './screens/HomePage';
import BoardingPage from './screens/BoardingPage';
import LogInPage from './screens/LogInPage';
import ProfilePage from './screens/ProfilePage';
import SurveyPage from './screens/SurveyPage';
import PublishContainer from './screens/Publish/PublishContainer';
import ChooseBeachPage from './screens/ChooseBeachPage';
import TeamInfo from './screens/survey/TeamInfo';
import Area from './screens/survey/Area';
import SurfaceRibScan from './screens/survey/SurfaceRibScan';
import AccumulationSweep from './screens/survey/AccumulationSweep';
import MicroDebris from './screens/survey/MicroDebris';
import Scanner from './screens/Publish/Scanner';
import SurveyContainer from './screens/survey/SurveyContainer'
import Example from './screens/Example';
import CustomDrawer from './components/CustomDrawer';

const DrawerNavigator = createDrawerNavigator({
  HomePage,
  LogInPage,
  SurveyPage, 
  },
  {
    initialRouteName: "LogInPage",
    contentComponent: CustomDrawer
  }
)

const MainNavigator = createStackNavigator(
  { 
    Boarding: {screen: BoardingPage},
    Home: {screen: HomePage},
    Login: {screen: LogInPage},
    Profile: {screen: ProfilePage},
    SurveyEntry: {screen: SurveyPage},
    PublishContainer: {screen: PublishContainer},
    ChooseBeach: {screen: ChooseBeachPage},
    SurveyContainer: {screen: SurveyContainer},
    Example : {screen: Example},
    DrawerNavigator

  },
  {
    // First init route is for testing, second init route is for published app
    initialRouteName: "DrawerNavigator",
    headerMode: "none"
  }
);


const SwitchNavigator = createSwitchNavigator(
  {
    BoardingPage,
    MainNavigator
  }
)

const NavigationApp = createAppContainer(SwitchNavigator);

//export default App;


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loading: true
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({
      loading : false
    });
  }

  render() {
    if(this.state.loading){
      return <Spinner color='green'/>;
    }
    return (
      <Root>
        <SafeAreaView style={styles.AndoidSafeView}>
          <NavigationApp/>
        </SafeAreaView>
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
  AndoidSafeView: {
    flex: 1,
    backgroundColor: '#fff',
    
  }
});
