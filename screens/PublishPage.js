import React, { Component } from 'react';
import { Platform, StatusBar, TouchableOpacity, StyleSheet, View, Text, } from 'react-native';
import { Button } from 'react-native';

import surveyDB from '../storage/mongoStorage'


class PublishPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localSurveys: [],

    }

    this.retrieveSurveys = this.retrieveSurveys.bind(this)
  }

  retrieveSurveys() {
    /* Get all the surveys from the local storage and store them in the state */
    let surveys = surveyDB.get();
    this.setState({localSurveys: surveys})
  }

  renderSurveys() {
    let {localSurveys} = this.state;
    let componentArray = [];
    console.log(localSurveys)
    for(var i = 0; i < localSurveys.length; i++){
      let survComponent = (
        <View style={{flex: 1, padding: 10, height: '15%'}}>
          <TouchableOpacity 
            onPress={this.showSurveyModal.bind(this, localSurveys[i])} 
            style={
              {
                height: 35,
                borderRadius: 5, 
                padding: 10, 
                backgroundColor: 'lightblue',
                borderColor: 'black',
                borderWidth: 1
              }
            }
          >
            <Text 
              style={
                {
                  position: 'absolute',  
                  marginTop: '1%', 
                  width:"50%", 
                  textAlign:'right', 
                  paddingRight: '5%', 
                  fontSize: 16, 
                  fontWeight:'bold'
                }
              }
            >
              {localSurveys[i].surveyName.length <= 15 ? localSurveys[i].surveyName : localSurveys[i].surveyName.substr(0, 13) + "..."}
            </Text>
            <Icon 
              style={
                {
                  position: 'absolute', 
                  marginTop: '1%',
                  marginHorizontal: '46%', 
                  alignSelf: 'center' 
                }
              }
              type="AntDesign" 
              name="pause"
            />
            <View style={
                  {
                    position: 'absolute', 
                    marginTop: '1%',
                    paddingLeft: '66%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }
                }>
              <Text 
                style={{fontSize: 17, 
                  fontStyle: 'italic'}}
              >
                {
                  (localSurveys[i].surveyData.cleanupDate.getMonth() + 1) + "/" 
                  + localSurveys[i].surveyData.cleanupDate.getDate() + "/"
                  + (localSurveys[i].surveyData.cleanupDate.getFullYear() % 100)
                }
              </Text>
              <Icon type='Entypo' name='dots-three-horizontal'/>
            </View>
            
          </TouchableOpacity>
        </View>
      )
      componentArray.push({key: localSurveys[i].surveyName, val: survComponent})
    }
    return <FlatList data={componentArray} extraData={this.state} renderItem={({item}) => {return item.val}} />
  }

  componentWillMount(){
    this.retrieveSurveys();
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Publish Page
        </Text>
        {this.renderSurveys()} 
      </View>
    );
  }
}

export default PublishPage;

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

