import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import {Icon, Footer, Button} from 'native-base'
import Modal from 'react-native-modal'

import surveyDB from '../storage/mongoStorage'
import { ScrollView } from 'react-native-gesture-handler';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inProgress: [],
      isModalVisble: false,
      chosenSurvey: "",
      isDeleteVisible: false
    }

    this.renderInProgress = this.renderInProgress.bind(this);
    this.openSurvey=this.openSurvey.bind(this)
    this.onPressDeleteSurvey=this.onPressDeleteSurvey.bind(this);
    this.deleteSurvey=this.deleteSurvey.bind(this);
    this.endModals=this.endModals.bind(this)
  }

  static navigationOptions = {
    title: 'Home Page'
  }

  async retrieveInProgress() {
    surveyDB.find({}).projection({_id: 1, surveyName: 1, surveyData: 1}).exec((err, res) => {
      if(err){
        alert(err);
        return
      }
      console.log(res)
      this.setState({inProgress: res})
    })
  }

  componentWillMount(){
    this.retrieveInProgress();
  }

  cancelModal = () => {
    this.setState({isModalVisble: false, chosenSurvey: ""})
  }

  cancelDelete = () => {
    this.setState({isDeleteVisible: false})
  }

  async openSurvey(){
    this.cancelModal();
    let survey;
    let survName = this.state.chosenSurvey.surveyName
    await surveyDB.find({surveyName: survName}, (err, res) => {
      if(err){
        console.log(err);
        return
      }
      survey = res[0];
    });
    console.log(survey._id);
    this.props.navigation.navigate('SurveyContainer',
      {
        surveyData: survey.surveyData,
        surveyName: survName,
        SRSData: survey.SRSData,
        ASData: survey.ASData,
        MicroData: survey.MicroData,
        inProgress: survey._id,
      }
    );
  }

  endModals(){
    this.setState({isDeleteVisible: false, isModalVisble: false})
  }

  onPressDeleteSurvey(){
    this.setState({isDeleteVisible: true})
  }

  async deleteSurvey(){
    await surveyDB.remove({_id: this.state.chosenSurvey._id}, {}, (err, res) => {
      if(err){
        alert(err)
        return
      }
      console.log(`Removed ${res} successfully.`)
    })

    this.endModals();
    this.retrieveInProgress();
  }

  renderPublished(){
    return(
      <Text style={{textAlign: 'center', fontSize: 18, color: 'gray'}}>You haven't published any surveys!</Text>
    )
  }

  showSurveyModal(chosenSurvey){
    this.setState({isModalVisble: true, chosenSurvey: chosenSurvey})
  }



  renderInProgress(){
    const {inProgress} = this.state;
    let surveyArray = [];
    console.log(inProgress)
    for(var i = 0; i < inProgress.length; i++){
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
                  textAlign:'right',
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
                {inProgress[i].surveyData.cleanupDate ?
                  ((inProgress[i].surveyData.cleanupDate.getMonth() + 1) + "/"
                  + inProgress[i].surveyData.cleanupDate.getDate() + "/"
                  + (inProgress[i].surveyData.cleanupDate.getFullYear() % 100))
                  : null
                }
              </Text>
              <Icon type='Entypo' name='dots-three-horizontal'/>
            </View>

          </TouchableOpacity>
        </View>
      )
      surveyArray.push({key: inProgress[i].surveyName, val: survComponent})
    }
    return <FlatList data={surveyArray} extraData={this.state} renderItem={({item}) => {return item.val}} />
  }

  render() {
    return(
      <View style={styles.container}>

        <View style={{marginBottom: 50}}>
          <Text style={[styles.paragraph]}>
            In Progress
          </Text>
          <ScrollView style={{height: '45%'}}>
            {this.renderInProgress()}
          </ScrollView>
        </View>
        <View style={{ marginBottom: 50}}>
          <Text style={styles.paragraph}>
            Published
          </Text>
          {this.renderPublished()}
        </View>

        <Button full info style={{marginBottom: 18, borderRadius: 5}} onPress={() => this.props.navigation.navigate('SurveyEntry')}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Survey Page</Text>
        </Button>
        <Button full info style={{marginBottom: 18, borderRadius: 5}} onPress={() => this.props.navigation.navigate('PublishContainer')}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Publish A Survey</Text>
        </Button>
        <Button info full style={{marginBottom: 18, borderRadius: 5}} onPress={() => this.props.navigation.navigate('Profile')}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>View Profile</Text>
        </Button>

        <Modal isVisible={this.state.isModalVisble}>
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
        <Modal isVisible={this.state.isDeleteVisible}>
          <View style={{alignSelf: 'center', width: '90%', height: 250, backgroundColor: 'white'}} >
            <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Delete {this.state.chosenSurvey.surveyName}?</Text>
            <View style={ {flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button light style={{justifyContent: 'center',width: 100}}onPress={this.cancelDelete} >
                <Text>No</Text>
              </Button>
              <Button danger  style={{justifyContent: 'center', width: 100}}onPress={this.deleteSurvey} title='Edit'>
                <Text>Delete</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
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
