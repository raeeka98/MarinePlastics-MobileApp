import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createNavigationContainer} from 'react-navigation';
import TeamInfo from './TeamInfo'
import Area from './Area'

class FirstPageTest extends React.Component {
  onPressSurvey = () => {
    this.props.navigation.push("TeamInfo");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.onPressSurvey}>Press me to see survey!</Text>
      </View>
    );
  }
}

const MainStackNavigator = createStackNavigator (
  { 
    TeamInfo,
    FirstPageTest,
    Area 

  },
  {
      initialRouteName: 'FirstPageTest'
  }
);
const NavigationApp = createNavigationContainer(MainStackNavigator);

export default(NavigationApp);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });