import React, { Component } from 'react'

import {
  Item,
  Text,
  Button,
  Icon,
  Accordion,
  Card,
  CardItem,
  Left,
  View,
  Right
} from 'native-base'

/**
 * Styling for the header component of the survey accordion.
 */
export default function SurveyItemHeader(props) {
  const { title, expanded } = props;
  if(expanded) {
      return (
          <View
              style={{
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "space-between",
                  alignItems: "center" ,
                  backgroundColor: "#87cefa" }}
          >
              <Text style={{fontWeight: "500"}}>{" "}{title}</Text>
              <Icon style={{fontSize: 18}} type="SimpleLineIcons" name="arrow-up"/>
          </View>
      );
  }
  else{
    return(
      <Card style={{height: 100}}>
        <CardItem bordered style={{flex: 1}}>
          <Left>
            <Text style={{fontWeight: "600", color: 'black', fontSize: 20}}>{" "}{title}</Text>
          </Left>
          <Right>
            <Icon style={{fontSize: 18, color: 'black'}}type="SimpleLineIcons" name="arrow-down"/>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
