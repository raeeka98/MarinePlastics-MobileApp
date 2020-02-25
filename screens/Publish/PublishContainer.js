import React, { Component } from 'react';
import * as Font from 'expo-font'
import {View} from 'react-native';

import {

  AsyncStorage
} from 'react-native';

import {
  Spinner,
  Button,
  Text,
  Container,
} from 'native-base';
import Modal from 'react-native-modal'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler';

import Scanner from "./Scanner";
import Import from "./Import";
import surveyDB from '../../storage/mongoStorage'
import testSurveys from '../../testJSON/testSurveys';
import {NavigationActions} from 'react-navigation'

import {
  SubmitModal,
  LoginModal,
  LoadingModal,
  FinishedModal,
  ConfirmModal
} from './PublishModals';

import { mergeSurveys } from './MergeSurveys';
import toExport from './env.js'
import PageHeader from '../../components/PageHeader';

const goBack = NavigationActions.back({
  key: 'DrawerNavigator'
})

export default class PublishContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      isImporting : true,
      isScanning : false,
      isPublished : false,
      isLoggedIn: true,
      surveys : []
    };
    const initSurvey = this.props.navigation.getParam('initSurvey');
    if(initSurvey) {
        this.state.surveys.push(initSurvey);
        this.state.surveyID = initSurvey.inProgress;
    }
     // bind methods
     this.removeSurvey = this.removeSurvey.bind(this);
     this.convertSurvey = this.convertSurvey.bind(this);
     this.openPublishModal = this.openPublishModal.bind(this);
     this.onPressSubmit = this.onPressSubmit.bind(this);
     this.openBeachModal = this.openBeachModal.bind(this);
     this.renderBeachItem = this.renderBeachItem.bind(this);
     this.finalBeachSubmit = this.finalBeachSubmit.bind(this);
     console.log(toExport.SERVER_URL)
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({
      loading : false
    });

  }

  async componentWillReceiveProps(props) {
    if(props.navigation.getParam('isVerified')){
      /* If we're coming from the edit, we should call the function that checks
       * to see if the given survey's beach name exists in the survey
       */
      console.log("Verified")
      let verifyID = props.navigation.getParam('verifyID');
      const survey = await surveyDB.getSurvey(verifyID)
      console.log("SURVEY HERE")
      console.log(survey);
      this.setState({mergedSurvey: survey, surveyID: verifyID})
      this.checkIfBeachExists(survey);
    }
  }

  // Manage Modals ============================================================

  closeSubmitModal = () => this.setState({isSubmitModalVisible: false});
  closeLoginModal = () => this.setState({isLoginModalVisible: false});
  closeFinishedModal = () => this.setState({isFinishedVisible: false});
  closeConfirmModal = () => this.setState({isConfirmModalVisible: false});
  closeConfirmOpenBeachModal = () => this.setState({isBeachModalVisible: true, isConfirmModalVisible: false})

  openPublishModal(survey) {
    const {surveyName} = survey;
    this.setState({
      isSubmitModalVisible: true,
      selectedName: surveyName,
      mergedSurvey: survey
    })
  }

  onPressBeach(beachName, beachID) {
    this.setState({isConfirmModalVisible: true, isBeachModalVisible: false, match: beachID, confirmBeach: beachName});
  }

  onPressNoMatch(beachName) {
    this.setState({isConfirmModalVisible: true, isBeachModalVisible: false, match: null, confirmBeach: beachName})
  }



  // ADD/REMOVE SURVEY TO LIST OF IMPORTED SURVEYS TO BE MERGED ================

  addSurvey = (data) => {
      this.setState(prevState => {
          prevState.surveys.push(data);
          prevState.isScanning = false;
          prevState.isImporting = true;
          prevState.isPublished = false;
          return prevState;
      });
  }

  removeSurvey = (index) => {
      this.setState(prevState => {
          prevState.surveys.splice(index, 1);
          return prevState;
      });
  }

  // Merge Surveys ===========================================================

  calculateTotals(type) {
    let currentSurvey = this.state.mergedSurvey
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

  async checkIfBeachExists(survey){
    const beachName = survey.surveyData.beachName;
    //Use the beach name to query the server's database
    const exists = await axios.get(`${toExport.SERVER_URL}/beaches/search`, {params: {q: beachName}})
      .then(res => {
        console.log(res.data)
        if(res.data.length === 0){
          return false;
        } else {
          console.log(res.data)
          if(res.data[0].n === beachName){
            this.setState({match: res.data[0]._id})
            return true;
          }
          return false;
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
      this.setState({
        isConfirmModalVisible: true,
        isLoadingModalVisible: false,
        confirmBeach: beachName,
        foundBeach: true
      })
    } else {
      //If its false, then perform that algorithm to find the beaches within the 5-mile radius and let the user choose the beach
      console.log(`The beach ${beachName} does not exist`);
      this.openBeachModal(beachName);
    }
  }

  /**
   * Take the cleanupDate and cleanupTime and combine them into one date object
   */
  combineDateTime() {
    const currentSurveyData = this.state.mergedSurvey.surveyData;
    let returnDate = currentSurveyData.cleanupDate;
    let currentTime = currentSurveyData.cleanupTime;
    // Use the time stored in the survey to set the time with the date of the survey
    returnDate.setHours(currentTime.getHours())
    returnDate.setMinutes(currentTime.getMinutes());
    return returnDate
  }

  /**
   * This function takes the merged survey, stored in the state's merged survey key, and
   * converts it into the survey schema format that's used to store surveys in the database
   * It will also attach a beach ID if the survey is being submitted under a current beach,
   * or it will submit a beach schema with it containing information for the new beach if
   * it does not exist in the database
   */
  async convertSurvey(index) {
    let currentSurvey = this.state.mergedSurvey;
    let surveyData = currentSurvey.surveyData;
    let userID = await AsyncStorage.getItem('accessToken');
    userID = userID.split("|")[1];
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
        survDate: this.combineDateTime(),
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
          time: surveyData.tideTimeB ? this.convertTimeString(surveyData.tideTimeB) : "",
          height: surveyData.tideHeightB ? surveyData.tideHeightB: ""
        },
        nextTide: {
          type: surveyData.tideTypeA ? surveyData.tideTypeA : "",
          time: surveyData.tideTimeA ? this.convertTimeString(surveyData.tideTimeA) : "",
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
        SRSDebris: this.calculateTotals('SRS'),
        ASDebris: this.calculateTotals('AS'),
        numOfP: 0
      },
      bID: this.state.match ? this.state.match : undefined,
      beachData: this.state.match ? undefined : {
        n: surveyData.beachName.replace(/\s/g, "_"),
        nroName: surveyData.riverName.replace(/\s/g, "_"),
        lat: surveyData.latitude,
        lon: surveyData.longitude,
        nroDist: surveyData.riverDistance
      }
    }
    return form;
  }

  /**
   * Converts time to a string that will be stored in the database
   */
  convertTimeString(time){
    let timeString = "";
    timeString = time.toString().split(/ /)[4].substring(0, 5);
    return timeString;
  }

  /**
   * The final submission function that will
   */
  async finalBeachSubmit() {
    const formToSubmit = await this.convertSurvey();
    console.log(formToSubmit);
      //If there is a beach ID, then we can just sumbit the survey under that beach

    axios.post(`${toExport.SERVER_URL}/beaches/surveys`, formToSubmit)
      .then(res => {
        if(res.data.survID){
          this.setState({isFinishedVisible: true, isConfirmModalVisible: false, isBeachModalVisible: false})
          //Finally set the 'published' variable for the survey
          surveyDB.updateSurvey(this.state.surveyID, {$set: {published: true}});
        }
      })
      .catch(err => {
        this.setState({isConfirmModalVisible: false})
        console.log("Error submitting form:")
        let error = err.response.data.error
        console.log(error);
        alert("Uh Oh! An error has occurred: \n" + error)
      })
  }

  async isSurveyValid() {
    //We should also check to see if the user is logged in
    if(await AsyncStorage.getItem('accessToken') === null){
      // Use another modal to alert the user that they must log in
      this.setState({isSubmitModalVisible: false, isLoginModalVisible: true, isLoggedIn: false});
      return
     }
     let survey = this.state.mergedSurvey
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


  async openBeachModal(beachName) {
    // Here's where we'll do a special query for the beaches that reside in a certain location
    await axios.get(`${toExport.SERVER_URL}/beaches/search/closest`,
      {
        params: {
          coords: {
            lat: this.state.mergedSurvey.surveyData.latitude,
            lon: this.state.mergedSurvey.surveyData.longitude
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



  async onPressSubmit(){
    const currentSurvey = this.state.mergedSurvey;
    let invalidArray = await this.isSurveyValid();
    if(!this.state.isLoggedIn){
      return;
    }
    if(invalidArray.length > 0){
      /* If we have some invalid fields, navigate to SurveyContainer and indicate which fields are invalid */
      console.log("Not valid")
      this.setState({isSubmitModalVisible: false});
      this.props.navigation.navigate('SurveyContainer', {
        surveyName: this.state.surveys[0].surveyName,
        ribData: currentSurvey.ribData,
        surveyData: currentSurvey.surveyData,
        SRSData: currentSurvey.SRSData,
        ASData: currentSurvey.ASData,
        MicroData: currentSurvey.MicroData,
        inProgress: this.state.surveyID,
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

  // MERGE AND PUBLISH SURVEY ==================================================

  publishSurvey = () => {
      const { surveys } = this.state;
      const mergedSurvey = mergeSurveys(surveys);
      this.openPublishModal(mergedSurvey);
  }

  renderBeachItem({item}) {
    return (
      <Button transparent key={item.n} onPress={()=>{this.onPressBeach(item.n, item._id)}}>
        <Text>{item.n}</Text>
      </Button>
    )
  }

  toScanner = () => {
    this.setState({
      isScanning : true,
      isImporting : false,
      isPublished : false
    });
  }

  render() {
    if(this.state.loading) {
      return <Spinner color='blue'/>;
    }
    else {
      return(
        <Container>
          <PageHeader title='Publish Survey' arrow openDrawer={() => this.props.navigation.pop()} />
            {this.state.isScanning &&
                <Scanner
                  surveys={this.state.surveys}
                  addSurvey={this.addSurvey}/>
            }
            {this.state.isImporting &&
                <Import
                  surveys={this.state.surveys}
                  publishSurvey={this.publishSurvey}
                  removeSurvey={this.removeSurvey}
                  toScanner={this.toScanner}/>
            }
            {this.state.isPublished &&
                <Published/>
            }
            <SubmitModal
              isSubmitModalVisible={this.state.isSubmitModalVisible}
              selectedName={this.state.selectedName}
              onPressSubmit={this.onPressSubmit}
              closeSubmitModal={this.closeSubmitModal}
              />
            <LoginModal
              isLoginModalVisible={this.state.isLoginModalVisible}
              closeLoginModal={this.closeLoginModal}
              />
            <LoadingModal
              isLoadingModalVisible={this.state.isLoadingModalVisible}
              />
            <ConfirmModal
              isConfirmModalVisible={this.state.isConfirmModalVisible}
              match={this.state.match}
              confirmBeach={this.state.confirmBeach}
              closeConfirmModal={this.closeConfirmModal}
              closeConfirmOpenBeachModal={this.closeConfirmOpenBeachModal}
              finalBeachSubmit={this.finalBeachSubmit}
              foundBeach={this.state.foundBeach}
              />
            <FinishedModal
              isFinishedVisible={this.state.isFinishedVisible}
              closeFinishedModal={this.closeFinishedModal}
              />
            <Modal isVisible={this.state.isBeachModalVisible}>
              <View style={{alignSelf: 'center', width: '90%', height: '85%', backgroundColor: 'white'}}>
                <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: 'bold'}}>Beach Not Found!</Text>
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
        </Container>
      );
    }
  }
}
