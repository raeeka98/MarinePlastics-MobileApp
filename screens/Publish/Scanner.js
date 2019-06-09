import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  View,
} from 'react-native';

import {
  Spinner
} from 'native-base';

import { BarCodeScanner, Permissions } from 'expo';
import debrisInfoID from '../survey/debrisInfo'

export default class Scanner extends Component {
  constructor(props) {
      super(props);
      this.pushed = false;
  }
  state = {
    hasCameraPermission: null,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  decodeText = (encoded) => {
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
      MicroData : {},
      ribData: {}
    };
    var i=0;
    for (var ribNum = 1; ribNum <= 4; ribNum++) {
      //RIB 1 (example rib) DO FOR EACH RIB
      survey.ribData[`r${ribNum}Start`] = decoded[i++];
      survey.ribData[`r${ribNum}Length`] = decoded[i++];
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

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Spinner color='green'/>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    if(type == BarCodeScanner.Constants.BarCodeType.qr) {
      let survey = this.decodeText(data);
      console.log(survey)
      this.props.addSurvey(survey);
    }
    else {
        alert("Not a Valid QR Code!");
    }
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
