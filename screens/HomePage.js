import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon, Footer, Button } from 'native-base'
import Modal from 'react-native-modal'
import debrisInfoID from './survey/debrisInfo'

import surveyDB from '../storage/mongoStorage'
import { ScrollView } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inProgress: [],
      isModalVisble: false,
      chosenSurvey: "",
      isDeleteVisible: false,
      isQRVisible: false,
      qrString: "empty"
    }

    this.renderInProgress = this.renderInProgress.bind(this);
    this.openSurvey = this.openSurvey.bind(this);
    this.onPressDeleteSurvey = this.onPressDeleteSurvey.bind(this);
    this.onGenQR = this.onGenQR.bind(this);
    this.clearQR = this.clearQR.bind(this);
    this.deleteSurvey = this.deleteSurvey.bind(this);
    this.endModals = this.endModals.bind(this);
  }

  static navigationOptions = {
    title: 'Home Page'
  }

  async retrieveInProgress() {
    let res = await surveyDB.getNameDate()
    console.log(res)
    this.setState({ inProgress: res })
  }

  componentWillMount() {
    this.retrieveInProgress();
  }

  cancelModal = () => {
    this.setState({ isModalVisble: false, chosenSurvey: "" })
  }

  cancelDelete = () => {
    this.setState({ isDeleteVisible: false })
  }

  async openSurvey() {
    this.cancelModal();
    let survey;
    let survID = this.state.chosenSurvey._id
    survey = await surveyDB.getSurvey(survID);
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

  endModals() {
    this.setState({ isDeleteVisible: false, isModalVisble: false })
  }

  onPressDeleteSurvey() {
    this.setState({ isDeleteVisible: true })
  }

  async onGenQR() {
    var qrString = await this.encodeToText();
    this.setState({ qrString: qrString, isQRVisible: true });
    console.log(state);
  }

  clearQR() {
    this.setState({ qrString: "empty", isQRVisible: false });
  }

  async deleteSurvey() {
    await surveyDB.deleteSurvey(this.state.chosenSurvey._id);

    this.endModals();
    this.retrieveInProgress();
  }

  renderPublished() {
    return (
      <Text style={{ textAlign: 'center', fontSize: 18, color: 'gray' }}>You haven't published any surveys!</Text>
    )
  }

  showSurveyModal(chosenSurvey) {
    this.setState({ isModalVisble: true, chosenSurvey: chosenSurvey })
  }



  renderInProgress() {
    const { inProgress } = this.state;
    let surveyArray = [];
    console.log(inProgress);
    for (var i = 0; i < inProgress.length; i++) {
      let survComponent = (
        <View style={{ flex: 1, padding: 10, height: '15%' }}>
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
                  width: "50%",
                  textAlign: 'right',
                  paddingRight: '5%',
                  fontSize: 16,
                  fontWeight: 'bold'
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
                style={{
                  fontSize: 17,
                  fontStyle: 'italic'
                }}
              >
                {inProgress[i].surveyData.cleanupDate ?
                  ((inProgress[i].surveyData.cleanupDate.getMonth() + 1) + "/"
                    + inProgress[i].surveyData.cleanupDate.getDate() + "/"
                    + (inProgress[i].surveyData.cleanupDate.getFullYear() % 100))
                  : null
                }
              </Text>
              <Icon type='Entypo' name='dots-three-horizontal' />
            </View>

          </TouchableOpacity>
        </View>
      )
      surveyArray.push({ key: inProgress[i].surveyName, val: survComponent })
    }
    return <FlatList data={surveyArray} extraData={this.state} renderItem={({ item }) => { return item.val }} />
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ marginBottom: 50 }}>
          <Text style={[styles.paragraph]}>
            In Progress
          </Text>
          <ScrollView style={{ height: '45%' }}>
            {this.renderInProgress()}
          </ScrollView>
        </View>
        <View style={{ marginBottom: 50 }}>
          <Text style={styles.paragraph}>
            Published
          </Text>
          {this.renderPublished()}
        </View>

        <Button full info style={{ marginBottom: 18, borderRadius: 5 }} onPress={() => this.props.navigation.navigate('SurveyEntry')}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Survey Page</Text>
        </Button>
        <Button full info style={{ marginBottom: 18, borderRadius: 5 }} onPress={() => this.props.navigation.navigate('PublishContainer')}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Publish A Survey</Text>
        </Button>
        <Button info full style={{ marginBottom: 18, borderRadius: 5 }} onPress={() => this.props.navigation.navigate('Profile')}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>View Profile</Text>
        </Button>

        <Modal isVisible={this.state.isModalVisble}>
          <View style={{ alignSelf: 'center', width: '90%', height: 250, backgroundColor: 'white' }} >
            <Text style={{ alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500' }}>{this.state.chosenSurvey.surveyName}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Button light style={{ justifyContent: 'center', width: 100 }} onPress={this.cancelModal} >
                <Text>Back</Text>
              </Button>
              <Button light style={{ justifyContent: 'center', width: 100 }} onPress={this.openSurvey} title='Edit'>
                <Text>Edit</Text>
              </Button>
              <Button danger style={{ justifyContent: 'center', width: 100 }} onPress={this.onPressDeleteSurvey} title='Edit'>
                <Text>Delete</Text>
              </Button>
              <Button light style={{ justifyContent: 'center', width: 100 }} onPress={this.onGenQR} title='Edit'>
                <Text>Generate QR Code</Text>
              </Button>
            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.isDeleteVisible}>
          <View style={{ alignSelf: 'center', width: '90%', height: 250, backgroundColor: 'white' }} >
            <Text style={{ alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500' }}>Delete {this.state.chosenSurvey.surveyName}?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Button light style={{ justifyContent: 'center', width: 100 }} onPress={this.cancelDelete} >
                <Text>No</Text>
              </Button>
              <Button danger style={{ justifyContent: 'center', width: 100 }} onPress={this.deleteSurvey} title='Edit'>
                <Text>Delete</Text>
              </Button>
            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.isQRVisible}>
          <View style={{ alignSelf: 'center', width: '100%', height: '90%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
            <QRCode
              value={this.state.qrString}
              size={300}
              bgColor='black'
              fgColor='white' />
            <Button light style={{ justifyContent: 'center', width: 100 }} onPress={this.clearQR} title='ClearQR'>
              <Text>Done</Text>
            </Button>
          </View>
        </Modal>
      </View>
    );
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