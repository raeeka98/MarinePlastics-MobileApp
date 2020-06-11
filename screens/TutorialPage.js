import React, { Component } from 'react';
import {Icon, Button, Text, Container, Content} from 'native-base';
import Axios from 'axios';
// import { AppLoading, Asset, Font } from 'expo';
//import t from 'tcomb-form-native';
import {createStackNavigator, createAppContainer, StackNavigator, createNavigationContainer} from 'react-navigation';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'react-native-best-viewpager';
import {Platform, StyleSheet, View, Dimensions, Image } from "react-native";  
import PageHeader from '../components/PageHeader';

/**
 * This is a page that can be much improved upon in the next iteration. This idea was pitched 
 * a bit late in the game, but it could still be something that can be integrated later on:
 * Instead of some paragraphs to serve as an on-boarding session, it'll be much better to
 * create a little tutorial guide that shows the user how to fill out and generate QR codes
 * with our app.
   */


  class TutorialPage extends Component {

  static navigationOptions = {
    title: 'Tutorial',
    drawerIcon: ({focused}) => (
      <Icon type='Entypo' name='text' style={{fontSize: 20, color:(focused ? 'dodgerblue' : 'black')}} />
    )
  }

  render() {
    const {navigate} = this.props.navigation; 
      return(
        <Container style={{flex: 1}}>
          <PageHeader title="Tutorial" openDrawer={this.props.navigation.openDrawer}/>
          <Content style={{backgroundColor: '#e4eaff'}}>
            <View style={{padding: 0}}>

            <IndicatorViewPager
                    style={{height:475}}
                    indicator={this._renderDotIndicator()}>
                    <View style={{backgroundColor:'cadetblue'}}>
                        <Image style={styles.stretch} source={require('./COI-instructions/COI-1.png')}/>
        </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Image style={styles.stretch} source={require('./COI-instructions/COI-2.png')}/> 
        </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Image style={styles.stretch} source={require('./COI-instructions/COI-3.png')}/>
        </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Image style={styles.stretch} source={require('./COI-instructions/COI-4.png')}/>
        </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Image style={styles.stretch} source={require('./COI-instructions/COI-5.png')}/>
        </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Image style={styles.stretch} source={require('./COI-instructions/COI-6.png')}/>
        </View>
                            <View style={{backgroundColor:'#1AA094'}}>
                        <Image style={styles.stretch} source={require('./COI-instructions/COI-7.png')}/>
        </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Image style={styles.stretch} source={require('./COI-instructions/COI-8.png')}/>

            <Button info full style={{borderRadius: 5}} onPress={() => this.props.navigation.navigate("SurveyContainer")} >
            <Text style={{color:'white', fontWeight: 'bold'}}>Proceed to survey</Text>
          </Button>
        </View>
                </IndicatorViewPager>


            </View>
          </Content>
        </Container>
      );
    }
    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={5} />;
  }
}
export default TutorialPage;

// window variables
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
  },
  pageStyle: {
   alignItems: 'center',
   padding: 20,
  },
   stretch: {
   flex: 1,
   justifyContent: 'flex-start',
   alignItems: 'stretch',
   width: windowWidth,
   height: windowHeight,
   resizeMode: 'contain',
  },
});
