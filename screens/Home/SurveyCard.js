import React, { Component } from 'react';

import {
  Icon,
  Footer,
  Button,
  Toast,
  Text,
  Body,
  Left,
  Right,
  Container,
  Card,
  CardItem,
  Header,
  Content,
  View
} from 'native-base'

import {
  Platform,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';

function SurveyCard(props) {
  const { survey, showSurveyModal } = props;
  return (
    <Card>
      <TouchableOpacity>
        <CardItem
          button
          onPress={props.showSurveyModal.bind(this, survey)}
        >
          <Left>
            <Body>
              <Text>
                {survey.surveyName.length <= 15 ? survey.surveyName : survey.surveyName.substr(0, 13) + "..."}
              </Text>
            </Body>
          </Left>
          <Text>
            {
              survey.surveyData.cleanupDate ?
                (survey.surveyData.cleanupDate.getMonth() + 1) + "/"
                + survey.surveyData.cleanupDate.getDate() + "/"
                + (survey.surveyData.cleanupDate.getFullYear() % 100) :
                "No Date"
            }
          </Text>
          <Right>
            <Button transparent onPress={props.showSurveyModal.bind(this, survey)}>
              <Icon active name='share' />
            </Button>
          </Right>
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
}

export { SurveyCard }
