import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native';


class HomePage extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Home Page
        </Text>
        <Text style={styles.paragraph}>
          In Progress
        </Text>
        <Text style={styles.paragraph}>
          Published
        </Text>
        <Button onPress={() => this.props.navigation.navigate('SurveyEntry')} title="SurveyPage"/>
        <Button onPress={() => this.props.navigation.navigate('Scanner')} title="QR Code Scanner"/>
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
