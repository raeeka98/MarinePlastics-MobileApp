import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { Button } from 'react-native';
import {Icon} from 'native-base'
import Axios from 'axios';
import { AppLoading, Asset, Font } from 'expo';
//import t from 'tcomb-form-native';
import {createStackNavigator, createAppContainer, StackNavigator, createNavigationContainer} from 'react-navigation';
import PageHeader from '../components/PageHeader';

let URL='http://marineplastics.herokuapp.com/beaches'

class SurveyPage extends React.Component {
  state={
    webData: {}
  }

  static navigationOptions = {
    title: 'New Survey',
    drawerIcon: ({focused}) => (
      <Icon type='AntDesign' name='form' style={{fontSize: 20, color:(focused ? 'blue' : 'black')}} />
    )
  }

  retrieveSurveys = () =>{
    Axios.get(URL)
      .then(res => {
        console.log(res.data)
        this.setState({
          webData: res.data
        })
      })
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <View>
        <PageHeader title="Start a survey" openDrawer={this.props.navigation.openDrawer} />
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Survey Page
          </Text>
          <Button onPress={() => this.props.navigation.navigate("SurveyContainer")} title="Click Me!"/>
          <Button onPress={this.retrieveSurveys} title="connect to database"/>
          <Text>{JSON.stringify(this.state.webData)}</Text>
        </View>
      </View>
    );
  }
}

export default SurveyPage;

// Style variable.
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  }
});
