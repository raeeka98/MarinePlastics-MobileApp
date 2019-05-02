import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, AppRegistry } from 'react-native';
import { Button, Alert } from 'react-native';

import jwtDecode from 'jwt-decode';
import Auth0 from 'react-native-auth0';
import { AuthSession } from 'expo';


var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);


function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: null };
  }

  _onlogout = () => {
    if (Platform.OS === 'android'){
      this.setState({ accessToken: null });
    }
    else {
      auth0.webAuth
        .clearSession({})
        .then(success => {
          this.setState({ accessToken: null });
        })
        .catch(error => console.log(error));
    }
  };

  _loginV3 = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL: ${redirectUrl}`);

    const queryParams = toQueryString({
      client_id: credentials.clientId,
      redirect_uri: redirectUrl,
      response_type: 'id_token',
      scope: 'openid profile',
      nonce: 'nonce',
    });
    const authUrl = `${credentials.domain}/authorize` + queryParams;

    const response = await AuthSession.startAsync({ authUrl });
    console.log('Authentication response', response);

    if (response.type === 'success'){
      this.handleResponse(response.params);
    }
  };

  handleResponse = (response) => {
    if (response.error) {
      Alert('Authentication error', response.error_description || 'something went wrong');
      return;
    }

    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);

    const { name } = decoded;
    this.setState({name});
  };


  render() {
    const {navigate} = this.props.navigation;
    let loggedIn = this.state.accessToken === null ? false : true;
    return(
      <View style={styles.container}>
        <Text style={styles.header}>Log in with Auth0</Text>
        <Text>
          You are {loggedIn ? '' : 'not'} logged in.
        </Text>
        <Button
          //onPress={loggedIn ? this._onlogout : this._onlogin}
          //onPress={loggedIn ? this._onlogout : this._loginInWAuth0}
          onPress={loggedIn ? this._onlogout : this._loginV3}
          title = {loggedIn ? 'log out' : 'log in'}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('LogInPage', () => LogInPage);

export default LogInPage;

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

