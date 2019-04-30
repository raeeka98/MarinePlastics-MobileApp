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
    let i = 0;
    const items = props.surveys.map(survey =>
        <Text key={i++}>Survey #{i}: {survey}</Text>
    );
    return items;
}


export default class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      surveys : []
    };
  }

  async componentDidMount() {
      this.setState({ loading : false });
  }

  render() {

    const { navigation } = this.props;
    let surveys = navigation.getParam('surveys', []);

    if(this.state.loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
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
