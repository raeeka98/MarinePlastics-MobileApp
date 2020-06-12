import React, { Component } from 'react';
import {Icon, Button, Text, Container, Content} from 'native-base';
import Axios from 'axios';
// import { AppLoading, Asset, Font } from 'expo';
//import t from 'tcomb-form-native';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'react-native-best-viewpager';
import { Platform, StatusBar, StyleSheet, View, Linking, Dimensions, Image, TouchableOpacity } from 'react-native';
// import { AppLoading, Asset, Font } from 'expo';
//import t from 'tcomb-form-native';
import { createStackNavigator, createAppContainer, StackNavigator, createNavigationContainer } from 'react-navigation';
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
    drawerIcon: ({ focused }) => (
      <Icon type='AntDesign' name='form' style={{ fontSize: 20, color: (focused ? 'dodgerblue' : 'black') }} />
    )
  }

  render() {
        const {navigate} = this.props.navigation; 
        return (
          <Container style={{flex: 1}}>
          <PageHeader title="Survey" openDrawer={this.props.navigation.openDrawer}/>
          <Content style={{backgroundColor: '#e4eaff'}}>
            <View style={{flex:1}}>
                <IndicatorViewPager
                    style={{height:520}}
                    indicator={this._renderDotIndicator()}>
                    <View style={{backgroundColor:'cadetblue'}}>
                        <Image style={styles.stretch} source={require('./COI-instructions/COI-1.png')}/>
        </View>
                    <View style={{backgroundColor:'cadetblue'}}>
                       
                        <Text style={{textAlign: 'left', fontSize: 18, color: 'white'}}>
                              {'\n'}
                              {'   '}Over the years, COI has developed strict guidelines
                              that must be followed during all surveys in order to
                              maintain the quality of data that is collected by 
                              citizen scientists.
                              {'\n'}
                              {'\n'}
                              {'   '}If this is your first survey, please continue to
                              our tutorial or refer to the full tutorial on the 
                              </Text>
                              <Text style={styles.TextStyle} onPress={ ()=> Linking.openURL('https://marineplastics.herokuapp.com/protocol') } >Marine Plastics Monitor Data Website.</Text>
                              <Text style={{textAlign: 'left', fontSize: 18, color: 'white'}}>
                              {'\n'}
                              {'\n'}
                              {'   '}If you have already participated in a Beach Plastic
                              Debris Survey and followed the protocols,
                              please click, CONTINUE TO SURVEY.</Text>
            

            <Button info block style={{marginTop: 100,borderRadius: 8}} onPress={() => this.props.navigation.navigate("SurveyContainer")} >
            <Text style={{color:'white', fontWeight: 'bold'}}>CONTINUE TO SURVEY</Text>
            </Button>

            <Button info full style={{marginTop: 8, borderRadius: 8}} onPress={() => this.props.navigation.navigate("TutorialPage")} >
            <Text style={{color:'white', fontWeight: 'bold'}}>SEE TUTORIAL</Text>
            </Button>


        </View>
                </IndicatorViewPager>
        </View>
        </Content>
        </Container>
        );
      }
    
    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={2} />;
    }
}
export default SurveyPage;
console.disableYellowBox = true; // delete this when you want to see expo errors 

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
    TextStyle: {
 
    color: '#f2f4ff',
    textDecorationLine: 'underline'
 
  },
  pageStyle: {
   alignItems: 'center',
   padding: 20,
  },
   stretch: {
   flex: 1,
   justifyContent: "center",
   width: windowWidth,
   height: windowHeight,
   resizeMode: 'contain',
  },
});
