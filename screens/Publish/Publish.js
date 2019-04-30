import React, { Component } from 'react';

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

function LoadedSurveys(props) {
    const items = props.surveys.map(survey =>
        <Text>survey</Text>
    );
    return items;
}


export default class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true
    };
  }

  async componentDidMount() {
      const { navigation } = this.props;

      const allSurveys = navigation.getParam('allSurveys', 'NONE');
      const newSurvey = navigation.getParam('newSurvey', 'NO_NEW_SURVEY');
      let surveys = [];
      if (allSurveys != 'NONE') {
          surveys = allSurveys;
      }
      if (newSurvey != 'NO_NEW_SURVEY') {
          surveys.push(newSurvey);
      }
      this.setState({ surveys, loading : false });
  }

  render() {

    const { navigation } = this.props;

    if(this.state.loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    else {
      return(
        <View style={styles.container}>
            <Button
              title="Import Survey"
              onPress={() => navigation.navigate('Scanner', {
                  allSurveys : this.state.surveys
              })}
            />
            <LoadedSurveys
                surveys={this.state.surveys}
            />
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
