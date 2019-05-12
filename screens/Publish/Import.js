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
            <Content padder>
              <Button onPress={this.props.toScanner}>
                <Text>
                    Scan a Survey
                </Text>
              </Button>
              <LoadedSurveys
                surveys={this.props.surveys}
                removeSurvey={this.props.removeSurvey}
              />
              <Button
                onPress={this.props.publishSurvey}>
                  <Text>
                    {this.props.surveys.length > 1 ? "Merge Surveys" : "Next"}
                  </Text>
              </Button>
            </Content>
        </Container>
      );
    }
}
