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
import surveyDB from '../../storage/mongoStorage'

// props: "surveys", removeSurvey()
function LoadedSurveys(props) {
  console.log(props.surveys) 
    let i = 0;
    const items = props.surveys.map(survey => {
        const item = <ImportView key={i} index={i} name={survey.surveyName} removeSurvey={props.removeSurvey}/>;
        i++;
        return item;
    });
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
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ loading : false });
  }

  async loadSurveys() {
    let responseSurveys = await surveyDB.getNameDate();
    this.setState({surveys: responseSurveys})
  }

  componentWillMount() {
    this.loadSurveys()
  }

  removeSurvey(index) {
      console.log(index);
      this.setState(prevState => {
          prevState.surveys.splice(index, 1);
          return prevState;
      });

  }

  render() {

    const { navigation } = this.props;
    let surveys = this.state.surveys

    if(this.state.loading) {
      return  <ActivityIndicator size="large" color="#0000ff" />;
    }
    else {
      return(
        <Container>
            <Content padder>
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
                removeSurvey={this.removeSurvey}
              />
              {surveys.length > 1
                ?
                  <Button>
                      <Text>Compile</Text>
                  </Button>
                :
                  <Button>
                      <Text>Next</Text>
                  </Button>
              }
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
