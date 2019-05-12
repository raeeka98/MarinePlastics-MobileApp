import React, { Component } from 'react';

import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {

  AsyncStorage
} from 'react-native';

import {
  Spinner,
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


export default class PublishContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      isImporting : true,
      isScanning : false,
      isPublished : false,
      surveys : []
    };
  }

  async componentDidMount() {
      this.setState({ loading : false });
  }

  removeSurvey = (index) => {
      this.setState(prevState => {
          prevState.surveys.splice(index, 1);
          return prevState;
      });
  }

  addSurvey = (data) => {
      this.setState(prevState => {
          prevState.surveys.push(data);
          prevState.isScanning = false;
          prevState.isImporting = true;
          prevState.isPublished = false;
          return prevState;
      });
  }

  publishSurvey = () => {

  }

  toScanner = () => {
    this.setState({
      isScanning : true,
      isImporting : false,
      isPublished : false
    });
  }

  render() {
    if(this.state.loading) {
      return <Spinner color='green'/>;
    }
    else {
      return(
        <Container>
            {this.state.isScanning &&
                <Scanner
                  surveys={this.state.surveys}
                  addSurvey={this.addSurvey}/>
            }
            {this.state.isImporting &&
                <Import
                  surveys={this.state.surveys}
                  publishSurvey={this.publishSurvey}
                  removeSurvey={this.removeSurvey}
                  toScanner={this.toScanner}/>
            }
            {this.state.isPublished &&
                <Published/>
            }
        </Container>
      );
    }
  }
}
