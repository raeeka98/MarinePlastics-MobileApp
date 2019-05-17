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
import axios from 'axios'

import ImportView from './ImportView';
import surveyDB from '../../storage/mongoStorage'
import { FlatList } from 'react-native-gesture-handler';

// props: "surveys", removeSurvey()
function LoadedSurveys(props) {
    let i = 0;
    const items = props.surveys.map(survey => {
        const item = <ImportView 
                        key={i} 
                        index={i} 
                        name={survey.surveyName} 
                        removeSurvey={props.removeSurvey}  
                        openPublishModal={props.openPublishModal}/>;
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
    const nav = this.props.navigation;
    this.state = {
      loading : true,
      surveys : [],
      selectedName: '',
      selectedIndex: 0,
      isSubmitModalVisible: false,
      isLoginModalVisible: false,
      isLoadingModalVisible: false,
    };

    // bind methods
    this.removeSurvey = this.removeSurvey.bind(this);
    this.convertSurvey = this.convertSurvey.bind(this);
    this.openPublishModal = this.openPublishModal.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.openBeachModal = this.openBeachModal.bind(this);
    this.renderBeachItem = this.renderBeachItem.bind(this);
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

  async openBeachModal(beachName) {
    // Here's where we'll do a special query for the beaches that reside in a certain location
    await axios.get('http://10.0.0.79:3001/beaches/search/closest', 
      {
        params: {
          coords: {
            lat: 36.971528,
            lon: -121.951204
          }
        }
      }
    )
      .then(res => {
        console.log(res.data)
        this.setState({beachName: beachName, isBeachModalVisible: true, isLoadingModalVisible: false, beachList: res.data})
      })
      .catch(err => {
        console.log("COORDS ERROR")
        console.log(err);
        this.setState({isLoadingModalVisible: false});
      })
    
  }

  onPressBeach(beachName, beachID) {

    this.setState({isConfirmModalVisible: true, match: beachID, confirmBeach: beachName});
  }

  onPressNoMatch(beachName) {

    this.setState({isConfirmModalVisible: true, match: null, confirmBeach: beachName})
  }

  async checkIfBeachExists(survey){
    console.log("Hello")
    const beachName = survey.surveyData.beachName;
    //Use the beach name to query the server's database
    const exists = await axios.get('https://marineplastics.herokuapp.com/beaches/search', {params: {q: beachName}})
      .then(res => {
        console.log(res.data)
        if(res.data.length === 0){
          return false;
        } else {
          console.log(res.data) 
          return true;
        }
      })
      .catch(err => {
        console.log(`EERROORRR\n${err}`);
        return false;
      })
    if(exists){
      //If its true, then complete the submission!
      console.log(`The beach ${beachName} exists in the database`);
      //Here's where we'll submit the survey to the database
    } else {
      //If its false, then perform that algorithm to find the beaches within the 5-mile radius and let the user choose the beach
      console.log(`The beach ${beachName} does not exist`);
      this.openBeachModal(beachName);
    }
  }

  async componentWillReceiveProps(props) {
    if(props.navigation.getParam('isVerified')){
      /* If we're coming from the edit, we should call the function that checks
       * to see if the given survey's beach name exists in the survey
       */
      console.log("Verified")
      let verifyID = props.navigation.getParam('verifyID');
      const survey = await surveyDB.getSurvey(verifyID)
      console.log(survey);
      this.checkIfBeachExists(survey); 
    }
  }

  async componentWillMount() {
    console.log("Not verified")
    this.loadSurveys()
  }

  async isSurveyValid(){ 
    //We should also check to see if the user is logged in
    if(await AsyncStorage.getItem('accessToken') === null){
     // Use another modal to alert the user that they must log in
     this.setState({isSubmitModalVisible: false, isLoginModalVisible: true});
     return false
    }
    let {selectedIndex} = this.state;
    let survey = this.state.surveys[selectedIndex]
    console.log("-----SURVEY-----")
    console.log(survey)
    let invalid = [];

    const requiredIDs = ['userFirst', 'userLast', 'orgName', 'orgLoc',
        'cleanupTime', 'cleanupDate', 'beachName', 'cmpsDir', 'riverName',
        'riverDistance', 'slope', 'tideHeightA', 'tideHeightB', 'tideTimeA',
        'tideTimeB', 'tideTypeA', 'tideTypeB', 'windDir', 'windSpeed',
        'latitude', 'longitude'
    ];

    for(const id in requiredIDs) {
      if(survey.surveyData[requiredIDs[id]] === undefined) {
        invalid.push(requiredIDs[id]);
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

    return invalid
  }

  async onPressSubmit(){
    const {selectedIndex} = this.state;
    const currentSurvey = this.state.surveys[selectedIndex]
    let invalidArray = await this.isSurveyValid();
    if(!invalidArray)
      return
    if(invalidArray.length > 0){
      /* If we have some invalid fields, navigate to SurveyContainer and indicate which fields are invalid */
      this.setState({isSubmitModalVisible: false});

      this.props.navigation.navigate('SurveyContainer', {
        surveyName: currentSurvey.surveyName,
        surveyData: currentSurvey.surveyData,
        SRSData: currentSurvey.SRSData,
        ASData: currentSurvey.ASData,
        MicroData: currentSurvey.MicroData,
        inProgress: currentSurvey._id,
        invalidArray: invalidArray,
        fromPublish: true
      })
    } else {
      /* Call the function to check if the beach name matches a name in the database */
      console.log("Survey is valid");
      this.setState({isSubmitModalVisible: false, isLoadingModalVisible: true})
      this.checkIfBeachExists(currentSurvey);
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

  openPublishModal(index){
    const {surveyName} = this.state.surveys[index]
    this.setState({
      isSubmitModalVisible: true,
      selectedName: surveyName,
      selectedIndex: index
    })
  }

  async convertSurvey(index) {
    console.log(`------------------ CONVERTING SURVEY OF INDEX ${index} --------------------`)
    let currentSurvey = this.state.surveys[index];
    let surveyData = currentSurvey.surveyData;
    let userID = await AsyncStorage.getItem('accessToken');
    let userEmail = await AsyncStorage.getItem('email');
    const form = {
      survData: {
        user: {
          f: surveyData.userFirst ? surveyData.userFirst : "",
          l: surveyData.userLast ? surveyData.userLast : "",
        },
        email: userEmail,
        userID: userID,
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
      bID: this.state.match ? this.state.match : undefined,
      beachData: this.state.match ? undefined : {
        n: surveyData.beachName,
        nroName: surveyData.riverName,
        lat: /* Something given */ 123,
        lon: 123,
        nroDist: surveyData.riverDistance
      }
    }
    return form;
    // Then we should validate the form
  }

  finalBeachSubmit() {
    const formToSubmit = this.convertSurvey(this.state.selectedIndex);
    if(this.state.match){
      //If there is a beach ID, then we can just sumbit the survey under that beach
      axios.post('https://marineplastics.herokuapp.com/surveys', formToSubmit)
        .then(res => {
          if(res.data.survID){
            this.setState({
              isConfirmModalVisible: false
            })
            console.log("Survey Submitted!!!")
          }
        })
    }

  }

  renderBeachItem({item}) {
    return (
      <Button transparent key={item.n} onPress={()=>{this.onPressBeach(item.n, item._id)}}>
        <Text>{item.n}</Text>
      </Button>
    )
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
                openPublishModal={this.openPublishModal}
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
              <View style={{alignSelf: 'center', width: '90%', height: 150, backgroundColor: 'white'}} >
                <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Submit {this.state.selectedName}?</Text>
                <View style={{flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'flex-end'}}>
                  <Button light style={{alignSelf: 'center'}} onPress={() => this.setState({isSubmitModalVisible: false})}>
                    <Text>Cancel</Text>
                  </Button>
                  <Button success style={{alignSelf: 'center'}} onPress={this.onPressSubmit}>
                    <Text>Submit</Text>
                  </Button>
                </View>
              </View>
            </Modal> 
            <Modal isVisible={this.state.isLoginModalVisible}>
              <View style={{alignSelf: 'center', width: '90%', height: 150, backgroundColor: 'white'}} >
                <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Attention!</Text>
                <Text style={{alignSelf: 'center', padding: 8, fontSize: 15,}}>You must be logged in to submit a survey!</Text>
                <View style={{flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'flex-end'}}>
                  <Button light style={{alignSelf: 'center'}} onPress={() => this.setState({isLoginModalVisible: false})}>
                    <Text>OK</Text>
                  </Button>
                </View>
              </View>
            </Modal> 
            <Modal isVisible={this.state.isBeachModalVisible}>
              <View style={{alignSelf: 'center', width: '90%', height: '85%', backgroundColor: 'white'}}>
                <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: 'bold'}}>Whoops!</Text>
                <Text style={{padding: 8, fontSize: 15}}>
                  It looks like the beach "{this.state.beachName}" is not in our database! We may actually have it stored, just under a different name. 
                  Here's a list of the closest beaches based on your survey's coordinates.
                </Text>
                <Text style={{padding:8, fontSize: 15, fontWeight: 'bold'}}>
                  If you see your beach here, select it by tapping on the name. 
                  Otherwise, tap 'No match' so that we can add it to the database for you!
                </Text>
                <FlatList 
                  style={{backgroundColor: 'ghostwhite', padding: 8}} 
                  data={this.state.beachList} extraData={this.state} 
                  renderItem={this.renderBeachItem} 
                />
                <View style={{flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'flex-end', marginBottom: 5}}>
                  <Button light style={{alignSelf: 'center'}} onPress={() => this.setState({isBeachModalVisible: false})}>
                    <Text>Cancel</Text>
                  </Button>
                  <Button success style={{alignSelf: 'center'}} onPress={()=>this.onPressBeach(this.state.beachName)}>
                    <Text>No match</Text>
                  </Button>
                </View>
              </View>
            </Modal>
            <Modal isVisible={this.state.isLoadingModalVisible}>
              <View style={{alignSelf: 'center', width: '90%', height: '20%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around', flexDirection:'row'}}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{fontSize: 17}}>Loading ...</Text>
              </View>
            </Modal>
            <Modal isVisible={this.state.isConfirmModalVisible}>
              <View style={{alignSelf: 'center', width: '90%', height: 150, backgroundColor: 'white'}} >
                <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>
                  {
                    this.state.match ? 
                      `Submit under beach \"${this.state.confirmBeach}\"?` :
                      `Create a new beach \"${this.state.confirmBeach}\"?`
                  }
                  </Text>
                <View style={{flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'flex-end'}}>
                  <Button light style={{alignSelf: 'center'}} onPress={() => this.setState({isConfirmModalVisible: false})}>
                    <Text>No</Text>
                  </Button>
                  <Button success style={{alignSelf: 'center'}} onPress={this.finalBeachSubmit}>
                    <Text>Yes</Text>
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
