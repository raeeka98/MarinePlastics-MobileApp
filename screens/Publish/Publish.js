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
import Modal from 'react-native-modal'

import ImportView from './ImportView';
import surveyDB from '../../storage/mongoStorage'

// props: "surveys", removeSurvey()
function LoadedSurveys(props) {
  console.log(props.surveys) 
    let i = 0;
    const items = props.surveys.map(survey => {
        const item = <ImportView 
                        key={i} 
                        index={i} 
                        name={survey.surveyName} 
                        removeSurvey={props.removeSurvey}  
                        convertSurvey={props.convertSurvey}/>;
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
      surveys : [],
      selectedName: '',
      selectedIndex: 0,
      isSubmitModalVisible: false
    };

    // bind methods
    this.removeSurvey = this.removeSurvey.bind(this);
    this.convertSurvey = this.convertSurvey.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ loading : false });
  }

  async loadSurveys() {
    let responseSurveys = await surveyDB.get();
    this.setState({surveys: responseSurveys})
  }

  componentWillMount() {
    this.loadSurveys()
  }

  isSurveyValid(){
    let {selectedIndex} = this.state;
    let survey = this.state.survey[selectedIndex]
    let invalid = [];

    const requiredIDs = ['userFirst', 'userLast', 'orgName', 'orgLoc',
        'cleanUpTime', 'cleanUpDate', 'beachName', 'compassDegrees', 'riverName',
        'riverDistance', 'slope', 'tideHeightA', 'tideHeightB', 'tideTimeA',
        'tideTimeB', 'tideTypeA', 'tideTypeB', 'windDir', 'windSpeed',
        'latitude', 'longitude'
    ];

    for(const id in requiredIDs) {
      if(survey.surveyData[id] === undefined) {
        invalid.push(id);
      }
    }

    if(!survey.surveyData.locationChoiceDebris && !survey.surveyData.locationChoiceOther 
        && !survey.surveyData.locationChoiceProximity)
        invalid.push('locChoice')
    
    if(!survey.surveyData.usageRecreation && !survey.surveyData.usageCommercial
        && !survey.surveyData.usageOther)
        invalid.push('usage')

    if(!survey.surveyData.substrateTypeSand && !survey.surveyData.substrateTypePebble && !survey.surveyData.substrateTypeRipRap
        && !survey.surveyData.substrateTypeSeaweed && !survey.surveyData.substrateTypeOther)
        invalid.push('subType');
  }

  onPressSubmit(){
    let invalidArray = this.isSurveyValid();
    if(invalidArray.length > 0){
      /* If we have some invalid fields, navigate to SurveyContainer and indicate which fields are invalid */
    } else {
      /* Call the function to check if the beach name matches a name in the database */
      /* If it returns true, then submit the survey to the database using the beach data stored in the db */
      /* Else, check beaches within a 5 mile radius (Maybe use Connor's haversine formula? */
        /* If the user selects a beach on there (ie the name of the beach they intended to submit under), submit using that data */
        /* Otherwise, create a new beach in the database */
    }
  }

  removeSurvey(index) {
      console.log(index);
      this.setState(prevState => {
          prevState.surveys.splice(index, 1);
          return prevState;
      });

  } 

  calculateTotals(index, type) {
    let currentSurvey = this.state.surveys[index]
    let totals = {};
    let totalsArray = [];
    let data;
    switch(type){
      case 'SRS':
        data = currentSurvey.SRSData;
        break;
      default: 
        data = currentSurvey.ASData;
    }

    for (const id in data) {
      const noSuffix = type === 'SRS' ? id.replace(/__[1-4]/, '') : id.replace(/__accumulation/, '');
      const trashName = noSuffix.replace(/__\w+/, '');
      const freshWeath = noSuffix.replace(/\w+__/, '');
      if(totals[trashName] === undefined) {
        totals[trashName] = {
            fresh: 0,
            weathered: 0
        }
      }
      if(freshWeath === 'weathered') {
        totals[trashName].weathered += data[id];
        if(isNaN(totals[trashName].weathered)) {
          totals[trashName].weathered = 0;
        }
      } else {
        totals[trashName].fresh += data[id];
        if(isNaN(totals[trashName].fresh)) {
          totals[trashName].fresh = 0;
        }
      }
    }
    for (const id in totals) {
      totalsArray.push([
        id,
        {fresh: totals[id].fresh, weathered: totals[id].weathered}
      ])
    }
    return totalsArray
  }

  combineDateTime(index) {
    let currentSurveyData = this.state.surveys[index].surveyData,
    currentDate = currentSurveyData.cleanupDate.toISOString(),
    dateOnly = currentDate.split('T')[0],
    currentTime = currentSurveyData.cleanupTime.toISOString(),
    timeOnly= currentTime.split('T')[1];
    let returnDate = new Date(dateOnly + 'T' + timeOnly)
    return returnDate
  }

  convertSurvey(index) {
    console.log(`------------------ CONVERTING SURVEY OF INDEX ${index} --------------------`)
    let currentSurvey = this.state.surveys[index];
    let surveyData = currentSurvey.surveyData;
    
    const form = {
      survData: {
        user: {
          f: surveyData.userFirst ? surveyData.userFirst : "",
          l: surveyData.userLast ? surveyData.userLast : "",
        },
        email: /* Email from the preserved data that Diego has */"",
        userID: /* AsyncStorage call to get the sub of the user ID */ "",
        org: surveyData.orgName ? surveyData.orgName : "",
        reason: {
          debris: surveyData.locationChoiceDebris ? surveyData.locationChoiceDebris : undefined,
          prox: surveyData.locationChoiceProximity ? surveyData.locationChoiceProximity : undefined,
          other: surveyData.locationChoiceOther ? surveyData.locationChoiceOther : undefined
        },
        survDate: this.combineDateTime(index),
        st: { 
          s: surveyData.substrateTypeSand ? surveyData.substrateTypeSand : undefined,
          p: surveyData.substrateTypePebble ? surveyData.substrateTypePebble : undefined,
          rr: surveyData.substrateTypeRipRap ? surveyData.substrateTypeRipRap : undefined,
          sea: surveyData.substrateTypeSeaweed ? surveyData.substrateTypeSeaweed : undefined,
          other: surveyData.substrateTypeOther ? surveyData.substrateTypeOther : undefined
        },
        slope: surveyData.slope ? surveyData.slope : "",
        cmpsDir: surveyData.cmpsDir ? surveyData.cmpsDir : 0,
        lastTide : {
          type: surveyData.tideTypeB ? surveyData.tideTypeB : "",
          time: surveyData.tideTimeB ? surveyData.tideTimeB : "",
          height: surveyData.tideHeightB ? surveyData.tideHeightB: ""
        },
        nextTide: {
          type: surveyData.tideTypeA ? surveyData.tideTypeA : "",
          time: surveyData.tideTimeA ? surveyData.tideTimeA : "",
          height: surveyData.tideHeightA ? surveyData.tideHeightA : ""
        },
        wind: {
          dir: surveyData.windDir? surveyData.windDir : "",
          spd: surveyData.windSpeed ? surveyData.windSpeed : ""
        },
        majorUse: {
          rec: surveyData.usageRecreation ? surveyData.usageRecreation : undefined,
          com: surveyData.usageCommercial ? surveyData.usageCommercial : undefined,
          other: surveyData.usageOther ? surveyData.usageOther : undefined
        } ,
        SRSDebris: this.calculateTotals(index, 'SRS'),
        ASDebris: this.calculateTotals(index, 'AS')
      },
      bID: /* This may need to be figured out in the backend */ 123,
      beachData: {
        n: surveyData.beachName,
        nroName: surveyData.riverName,
        lat: /* Something given */ 123,
        lon: 123,
        nroDist: surveyData.riverDistance
      }
    }
    console.log(form);
    this.setState({formToSubmit: form, isSubmitModalVisible: true, selectedName: currentSurvey.surveyName});
    // Then we should validate the form
  }

  render() {

    const { navigation } = this.props;
    let surveys = this.state.surveys
    console.log(surveys)
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
                convertSurvey={this.convertSurvey}
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
            <Modal isVisible={this.state.isSubmitModalVisible}>
                <View style={{alignSelf: 'center', width: '90%', height: 250, backgroundColor: 'white'}} >
                  <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Submit {this.state.selectedName}?</Text>
                  <View style={{flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'flex-end'}}>
                    <Button light style={{alignSelf: 'center'}} onPress={() => this.setState({isSubmitModalVisible: false})}>
                      <Text>Cancel</Text>
                    </Button>
                    <Button success style={{alignSelf: 'center'}} onPress={() => this.setState({isSubmitModalVisible: false})}>
                      <Text>Submit</Text>
                    </Button>
                  </View>
                </View>
              </Modal> 
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
