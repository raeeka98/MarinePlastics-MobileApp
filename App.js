import React from 'react';

import {createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator} from 'react-navigation';

import { StyleSheet, SafeAreaView } from 'react-native';
import {Root, Spinner} from 'native-base'
import {Font} from 'expo'

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
import CustomDrawer from './components/CustomDrawer';

/**
 * This file contains the bulk of the navigation components used throughout the app
 * Here's the structure of the app using the navigation tree:
 * 
 *    SwitchNavigator (Switch):
 *      - BoardingPage (Routes to MainNavigator's DrawerNavigator's LogInPage or HomePage)
 *      - MainNavigator (Stack):
 *          - Boarding
 *          - Home
 *          - Login
 *          - SurveyEntry
 *          - PublishContainer
 *          - SurveyContainer
 *          - DrawerNavigator (Drawer): 
 *              - HomePage
 *              - LogInPage
 *              - SurveyPage
 * 
 * Some things to note: 
 *  - There are two sets of Home, Login and Surveys. DrawerNavigator needs it in order to use
 *    the drawer to navigate to these main pages of the application. MainNavigator needs it
 *    when props get passed between SurveyContainer and Home, and SurveyContainer and Publish
 *  
 * - If you wanted to properly navigate from a page exclusive to MainNavigator and a page in 
 *    DrawerNavigator (ie SurveyContainer to HomePage), you would need to nest the navigation
 *    actions between components. For an example, observe how 'navigateToHome' is used in 
 *    BoardingPage
 */

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

// Navigator to different screens/pages.
const MainNavigator = createStackNavigator(
  {
    Boarding: {screen: BoardingPage},
    Home: {screen: HomePage},
    Login: {screen: LogInPage},
    SurveyEntry: {screen: SurveyPage},
    PublishContainer: {screen: PublishContainer},
    SurveyContainer: {screen: SurveyContainer},
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
  }, 
  {
    initialRouteName: 'BoardingPage'
  }
)

// Create the appcontainer that will navigate between screens.
const NavigationApp = createAppContainer(SwitchNavigator);


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loading: true
    }
  }

  /**
   * We'll need this asynchronous call in order to properly load in some fonts before 
   * rendering the application. If this is not done, the app will crash and nothing will 
   * work (on Android, at least).
   */
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

/**
 * Android needs its own little padding, and here's why: Some of the newer Android phones
 * have notches at the top (ie LG G7 Thinq). However, SafeAreaView weirdly only works to find
 * notches on IOS devices (IPhone X). As a result, if no extra padding is used, then the header
 * of some screens will clip into the Android's notification bar, and that's a big no-no.
 * The header may look a bit taller on some android phones, but its unfortunately a 
 * necessary evil to keep chaos from ensuing.
 */
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
