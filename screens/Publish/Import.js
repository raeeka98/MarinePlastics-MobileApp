import React, { Component } from 'react';

import {
  Platform,
  StatusBar,
  StyleSheet,
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
  Icon,
  CardItem,
  Fab,
  View
} from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import ImportView from './ImportView';

// props: "surveys", removeSurvey()
function LoadedSurveys(props) {
    let i = 0;
    const items = props.surveys.map(survey => {
        const item = <ImportView key={i} index={i} survey={survey} removeSurvey={props.removeSurvey}/>;
        i++;
        return item;
    });
    return (
      <View>
        {items}
      </View>

    );
}


export default class Import extends Component {
  constructor(props) {
    super(props);

  }

  render() {
      return(
        <Container>
            <View style={{ flex: 1}}>
              <Fab
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomLeft"
                onPress={this.props.toScanner}>
                <Icon name="camera" />
              </Fab>
              <Fab
                containerStyle={{ }}
                style={{ backgroundColor: '#5ce090' }}
                position="bottomRight"
                onPress={this.props.publishSurvey}>
                <Icon name="md-checkmark"/>
              </Fab>
              <LoadedSurveys
                surveys={this.props.surveys}
                removeSurvey={this.props.removeSurvey}
              />
            </View>
        </Container>
      );
    }
}
