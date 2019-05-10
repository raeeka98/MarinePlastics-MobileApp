import React, { Component } from 'react';

import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

import {

  AsyncStorage
} from 'react-native';

import {
  Button,
  Text,
  Container,
  Header,
  Content,
  Card,
  CardItem,
} from 'native-base';

import Scanner from "./Scanner";
import Import from "./Import";


export default class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      isScanning : false,
      surveys : []
    };

    // bind methods
    this.toScanner = this.toScanner.bind(this);
    this.removeSurvey = this.removeSurvey.bind(this);
    this.addSurvey = this.addSurvey.bind(this);
  }

  async componentDidMount() {
      this.setState({ loading : false });
  }

  removeSurvey(index) {
      this.setState(prevState => {
          prevState.surveys.splice(index, 1);
          return prevState;
      });
  }
  addSurvey(data) {
      this.setState(prevState => {
          prevState.surveys.push(data);
          prevState.isScanning = false;
          return prevState;
      });
  }

  toScanner() { this.setState({ isScanning : true  }); }

  render() {
    if(this.state.loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    else {
      return(
        <Container>
            {this.state.isScanning ?
                <Scanner
                  surveys={this.state.surveys}
                  addSurvey={this.addSurvey}/>
            :
                <Import
                  surveys={this.state.surveys}
                  removeSurvey={this.removeSurvey}
                  toScanner={this.toScanner}/>
            }
        </Container>
      );
    }
  }
}
