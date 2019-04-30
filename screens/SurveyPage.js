import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { Button } from 'react-native';
import Axios from 'axios';
import { AppLoading, Asset, Font, Icon } from 'expo';
//import t from 'tcomb-form-native';
import {createStackNavigator, createAppContainer, StackNavigator, createNavigationContainer} from 'react-navigation';

let URL='http://marineplastics.herokuapp.com/beaches'

class SurveyPage extends React.Component {
  state={
    webData: {}
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
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Survey Page
        </Text>
        <Button onPress={() => this.props.navigation.navigate("TeamInfo")} title="Click Me!"/>
        <Button onPress={this.retrieveSurveys} title="connect to database"/>
        <Text>{JSON.stringify(this.state.webData)}</Text>
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
