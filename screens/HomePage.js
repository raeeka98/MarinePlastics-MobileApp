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
      console.log("Reload")
      await this.retrieveInProgress();
      const inProgress = this.renderInProgress();
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
    await this.retrieveInProgress();
    const inProgress = this.renderInProgress();
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
      surveyArray.push({key: inProgress[i].surveyName, val: survComponent})
    }
    return <FlatList data={surveyArray} extraData={this.state} renderItem={({item}) => {return item.val}} />
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
