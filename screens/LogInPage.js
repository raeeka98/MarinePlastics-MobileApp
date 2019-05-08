import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, AppRegistry } from 'react-native';
import { Button, Alert, AsyncStorage } from 'react-native';

import jwtDecode from 'jwt-decode';
import Auth0 from 'react-native-auth0';
import { AuthSession } from 'expo';


// Load necessary credentials to a new Auth0 variable.
var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);

// Map parameters to a query string.
function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { accessToken: null };
    //this._retrieveAccessToken();
    this.state = { accessToken: this._retrieveAccessToken()};
  }

  /*
  componentWillMount() {
    this._retrieveAccessToken();
  };*/

  // Log out by setting the accessToken to null.
  _onlogout = () => {
    console.log('Setting accessToken to Null for LogOut');
    if (Platform.OS === 'android'){
      this.setState({ accessToken: null });
      this._storeAccessToken();
    }
    else {
      auth0.webAuth
        .clearSession({})
        .then(success => {
          this.setState({ accessToken: null });
          this._storeAccessToken();
        })
        .catch(error => console.log(error));
    }
  };

  // Log into Auth0.
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

  // Handle response from auth0 login.
  handleResponse = (response) => {
    if (response.error) {
      console.log("Uh oh")
      Alert('Authentication error', response.error_description || 'something went wrong');
      return;
    }
    console.log("Response recorded " + JSON.stringify(response)) 
    const jwtToken = response.id_token; 
    const decoded = jwtDecode(jwtToken);
    console.log(decoded);
    const { sub } = decoded;
    this.setState({accessToken: sub});

    console.log('Storing Access Token for LogIn')
    this._storeAccessToken();
  };

  // Persist the data with AsyncStorage.
  _storeAccessToken = async () => {
    try {
      let value = this.state.accessToken;
      //console.log(value);
      if (value === null){
        console.log('Value is Null on storeAccesToken');
        await AsyncStorage.removeItem('accessToken');
        console.log('Current val: ', await AsyncStorage.getItem('accessToken'))
      }
      else {
        console.log('Value is not Null on storeAccessToken');
        console.log('value', value);
        await AsyncStorage.setItem('accessToken', value);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  // Get the accessToken from AsyncStorage.
  _retrieveAccessToken = async() => {
    try {
      const value = await AsyncStorage.getItem('accessToken');
      if (value !== null) {
        this.setState({ accessToken: value });
      } else {
        this.setState({ accessToken: null });
      }
    } catch (error) {
      console.log(error);
    }
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
          //title = {loggedIn ? 'log out' : 'log in'}/>
          onPress={this._loginV3}
          title={'log in'}/>
        <Button 
          onPress={this._onlogout}
          title={'log out'}/>
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

