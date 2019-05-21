import React, { Component } from 'react';

import {
  Icon,
  Footer,
  Button,
  Toast,
  Text,
  Container,
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
    return(
      <View style={{flex: 1, padding: 10, height: '15%'}}>
        <TouchableOpacity
          onPress={props.showSurveyModal.bind(this, survey)}
          style={
            {
              height: 35,
              borderRadius: 5,
              padding: 10,
              backgroundColor: 'lightblue',
              borderColor: 'black',
              borderWidth: 1
            }
          }
        >
          <Text
            style={
              {
                position: 'absolute',
                marginTop: '1%',
                width:"50%",
                textAlign:'center',
                paddingRight: '5%',
                fontSize: 16,
                fontWeight:'bold'
              }
            }
          >
            {survey.surveyName.length <= 15 ? survey.surveyName : survey.surveyName.substr(0, 13) + "..."}
          </Text>
          <Icon
            style={
              {
                position: 'absolute',
                marginTop: '1%',
                marginHorizontal: '46%',
                alignSelf: 'center'
              }
            }
            type="AntDesign"
            name="pause"
          />
          <View style={
                {
                  position: 'absolute',
                  marginTop: '1%',
                  paddingLeft: '66%',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }
              }>
            <Text
              style={{fontSize: 17,
                fontStyle: 'italic'}}
            >
              {
                survey.surveyData.cleanupDate ?
                  (survey.surveyData.cleanupDate.getMonth() + 1) + "/"
                  + survey.surveyData.cleanupDate.getDate() + "/"
                  + (survey.surveyData.cleanupDate.getFullYear() % 100) :
                  "No Date"
              }
            </Text>
            <Icon type='Entypo' name='dots-three-horizontal'/>
          </View>

        </TouchableOpacity>
      </View>
    );
}

export { SurveyCard }
