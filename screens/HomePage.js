import React, { Component } from 'react'

import {
  FlatList,
  RefreshControl
} from 'react-native'

import {
  Icon,
  View,
  Text,
  Title,
  Container,
  Content,
  Spinner,
  Button
} from 'native-base'

import QRCode from 'react-native-qrcode'
import Modal from 'react-native-modal'
import {
  Font
} from 'expo'

import surveyDB from '../storage/mongoStorage'
import debrisInfoID from './survey/debrisInfo'
import PageHeader from '../components/PageHeader'

import {
  ScrollView
} from 'react-native-gesture-handler'

import {
  SurveyCard
} from './Home/SurveyCard'

import {
  DeleteModal,
  GeneralModal
} from './Home/HomeModals'

import homeStyles from './Home/homeStyles'

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
      shouldShowDelete: false,
      qrCode:''
    }

    this.navToPublish = this.navToPublish.bind(this);
    this.openSurvey=this.openSurvey.bind(this)
    this.deleteSurvey=this.deleteSurvey.bind(this);
    this.refreshPage=this.refreshPage.bind(this)
  }

  static navigationOptions = {
    title: 'Home',
    drawerIcon: ({focused}) => (
      <Icon type='Entypo' name='home' style={{fontSize: 20, color: focused ? 'dodgerblue' : 'black'}} />
    )
  }

  async componentWillReceiveProps(props){
    let reload = props.navigation.getParam('reload');
    if(reload){
      console.log("Reload")
      await this.retrieveInProgress();
      const inProgress = this.renderInProgress();
      const published = this.renderPublished();
      this.setState({
        inProgressViews: inProgress,
        publishedViews: published
      })
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons' : require('native-base/Fonts/Ionicons.ttf')
    })
    await this.retrieveInProgress();
    const inProgress = this.renderInProgress();
    const published = this.renderPublished();
    this.setState({
      pageLoading: false,
      inProgressViews: inProgress,
      publishedViews: published
    });
  }

  async retrieveInProgress() {
    console.log("Retrieve in Progress")
    let surveys =  await surveyDB.getNameDate();
    console.log(surveys)
    this.setState({
      inProgress: surveys
    })
  }

  async refreshPage() {
    await this.retrieveInProgress();
    const inProgress = this.renderInProgress();
    const published = this.renderPublished();
    this.setState({
        isRefreshing : false,
        inProgressViews: inProgress,
        publishedViews: published
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
    await this.retrieveInProgress();
    const inProgress = this.renderInProgress();
    const published = this.renderPublished();
    this.setState({
      inProgressViews: inProgress,
      publishedViews: published
    })
  }

  renderPublished = () => {
    const {inProgress} = this.state;
    let surveyArray = [];
    for(var i = 0; i < inProgress.length; i++){
      if(!inProgress[i].published)
        continue;
      let survComponent = (
        <SurveyCard
          showSurveyModal={this.showSurveyModal}
          survey={inProgress[i]} />
      )
      surveyArray.push({key: inProgress[i].surveyName, val: survComponent});
    }
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

  openSecondModal = () => {
    if(this.state.shouldShowDelete) {
        this.setState({
          isDeleteVisible: true,
          shouldShowDelete: false
        })
    }
    if(this.state.shouldShowQR) {
        this.setState({
          isQRVisible: true,
          shouldShowQR: false
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
      surveyArray.push({key: inProgress[i].surveyName, val: survComponent})
    }
    return <FlatList data={surveyArray} extraData={this.state} renderItem={({item}) => {return item.val}} />
  }

  showQRModal = async() => {

  }

  encodeToText = async () => {
    var binstring = "";
    var survey = await surveyDB.getSurvey(this.state.chosenSurvey._id);
    for (var ribNum = 1; ribNum <= 4; ribNum++) {
      //RIB 1 (example rib) DO FOR EACH RIB
      var ribStart = parseInt(survey.ribData[`r${ribNum}Start`], 10);
      if(isNaN(ribStart)){
        ribStart = 0;
      }
      var ribLength = parseInt(survey.ribData[`r${ribNum}Length`], 10);
      if(isNaN(ribLength)){
        ribLength = 0;
      }
      console.log(" ");
      console.log(`rib ${ribNum} start encoded: ${ribStart}`);
      console.log(`rib ${ribNum} start stored: ${survey.ribData[`r${ribNum}Start`]}`)
      console.log(`rib ${ribNum} length encoded: ${ribLength}`);
      console.log(`rib ${ribNum} length stored: ${survey.ribData[`r${ribNum}Length`]}`)
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
    this.setState({qrCode: encoded, isModalVisible: false, shouldShowQR: true})
  }

  // Binary to Encoded (using an encoding style similar to base64)
  // This method takes a binary string and encodes it into printable ascii chars
  // It does this by popping the six front-most bits and mapping the decimal value of this into the range
  // of 48-112, which are all printable ascii value. If the binstring is not divisible by 6
  // the remainder will be encoded after a ! in plain binary (min of 1 max of 5 extra chars)
  binToEncoded = (binstring) => {
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


  intToBin(dec) {
    if (dec === undefined) dec = 0;
    bin = ("000000000" + (Number(dec).toString(2))).slice(-9);
    return bin;
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
            style={{backgroundColor: '#e4eaff'}}
            refreshControl={
              <RefreshControl
                style={{backgroundColor: '#e4eaff'}}
                refreshing={this.state.isRefreshing}
                onRefresh={this.refreshSurveys}
                tintColor="#010101"
                titleColor="#010101"
                title="loading..."
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
                />
            }
            >
            <View style={{marginBottom: 50}}>
              <Title style={homeStyles.sectionHeader}>
                In Progress
              </Title>
              <ScrollView style={{height: '50%'}}>
                {this.state.inProgressViews}
              </ScrollView>
            </View>
            <View style={{ marginBottom: 50}}>
              <Title style={homeStyles.sectionHeader}>
                Published
              </Title>
              {this.state.publishedViews}
            </View>
            <GeneralModal
              isModalVisible={this.state.isModalVisible}
              openSecondModal={this.openSecondModal}
              name={this.state.chosenSurvey.surveyName}
              encodeToText={this.encodeToText}
              cancelModal={this.cancelModal}
              openSurvey={this.openSurvey}
              onPressDeleteSurvey={this.onPressDeleteSurvey}
              navToPublish={this.navToPublish}
              published={this.state.chosenSurvey.published}
              />
            <DeleteModal
              isDeleteVisible={this.state.isDeleteVisible}
              name={this.state.chosenSurvey.surveyName}
              cancelDelete={this.cancelDelete}
              deleteSurvey={this.deleteSurvey}
              />
            <Modal
              isVisible={this.state.isQRVisible}>
              <View style={homeStyles.QRView}>
                <QRCode
                  value={this.state.qrCode}
                  size={350}
                  style={{alignSelf: 'center'}}
                />
                <Button light style={{alignSelf: 'center', marginTop: 20}} onPress={() => this.setState({isQRVisible: false, isModalVisible: false})}>
                  <Text>Done</Text>
                </Button>
              </View>
            </Modal>
          </Content>
        </Container>
      );
    }

  }
}

export default HomePage;
