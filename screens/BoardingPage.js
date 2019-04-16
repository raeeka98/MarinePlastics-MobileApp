import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native';


class BoardingPage extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Marine Plastics Monitor
        </Text>
        <Button onPress={() => this.props.navigation.navigate('Home')} title="Home"/>
        <Button onPress={() => this.props.navigation.navigate('Login')} title="Login"/>
      </View>
    );
  }
}

export default BoardingPage;

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

