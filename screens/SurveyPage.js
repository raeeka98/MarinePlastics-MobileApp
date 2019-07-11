import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Icon, Button, Text} from 'native-base'
import PageHeader from '../components/PageHeader';

/**
 * This is a page that can be much improved upon in the next iteration. This idea was pitched 
 * a bit late in the game, but it could still be something that can be integrated later on:
 * Instead of some paragraphs to serve as an on-boarding session, it'll be much better to
 * create a little tutorial guide that shows the user how to fill out and generate QR codes
 * with our app.
 */


class SurveyPage extends Component {

  static navigationOptions = {
    title: 'New Survey',
    drawerIcon: ({focused}) => (
      <Icon type='AntDesign' name='form' style={{fontSize: 20, color:(focused ? 'dodgerblue' : 'black')}} />
    )
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <ScrollView style={{backgroundColor: '#e4eaff', flex: 1}}>
        <PageHeader title="Start a survey" openDrawer={this.props.navigation.openDrawer} />
        <View style={[styles.container, {flexDirection:'column', justifyContent: 'space-between'}]}>
          <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 22, marginBottom: '2%'}}>GETTING STARTED</Text>
          <Text style={{fontSize: 18}}>
            The Marine Plastics Monitor app follows a protocol developed by Clean Oceans International (COI).{" "}
             <Text style={{fontStyle:'italic', fontSize: 18}}>
              If you are unfamiliar with their survey protocol, we suggest that you visit the Marine Plastics Monitor
              website and familiarize yourself with the procedure.
            </Text> 
          </Text>
          <Text style={{fontSize: 18, fontFamily: 'Roboto', marginBottom: '5%'}}>
            The survey on this app is a digital translation of 
            COI's paper protocol. But there are some changes that should be noted. We have integrated QR code scanning
            and generation in this app to make it easier for groups to split up and work on different ribs during the survey. 
            Only one survey must fill out the "Team Information" and "Survey Area" portion. This survey would be considered as 
            the "Master Survey", which will be used to scan all other form, if there are any, for this particular survey. 
            QR codes can be generated after the survey is saved.
          </Text>
          <Button info full style={{borderRadius: 5}} onPress={() => this.props.navigation.navigate("SurveyContainer")} >
            <Text style={{color:'white', fontWeight: 'bold'}}>OK, LETS PICK UP SOME TRASH!</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default SurveyPage;

// Style variable.
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#e4eaff",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  }
});
