import React, { Component } from 'react';

import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

import {

  AsyncStorage
} from 'react-native';

import {
  Button,
  Text,
  Container,
  Header,
  Content,
  Card,
  CardItem,
} from 'native-base';

import ImportView from './ImportView';

// props: "surveys", removeSurvey()
function LoadedSurveys(props) {
    let i = 0;
    const items = props.surveys.map(survey =>
        <ImportView key={i++} name={survey}/>
    );
    return (
        <Container>
            {items}
        </Container>
    );
}


export default class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      surveys : []
    };

    // bind methods
    this.removeSurvey = this.removeSurvey.bind(this);
  }

  async componentDidMount() {
      this.setState({ loading : false });
  }

  removeSurvey() {

  }

  render() {

    const { navigation } = this.props;
    let surveys = navigation.getParam('surveys', []);

    if(this.state.loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    else {
      return(
        <Container>
            <Content>
              <Button
                onPress={() => navigation.navigate('Scanner', {
                    surveys : surveys
                })}>
                <Text>
                    Scan a Survey
                </Text>
              </Button>
              <LoadedSurveys
                surveys={surveys}
              />
            </Content>
        </Container>
      );
    }
  }
}

// Style variable.
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  }
});
