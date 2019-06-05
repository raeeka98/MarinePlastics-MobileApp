import React, { Component } from 'react';

import {
  Container,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Right
} from 'native-base';

export default class Published extends Component {
  render() {
    let { survey, index } = this.props;
    const s = JSON.parse(survey);
    return (
      <Container>
        <Text>Published!</Text>
      </Container>
    );
  }
}
