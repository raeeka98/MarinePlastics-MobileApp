import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, } from 'react-native';
import { Button } from 'react-native';


class ProfilePage extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return(
      // username is email.
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Profile Page
        </Text>
      </View>
    );
  }
}

export default ProfilePage;

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

