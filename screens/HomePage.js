import React, { Component } from 'react';

import {
  Platform,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  SafeAreaView,
  RefreshControl
} from 'react-native';

import {
  Icon,
  View,
  Footer,
  Button,
  Toast,
  Text,
  Container,
  Header,
  Content,
  Spinner
} from 'native-base';

import Modal from 'react-native-modal'
import {Font, Constants} from 'expo'

import surveyDB from '../storage/mongoStorage'
import QRCode from 'react-native-qrcode';

import PageHeader from '../components/PageHeader'

import {
  ScrollView
} from 'react-native-gesture-handler';

import {
  SurveyCard
} from './Home/SurveyCard';

import {
  DeleteModal,
  GeneralModal
} from './Home/HomeModals';

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pageLoading: true,
      isLoadingSurveys: false,
      inProgress: [],
      isModalVisible: false,
      chosenSurvey: "",
      isDeleteVisible: false,
      shouldShowDelete: false,
      isRefreshing: false,
      reload: false,
      shouldShowDelete: false
      qrString: "empty"
      isQRVisible: false,
    }

    this.navToPublish = this.navToPublish.bind(this);
    this.openSurvey=this.openSurvey.bind(this)
    this.deleteSurvey=this.deleteSurvey.bind(this);
    this.refreshPage=this.refreshPage.bind(this)
  }

  static navigationOptions = {
    title: 'Home',
    drawerIcon: ({focused}) => (
      <Icon type='Entypo' name='home' style={{fontSize: 20, color: focused ? 'blue' : 'black'}} />
    )
  }

  async componentWillReceiveProps(props){
    let reload = props.navigation.getParam('reload');
    if(reload){
      this.retrieveInProgress();
      let inProgress = await this.renderInProgress();
      this.setState({
        inProgressViews: inProgress
      })
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    await this.retrieveInProgress();
    const inProgress = this.renderInProgress();
    this.setState({
      pageLoading: false,
      inProgressViews: inProgress
    });
  }

  async retrieveInProgress() {
    let surveys =  await surveyDB.getNameDate();
    this.setState({
      inProgress: surveys
    })
  }

  async refreshPage() {
    await this.retrieveInProgress();
    const inProgress = this.renderInProgress();
    this.setState({
        isRefreshing : false,
        inProgressViews: inProgress
    })
  }

  cancelDelete = () => this.setState({isDeleteVisible: false});
  cancelModal = () => this.setState({isModalVisible: false, chosenSurvey: ""});
  onPressDeleteSurvey = () => {
    this.setState({
      shouldShowDelete: true,
      isModalVisible: false
    });
  }

  async openSurvey(){
    this.cancelModal();
    let survey;
    let survID = this.state.chosenSurvey._id
    survey = await surveyDB.getSurvey(survID);
    this.props.navigation.navigate('SurveyContainer',
      {
        surveyData: survey.surveyData,
        ribData: survey.ribData,
        surveyName: survey.surveyName,
        SRSData: survey.SRSData,
        ASData: survey.ASData,
        MicroData: survey.MicroData,
        inProgress: survey._id,
      })
  }

  async navToPublish() {
    this.cancelModal();
    let survName = this.state.chosenSurvey.surveyName;
    let survey;
    let survID = this.state.chosenSurvey._id
    survey = await surveyDB.getSurvey(survID);
    this.props.navigation.navigate('PublishContainer',
      {
        initSurvey : {
            surveyData: survey.surveyData,
            ribData: survey.ribData,
            surveyName: survName,
            SRSData: survey.SRSData,
            ASData: survey.ASData,
            MicroData: survey.MicroData,
            inProgress: survey._id,
        }
      }
    );
  }

  endModals = () => {
    this.setState({isDeleteVisible: false, isModalVisible: false})
  }

  async deleteSurvey(){
    await surveyDB.deleteSurvey(this.state.chosenSurvey._id);
    this.endModals();
    this.retrieveInProgress();
    let inProgress = this.renderInProgress();
    this.setState({
      inProgressViews: inProgress
    })
  }

  renderPublished(){
    const {inProgress} = this.state;
    let surveyArray = [];
    if(surveyArray.length === 0) {
      return(
        <Text style={{textAlign: 'center', fontSize: 18, color: 'gray'}}>You haven't published any surveys!</Text>
      )
    }
    return <FlatList data={surveyArray} extraData={this.state} renderItem={({item}) => {return item.val}} />
  }

  showSurveyModal = (chosenSurvey) => {
    this.setState({isModalVisible: true, chosenSurvey: chosenSurvey})
  }

  openDelete = () => {
    if(this.state.shouldShowDelete) {
        this.setState({
          isDeleteVisible: true,
          shouldShowDelete: false
        })
    }
  }

  renderInProgress = () => {
    const {inProgress} = this.state;
    let surveyArray = [];
    for(var i = 0; i < inProgress.length; i++){
      if(inProgress[i].published)
        continue;
      let survComponent = (
        <SurveyCard
          showSurveyModal={this.showSurveyModal}
          survey={inProgress[i]}
          />
      )
      surveyArray.push({ key: inProgress[i].surveyName, val: survComponent })
    }
    return <FlatList data={surveyArray} extraData={this.state} renderItem={({ item }) => { return item.val }} />
  }

  render() {

    if(this.state.pageLoading) {
      return(
        <Container>
          <Spinner color='blue' />
        </Container>
      );
    }else {
      return(
        <Container style={{flex: 1}}>
        <PageHeader title='Home' openDrawer={this.props.navigation.openDrawer}/>
          <Content
            contentContainerStyle={{height: "100%"}}
            refreshControl={
              <RefreshControl
                style={{backgroundColor: '#f2fdff'}}
                refreshing={this.state.isRefreshing}
                onRefresh={this.refreshSurveys}
                tintColor="#19d9ff"
                titleColor="#00ff00"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
                />
            }
            >
            <View style={{marginBottom: 50}}>
              <Text style={[styles.paragraph]}>
                In Progress
              </Text>
              <ScrollView
                style={{height: '50%'}}
                >
                {this.state.inProgressViews}
              </ScrollView>
            </View>
            <View style={{ marginBottom: 50}}>
              <Text style={styles.paragraph}>
                Published
              </Text>
              {this.renderPublished()}
            </View>
            <GeneralModal
              isModalVisible={this.state.isModalVisible}
              openDelete={this.openDelete}
              name={this.state.chosenSurvey.surveyName}
              cancelModal={this.cancelModal}
              openSurvey={this.openSurvey}
              onPressDeleteSurvey={this.onPressDeleteSurvey}
              navToPublish={this.navToPublish}
              />
            <DeleteModal
              isDeleteVisible={this.state.isDeleteVisible}
              name={this.state.chosenSurvey.surveyName}
              cancelDelete={this.cancelDelete}
              deleteSurvey={this.deleteSurvey}
              />
          </Content>
        </Container>
      );
    }

  }

  // Encode the text entry box data into a string of printable characters recognizable for a QR code
  // Takes the rib start, rib length, fresh and weathered values.
  // Converts these to 9-bit binary and adds them to a binary string (binstring)
  // The binToEncoded then translates this to a string using ascii values in the range 48-112
  encodeToText = async () => {
    var binstring = "";
    var survey = await surveyDB.getSurvey(this.state.chosenSurvey._id);

    for (var ribNum = 1; ribNum <= 4; ribNum++) {
      //RIB 1 (example rib) DO FOR EACH RIB
      var ribStart = survey.surveyData[`r${ribNum}Start`];
      var ribLength = survey.surveyData[`r${ribNum}Length`];

      //Encode ribStart
      binstring += this.intToBin(ribStart);
      //Encode ribLength
      binstring += this.intToBin(ribLength);

      //Encode fresh and weathered for each category
      for (var key in debrisInfoID) {
        var fresh = survey.SRSData[`${debrisInfoID[key]}__fresh__${ribNum}`];
        var weathered = survey.SRSData[`${debrisInfoID[key]}__weathered__${ribNum}`];
        //encode fresh and weathered debris to binary and add to the binary string
        binstring += this.intToBin(fresh);
        binstring += this.intToBin(weathered);
      }
    }

    //ACCUMULATION SWEEP
    for (var key in debrisInfoID) {
      var fresh = survey.ASData[`${debrisInfoID[key]}__fresh__accumulation`];
      var weathered = survey.ASData[`${debrisInfoID[key]}__weathered__accumulation`];
      //encode fresh and weathered debris to binary and add to the binary string
      binstring += this.intToBin(fresh);
      binstring += this.intToBin(weathered);
    }

    //MICRODEBRIS
    for (var ribNum = 1; ribNum <= 4; ribNum++) {
      var fresh = survey.MicroData[`rib${ribNum}__fresh__micro`];
      var weathered = survey.MicroData[`rib${ribNum}__weathered__micro`];
      binstring += this.intToBin(fresh);
      binstring += this.intToBin(weathered);
    }

    var encoded = this.binToEncoded(binstring);
    var decoded = this.decodeText(encoded);
    console.log(decoded);
    return encoded;
  }

  // Binary to Encoded (using an encoding style similar to base64)
  // This method takes a binary string and encodes it into printable ascii chars
  // It does this by popping the six front-most bits and mapping the decimal value of this into the range
  // of 48-112, which are all printable ascii value. If the binstring is not divisible by 6
  // the remainder will be encoded after a ! in plain binary (min of 1 max of 5 extra chars)
  binToEncoded(binstring) {
    var encoded = "";
    while (binstring.length >= 6) {
      var substr = binstring.substr(0, 6);
      binstring = binstring.substr(6);
      var dec = parseInt(substr, 2);
      var charrep = String.fromCharCode(48 + dec);
      encoded += charrep;
    }
    if (binstring.length != 0) {
      encoded += '!';
      encoded += binstring;
    }
    return encoded;
  }

  decodeText(encoded) {
    var binstring = this.encodedToBin(encoded);
    var decoded = [];
    while (binstring.length >= 9) {
      var substr = binstring.substr(0, 9);
      binstring = binstring.substr(9);
      var dec = parseInt(substr, 2);
      decoded.push(dec);
    }
    var survey = {
      surveyData : {},
      SRSData : {},
      ASData : {},
      MicroData : {}
    };
    var i=0;
    for (var ribNum = 1; ribNum <= 4; ribNum++) {
      //RIB 1 (example rib) DO FOR EACH RIB
      survey.surveyData[`r${ribNum}Start`] = decoded[i++];
      survey.surveyData[`r${ribNum}Length`] = decoded[i++];

      //Encode fresh and weathered for each category
      for (var key in debrisInfoID) {
        survey.SRSData[`${debrisInfoID[key]}__fresh__${ribNum}`] = decoded[i++];
        survey.SRSData[`${debrisInfoID[key]}__weathered__${ribNum}`] = decoded[i++];
      }
    }

    //ACCUMULATION SWEEP
    for (var key in debrisInfoID) {
      survey.ASData[`${debrisInfoID[key]}__fresh__accumulation`] = decoded[i++];
      survey.ASData[`${debrisInfoID[key]}__weathered__accumulation`] = decoded[i++];
    }

    //MICRODEBRIS
    for (var ribNum = 1; ribNum <= 4; ribNum++) {
      survey.MicroData[`rib${ribNum}__fresh__micro`] = decoded[i++];
      survey.MicroData[`rib${ribNum}__weathered__micro`] = decoded[i++];
    }

    console.log(survey);
    return survey;
  }

  encodedToBin(encoded) {
    var binstring = "";
    for (var i = 0; i < encoded.length; i++) {
      if (encoded.charAt(i) !== "!") {
        var dec = encoded.charCodeAt(i) - 48;
        binstring += ("000000" + (Number(dec).toString(2))).slice(-6);
      }
      else {
        binstring += encoded.substr(i + 1);
        i = encoded.length;
      }
    }
    return binstring;
  }

  intToBin(dec) {
    if (dec === undefined) dec = 0;
    bin = ("000000000" + (Number(dec).toString(2))).slice(-9);
    return bin;
  }

}

export default HomePage;


// Style variable.
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  paragraph: {
    marginHorizontal: 24,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  }
});