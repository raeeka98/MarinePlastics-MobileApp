import React, { Component } from 'react';
import { Platform, StyleSheet, AppRegistry } from 'react-native';
import { Alert, AsyncStorage, Linking, Image } from 'react-native';
import {Icon, View, Button, Text, Container, Content } from 'native-base'

import jwtDecode from 'jwt-decode';
import Auth0 from 'react-native-auth0';
import { AuthSession } from 'expo';
import PageHeader from '../components/PageHeader';


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
    this.state = { accessToken: null, email: null, name: null, picture: null};
  }

  static navigationOptions ={
    title: "Profile/Login",
    drawerIcon: ({focused}) => (
      <Icon type='MaterialIcons' name='person' style={{fontSize: 20, color: (focused ? 'blue' : 'black')}} />
    )
  }

  // Upon loading the page, retrieve all of the following variables stored in async storage.
  componentWillMount() {
    this._retrieveAccessToken()
    this._retrieveEmail()
    this._retrieveNickname()
    this._retrievePicture()
  }

  // Log out by setting the stored variables to null then saving to AsyncStorage.
  _onlogout = async () => {
    console.log('Setting AccessToken to Null for Logout');
    Linking.openURL(`${credentials.domain}/v2/logout`).then(success => {
      this.setState({ accessToken: null, email: null, name: null, picture: null }, () => {this._storeAccessToken()})}).catch(
        error => console.log(error));
    console.log('Successful Logout');
  };

  // Log into Auth0 then store the token to AsyncStorage.
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
    // The redirect url that directs a user to auth0's login page.
    const authUrl = `${credentials.domain}/authorize` + queryParams;

    // Access auth0 login by calling the redirect url in an authsession.
    const response = await AuthSession.startAsync({ authUrl });
    console.log('Authentication response ', response);

    // Handle the response if login was successful.
    if (response.type === 'success'){
      this.handleResponse(response.params);
    }
  };

  // Handle response from auth0 login (make the call to store the data from the response).
  handleResponse = (response) => {
    // Error catch in case the response was some sort of error.
    if (response.error) {
      console.log("Uh oh")
      Alert('Authentication error', response.error_description || 'something went wrong');
      return;
    }
    console.log("Response recorded " + JSON.stringify(response));
    // Store the response and decode it.
    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);
    console.log(decoded);
    // Extract the following values given the keys from the decoded response.
    const { sub } = decoded;
    const { name } = decoded;
    const { nickname } = decoded;
    const { picture } = decoded;
    // Set the following state variables given the keys form the response.
    this.setState({accessToken: sub, email: name, name: nickname, picture: picture}, () => {this._storeAccessToken()});

    console.log('Storing AccessToken for LogIn');
    //this._storeAccessToken();
  };

  // Persist the data with AsyncStorage.
  _storeAccessToken = async () => {
    try {
      // Set variables to be values from the state.
      let value = this.state.accessToken;
      let emailValue = this.state.email;
      let nameValue = this.state.name;
      let pictureValue = this.state.picture;
      // If the value we're storing is null then we're erasing it.
      if (value === null){
        //console.log('Value is Null on storeAccesToken');
        console.log('Clearing AccessToken in AsyncStorage');
        await AsyncStorage.removeItem('accessToken');
        console.log('Cleared');
        console.log('Current value stored: ', await AsyncStorage.getItem('accessToken'));
      }
      // Otherwise, we're overriding that variable's value with the other one (from state).
      else {
        //console.log('Value is not Null on storeAccessToken');
        console.log('Overriding AccessToken in AsyncStorage');
        await AsyncStorage.setItem('accessToken', value);
        console.log('Overwritten');
        console.log('Current value stored: ', await AsyncStorage.getItem('accessToken'));
      }

      // Repeat for accesstoken (above), email, nickname, and picture (below).
      if (emailValue === null){
        //console.log('Email value is Null on Email');
        console.log('Clearing Email in AsyncStorage');
        await AsyncStorage.removeItem('email');
        console.log('Cleared');
        console.log('Current email stored: ', await AsyncStorage.getItem('email'));
      }
      else {
        //console.log('Email value is not Null on Email');
        console.log('Overriding Email in AsyncStorage');
        await AsyncStorage.setItem('email', emailValue);
        console.log('Overwritten');
        console.log('Current email stored: ', await AsyncStorage.getItem('email'));
      }

      if (nameValue === null){
        //console.log('Name value is Null on Name');
        console.log('Clearing Name in AsyncStorage');
        await AsyncStorage.removeItem('name');
        console.log('Cleared');
        console.log('Current name stored: ', await AsyncStorage.getItem('name'));
      }else {
        //console.log('Name value is not Null on Name');
        console.log('Overriding Name in AsyncStorage');
        await AsyncStorage.setItem('name', nameValue);
        console.log('Overwritten');
        console.log('Current name stored: ', await AsyncStorage.getItem('name'));
      }

      if (pictureValue === null){
        //console.log('Picture value is Null on Picture');
        console.log('Clearing Picture in AsyncStorage');
        await AsyncStorage.removeItem('picture');
        console.log('Cleared');
        console.log('Current picture stored: ', await AsyncStorage.getItem('picture'));
      }else {
        //console.log('Picture value is not Null on Picture');
        console.log('Overriding Picture in AsyncStorage');
        await AsyncStorage.setItem('picture', pictureValue);
        console.log('Overwritten');
        console.log('Current picture stored: ', await AsyncStorage.getItem('picture'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get the accessToken from AsyncStorage and set the according state variable.
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

  // Get the email from AsyncStorage and set the according state variable.
  _retrieveEmail = async() => {
    try {
      const emailValue = await AsyncStorage.getItem('email');
      if (emailValue !== null) {
        this.setState({ email: emailValue });
      } else {
        this.setState({ email: null });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get the name from AsyncStorage and set the according state variable.
  _retrieveNickname = async() => {
    try {
      const nameValue = await AsyncStorage.getItem('name');
      if (nameValue !== null) {
        this.setState({ name: nameValue });
      } else {
        this.setState({ name: null });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Get the picture from AsyncStorage and set the according state variable.
  _retrievePicture = async() => {
    try {
      const pictureValue = await AsyncStorage.getItem('picture');
      if (pictureValue !== null) {
        this.setState({ picture: pictureValue });
      } else {
        this.setState({ picture: null });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Render the GUI elements.
  render() {
    // Navigation variable (DO NOT TOUCH).
    const {navigate} = this.props.navigation;
    // We'll determine if a user is logged in just by looking at the accesstoken state variable.
    // Store that in a boolean variable.
    let loggedIn = this.state.accessToken === null ? false : true;
    return(
      <View style={{justifyContent: "center"}}>
        <PageHeader title="Profile" openDrawer={this.props.navigation.openDrawer}/>
        <View style={styles.container}>
          <Image
              style={{width:150, height: 150}}
              source={loggedIn ? {uri : this.state.picture} : require('./blank-profile-picture.png')}
            />
          <Text style={styles.container}>
            {loggedIn ? 'Welcome back '+this.state.name : 'You are now a Guest'}
          </Text>
          <Text style={styles.container}>
            {loggedIn ? "Email: "+this.state.email : ''}
          </Text>
          <Text style={[styles.paragraph]}>Log in with Auth0</Text>
          {loggedIn ? null : <Button info onPress={this._loginV3} style={styles.button}>
            <Text style={[styles.paragraph]}>Log In</Text>
          </Button>}
          {loggedIn ? <Button danger onPress={this._onlogout} style={styles.button}>
            <Text style={[styles.paragraph]}>Log Out</Text>
          </Button> : null}
        </View>
    </View>

      /*
      <View>
        <PageHeader title="Profile" openDrawer={this.props.navigation.openDrawer} />
        <View style={styles.container}>

          <Text style={styles.header}>Log in with Auth0</Text>
          <Text>
            You are {loggedIn ? '' : 'not '}logged in.
          </Text>
          <Button
            //title = {loggedIn ? 'log out' : 'log in'}/>
            onPress={this._loginV3}
            title={'log in'}/>
          <Button
            onPress={this._onlogout}
            title={'log out'}/>
          <Text style={styles.container}>
            {loggedIn ? 'Welcome back '+this.state.name : 'You are now a Guest'}
          </Text>
          <Text style={styles.container}>
            Email: {loggedIn ? this.state.email : ''}
          </Text>
          <Image
            style={{width:50, height: 50}}
            source={loggedIn ? {uri : this.state.picture} : require('./blank-profile-picture.png')}
          />
        </View>
      </View>*/
    );
  }
}

// Register this component to the app's registry.
AppRegistry.registerComponent('LogInPage', () => LogInPage);

// Usual export statement.
export default LogInPage;

// Style variable.
const styles = StyleSheet.create({
  /*
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
  }*/

  container: {
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  paragraph: {
    marginHorizontal: 24,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  button: {
    alignSelf: 'center',
    marginTop: 25,
    fontSize: 20,
    width: "80%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#158964"
  }
});
