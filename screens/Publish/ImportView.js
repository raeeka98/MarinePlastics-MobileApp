import React, { Component } from 'react';
import * as Font from 'expo-font'
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';


export default class ImportView extends Component {

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }


  render() {
    let { index, name } = this.props;
    return (
      <Card style={{ borderRadius:10 }}>
        <CardItem bordered style={{
            borderRadius: 10,
            height: 100
          }}>
          <Left>
            <Button transparent onPress={() => {}}>
              <Text>{name}</Text>
            </Button>
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
