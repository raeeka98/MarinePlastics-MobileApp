import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native';
import {Icon} from 'native-base'

import surveyDB from '../storage/mongoStorage'

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      inProgress: []
    }

    this.renderInProgress = this.renderInProgress.bind(this);

  }

  async retrieveInProgress() {
    console.log("pee")
    surveyDB.find({}).projection({surveyName: 1, surveyData: 1}).exec((err, res) => {
      if(err){
        alert(err);
        return
      }
      console.log(res)
      this.setState({inProgress: res})
    })
  }

  componentWillMount(){
    this.retrieveInProgress();
  }

  async openSurvey(survName){
    let survey;
    await surveyDB.find({surveyName: survName}, (err, res) => {
      if(err){
        console.log(err);
        return
      }
      survey = res[0];
    });
    console.log(survey);
    this.props.navigation.navigate('SurveyContainer', 
      {
        surveyData: survey.surveyData, 
        surveyName: survName, 
        SRSData: survey.SRSData, 
        ASData: survey.ASData, 
        MicroData: survey.MicroData
      }
    );
  }

  renderInProgress(){
    const {inProgress} = this.state;
    let surveyArray = [];
    console.log(inProgress)
    for(var i = 0; i < inProgress.length; i++){
      let survComponent = (
        <View style={{flex: 1, padding: 10}}>
          <TouchableOpacity onPress={this.openSurvey.bind(this, inProgress[i].surveyName)} style={{borderRadius: 5, padding: 10, backgroundColor: 'lightgray', flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontSize: 17}}>{inProgress[i].surveyName}</Text>
            <Icon type="AntDesign" name="pause"/>
            <Text style={{fontSize: 17, fontStyle: 'italic'}}>{(inProgress[i].surveyData.cleanupDate.getMonth() + 1) + "/" + inProgress[i].surveyData.cleanupDate.getDate() + "/"+inProgress[i].surveyData.cleanupDate.getFullYear()}</Text>
          </TouchableOpacity>
        </View>
      )
      surveyArray.push({key: inProgress[i].surveyName, val: survComponent})
    }
    return <FlatList data={surveyArray} extraData={this.state} renderItem={({item}) => {return item.val}} />
  }
  
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Home Page
        </Text>
        <Text style={styles.paragraph}>
          In Progress
        </Text>
        {this.renderInProgress()}
        <Text style={styles.paragraph}>
          Published
        </Text>
        <Button onPress={() => this.props.navigation.navigate('SurveyEntry')} title="SurveyPage"/>
      </View>
    );
  }
}

export default HomePage;


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

