import React, { Component } from 'react';
import {Font} from 'expo'

import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body
} from 'native-base'

export default class ImportView extends Component {

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

    render() {
        return (
          <View>
            <Container>
              <Header/>
              <Content>
                <Card style={{flex:0}}>
                    <CardItem>
                      <Left>
                        <Body>
                            <Text>{this.props.name}</Text>
                        </Body>
                      </Left>
                      <Right>
                          <Body>
                            <Button iconLeft light>
                              <Icon name='arrow-back' />
                              <Text>Back</Text>
                            </Button>
                          </Body>
                      </Right>
                    </CardItem>
                   
                </Card>
              </Content>
            </Container>
          </View>

        );
    }
}
