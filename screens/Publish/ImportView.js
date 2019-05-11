import React, { Component } from 'react';
import {Font} from 'expo'
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
    return (
      <Card>
        <CardItem>
          <Left>
            <Button transparent onPress={() => this.props.openPublishModal(this.props.index)}>
              <Text>{this.props.name}</Text>
            </Button>
          </Left>
          <Right>
              <Button danger
                id={this.props.index}
                onPress={() => this.props.removeSurvey(this.props.index)}
                >
                <Icon name="trash" />
              </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
