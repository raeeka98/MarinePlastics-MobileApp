import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Body, Left, Right, IconNB, View } from "native-base";
export default class Example extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card style={{ borderRadius: 8 }}>
            <CardItem header bordered style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  NativeBase is a free and open source framework that enable
                  developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps
                  with a fusion of ES6.
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  NativeBase builds a layer on top of React Native that provides
                  you with
                  basic set of components for mobile application development.
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  Get on the mobile fast track with NativeBase, the
                  fastest-growing platform
                  and tool set for iOS and Android development.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
        </Content>
      </Container >
    );
  }
}
