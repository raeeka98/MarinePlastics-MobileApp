import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import {NavigationActions} from 'react-navigation'

const navigateToHome = NavigationActions.navigate({
  routeName: 'MainNavigator',
  params: {},
  action: NavigationActions.navigate({
    routeName: 'DrawerNavigator',
    params: {},
    action: NavigationActions.navigate({
      routeName: 'HomePage',
      params: {},
    })
  })
})

const navigateToLogin = NavigationActions.navigate({
  routeName: 'MainNavigator',
  params: {},
  action: NavigationActions.navigate({
    routeName: 'DrawerNavigator',
    params: {},
    action: NavigationActions.navigate({
      routeName: 'LogInPage',
      params: {},
    })
  })
})

class BoardingPage extends Component {


  

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Marine Plastics Monitor
        </Text>
        <View>
        <Text style={{alignSelf: 'center',fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>
          Survey Input Assistant
        </Text>
        <Text style={{alignSelf: 'center', fontSize: 18, textAlign: 'center', fontWeight:'bold'}}>
          Clean Oceans International
        </Text>
        </View>
        <View>
          <Button info block style={{height: 60}} onPress={() => this.props.navigation.dispatch(navigateToHome)}>
            <Text style={{fontWeight: 'bold'}}>Home</Text>
          </Button>
          <Button info block style={{marginTop: 5, height: 60}}onPress={() => this.props.navigation.dispatch(navigateToLogin)}>
            <Text style={{fontWeight: 'bold'}}>Login</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default BoardingPage;

// Style variable.
const styles = StyleSheet.create({
container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-around",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ffffff",
  },
    paragraph: {
    margin: 14,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: 'black',
  }
});

