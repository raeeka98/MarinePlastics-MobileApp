import React, { Component } from 'react';
import { ScrollView, Platform, StatusBar, StyleSheet, View, Text, } from 'react-native';
import { Button } from 'react-native';

import surveyDB from '../storage/mongoStorage'

class ProfilePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      surveysStored: []
    }

    this.retrieveSurveys = this.retrieveSurveys.bind(this)
  }

  async retrieveSurveys() {
    /* Currently just finds all surveys stored on the phone */
    await surveyDB.find({}, (err, response) => {
      if(err) {
        console.log(err);
        return
      }
      console.log("Response successful");
      this.setState({surveysStored : response})
    })
  }

  componentWillMount(){
    /* Retrieve surveys from database */
    this.retrieveSurveys();
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      // username is email.
      <ScrollView style={styles.container}>
        <Text style={styles.paragraph}>
          Profile Page
        </Text>
        <Text>Surveys Submitted:</Text>
        <Text>{JSON.stringify(this.state.surveysStored)}</Text>
      </ScrollView>
    );
  }
}

export default ProfilePage;

// Style variable.
const styles = StyleSheet.create({
  container: {
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

