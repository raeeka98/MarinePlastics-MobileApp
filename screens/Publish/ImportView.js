import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class ImportView extends Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Left>
            <Text>{this.props.name}</Text>
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
