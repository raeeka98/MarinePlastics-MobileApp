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
      <Card style={{ borderRadius:10 }}>
        <CardItem bordered style={{
            borderRadius: 10,
            height: 100
          }}>
          <Left>
            <Text>{s.surveyName ? s.surveyName : "NO NAME"}</Text>
          </Left>
          <Right>
              {index == 0 ?
                <Text>[MASTER]</Text>
                :
                <Button danger large
                  id={index}
                  onPress={() => this.props.removeSurvey(index)}
                  >
                  <Icon name="trash" style={{ fontSize: 40 }} />
                </Button>
              }

          </Right>
        </CardItem>
      </Card>
    );
  }
}
