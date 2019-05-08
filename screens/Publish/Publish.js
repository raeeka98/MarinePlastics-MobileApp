import React, { Component } from 'react';
import {Font} from 'expo'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import {
  Button,
  AsyncStorage
} from 'react-native';

import ImportView from './ImportView';
import surveyDB from '../../storage/mongoStorage'

function LoadedSurveys(props) {
  console.log(props.surveys)
    let i = 0;
    const items = props.surveys.map(survey =>
        <ImportView key={i++} name={survey.surveyName}/>
    );
    console.log(items)
    return items;
}


export default class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      surveys : []
    };

    // bind methods
    this.removeSurvey = this.removeSurvey.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ loading : false });
  }

  async loadSurveys() {
    let responseSurveys = await surveyDB.getNameDate();
    this.setState({surveys: responseSurveys})
  }

  componentWillMount() {
    this.loadSurveys()
  }

  removeSurvey() {

  }

  render() {

    const { navigation } = this.props;
    let surveys = this.state.surveys

    if(this.state.loading) {
      return null// <ActivityIndicator size="large" color="#0000ff" />;
    }
    else {
      return(
        <View style={styles.container}>
            <Button
              title="Import Survey"
              onPress={() => navigation.navigate('Scanner', {
                  surveys : surveys
              })}
            />
            <LoadedSurveys
                surveys={surveys}
                removeSurvey={this.removeSurvey}
            />
          <ImportView name="test1"/>
        </View>
      );
    }
  }
}

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
