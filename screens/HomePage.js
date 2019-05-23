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
import { ScrollView } from 'react-native-gesture-handler';
import PageHeader from '../components/PageHeader'

import { SurveyCard } from './Home/SurveyCard';
import { DeleteModal } from './Home/HomeModals';

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoadingSurveys: false,
      inProgress: [],
      isModalVisible: false,
      chosenSurvey: "",
      isDeleteVisible: false,
      loading: true,
      reload: false,
      shouldShowDelete: false
    }

    this.navToPublish = this.navToPublish.bind(this);
    this.openSurvey=this.openSurvey.bind(this)
    this.deleteSurvey=this.deleteSurvey.bind(this);
  }

  static navigationOptions = {
    title: 'Home',
    drawerIcon: ({focused}) => (
      <Icon type='Entypo' name='home' style={{fontSize: 20, color: focused ? 'blue' : 'black'}} />
    )
  }

  componentWillReceiveProps(props){
    let reload = props.navigation.getParam('reload');
    if(reload){
      this.retrieveInProgress();
    }
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

  async retrieveInProgress() {
    let surveys =  await surveyDB.getNameDate();
    console.log(`Retrieved: ${surveys}`)
    this.setState({
      inProgress: surveys
    })
  }

  componentWillMount(){
    this.retrieveInProgress();
  }


  refreshSurveys = () => {
    console.log("refreshing!");
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
    console.log(survey._id);
    this.props.navigation.navigate('PublishContainer',
      {initSurvey : {
        surveyData: survey.surveyData,
        ribData: survey.ribData,
        surveyName: survName,
        SRSData: survey.SRSData,
        ASData: survey.ASData,
        MicroData: survey.MicroData,
        _id: survey._id,
      }}
    );
  }

  endModals = () => {
    this.setState({isDeleteVisible: false, isModalVisible: false})
  }

  async deleteSurvey(){
    await surveyDB.deleteSurvey(this.state.chosenSurvey._id);
    this.endModals();
    this.retrieveInProgress();
  }

  renderPublished(){
    const {inProgress} = this.state;
    let surveyArray = [];
    /*for(var i = 0; i < inProgress.length; i++){
      if(!inProgress[i].published){
        continue;
      }
      let survComponent = (
        <View style={{flex: 1, padding: 10, height: '15%'}}>

          <TouchableOpacity
            onPress={this.showSurveyModal.bind(this, inProgress[i])}
            style={
              {
                height: 35,
                borderRadius: 5,
                padding: 10,
                backgroundColor: 'lightblue',
                borderColor: 'black',
                borderWidth: 1
              }
            }
          >
            <Text
              style={
                {
                  position: 'absolute',
                  marginTop: '1%',
                  width:"50%",
                  textAlign:'center',
                  paddingRight: '5%',
                  fontSize: 16,
                  fontWeight:'bold'
                }
              }
            >
              {inProgress[i].surveyName.length <= 15 ? inProgress[i].surveyName : inProgress[i].surveyName.substr(0, 13) + "..."}
            </Text>
            <Icon
              style={
                {
                  position: 'absolute',
                  marginTop: '1%',
                  marginHorizontal: '46%',
                  alignSelf: 'center'
                }
              }
              type="AntDesign"
              name="pause"
            />
            <View style={
                  {
                    position: 'absolute',
                    marginTop: '1%',
                    paddingLeft: '66%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }
                }>
              <Text
                style={{fontSize: 17,
                  fontStyle: 'italic'}}
              >
                {
                  inProgress[i].surveyData.cleanupDate ?
                    (inProgress[i].surveyData.cleanupDate.getMonth() + 1) + "/"
                    + inProgress[i].surveyData.cleanupDate.getDate() + "/"
                    + (inProgress[i].surveyData.cleanupDate.getFullYear() % 100) :
                    "No Date"
                }
              </Text>
              <Icon type='Entypo' name='dots-three-horizontal'/>
            </View>

          </TouchableOpacity>
        </View>
      )
      surveyArray.push({key: inProgress[i].surveyName, val: survComponent})
    }*/
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
    if(this.state.loading) {
      return <Spinner style={{alignSelf: 'center'}}color='green'/>;
    }
    return(
      <Container style={{flex: 1}}>
      <PageHeader title='Home' openDrawer={this.props.navigation.openDrawer}/>
        <Content contentContainerStyle={{height: "100%"}}>
          <View style={{marginBottom: 50}}>
            <Text style={[styles.paragraph]}>
              In Progress
            </Text>
            <ScrollView
              style={{height: '45%'}}
              >
              {this.renderInProgress()}
            </ScrollView>
          </View>
          <View style={{ marginBottom: 50}}>
            <Text style={styles.paragraph}>
              Published
            </Text>
            {this.renderPublished()}
          </View>

          <Modal
            isVisible={this.state.isModalVisible}
            onModalHide={this.openDelete}>
            <View style={{alignSelf: 'center', width: '90%', height: 250, backgroundColor: 'white'}} >
              <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>{this.state.chosenSurvey.surveyName}</Text>
              <View style={ {flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Button light style={{justifyContent: 'center',width: 100}}onPress={this.cancelModal} >
                  <Text>Back</Text>
                </Button>
                <Button light  style={{justifyContent: 'center', width: 100}}onPress={this.openSurvey} title='Edit'>
                  <Text>Edit</Text>
                </Button>
                <Button danger  style={{justifyContent: 'center', width: 100}}onPress={this.onPressDeleteSurvey} title='Delete'>
                  <Text>Delete</Text>
                </Button>
              </View>
              <View style={ {flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Button primary style={{justifyContent: 'center',width: 100}} onPress={this.navToPublish}>
                  <Text>Publish</Text>
                </Button>
              </View>
            </View>
          </Modal>
          <DeleteModal
            isDeleteVisible={this.state.isDeleteVisible}
            name={this.state.chosenSurvey.surveyName}
            cancelDelete={this.cancelDelete}
            deleteSurvey={this.deleteSurvey}
            />
          {/* COMMENTED OUT UNTIL I FIGURE OUT WHY DELETE MODAL DOESNT DELETE SURVEYS
              <Modal isVisible={this.state.isDeleteVisible}>
              <View style={{alignSelf: 'center', width: '90%', height: 250, backgroundColor: 'white'}} >
                <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Delete {this.state.chosenSurvey.surveyName}?</Text>
                <View style={ {flexDirection: 'row', justifyContent: 'space-evenly'}}>
                  <Button light style={{justifyContent: 'center',width: 100}}onPress={this.closeDelete} >
                    <Text>No</Text>
                  </Button>
                  <Button danger  style={{justifyContent: 'center', width: 100}}onPress={this.deleteSurvey} title='Edit'>
                    <Text>Delete</Text>
                  </Button>
                </View>
              </View>
            </Modal>*/}
        </Content>
      </Container>
    );
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
