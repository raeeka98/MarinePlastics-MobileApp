import React, { Component } from 'react';
import { Platform, StatusBar, TouchableOpacity, StyleSheet, View, Text, } from 'react-native';
import { Button } from 'react-native';

import surveyDB from '../storage/mongoStorage'


class PublishPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localSurveys: {},

    }

    this.retrieveSurveys = this.retrieveSurveys.bind(this)
  }

  retrieveSurveys() {
    surveyDB.getNameDate();
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

