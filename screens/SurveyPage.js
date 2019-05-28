import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Icon, Button} from 'native-base'
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
        <View style={[styles.container, {flexDirection:'column', justifyContent: 'space-between'}]}>
          <Text style={{fontSize: 16, fontFamily: 'Roboto'}}>
            The Marine Plastics Monitor app follows a protocol developed by Clean Oceans International (COI). If
            you are unfamiliar with their survey protocol, we suggest that you visit the Marine Plastics Monitor
            website and familiarize yourself with the procedure. 
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'Roboto'}}>
            The survey on this app is a digital translation of 
            COI's paper protocol, but there are some changes that should be noted. We have integrated QR code scanning
            and generation in this app to make it easier for groups to split work on the survey. Only one survey must
            fill out the "Team Information" and "Survey Area" portion. This survey would be considered as th "Master 
            Survey", which will be used to scan all other form, if there are any, for this particulart survey. 
            QR codes can be generated after the survey is saved.
          </Text>
          <Button info full style={{borderRadius: 5}} onPress={() => this.props.navigation.navigate("SurveyContainer")} >
            <Text style={{color:'white', fontWeight: 'bold'}}>OK, I got it!</Text>
          </Button>
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
