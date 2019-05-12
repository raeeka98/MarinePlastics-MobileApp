import React, { Component } from 'react';

import { Image } from 'react-native';

import {
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base';

export default class ImportView extends Component {
  render() {
    let { survey, index } = this.props;
    const s = JSON.parse(survey);
    return (
      <Card>
        <CardItem>
          <Left>
            <Text>{s.surveyName ? s.surveyName : "NO NAME"}</Text>
          </Left>
          <Right>
              {index == 0 ?
                <Text>[MASTER]</Text>
                :
                <Button danger
                  id={index}
                  onPress={() => this.props.removeSurvey(index)}
                  >
                  <Icon name="trash" />
                </Button>
              }

          </Right>
        </CardItem>
      </Card>
    );
  }
}
