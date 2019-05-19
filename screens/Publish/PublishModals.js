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
  Spinner,
  Button,
  Text,
  Container,
  Header,
  Content,
  Card,
  CardItem,
} from 'native-base';
import Modal from 'react-native-modal'

// props: isSubmitModalVisible, selectedName, onPressSubmit
function SubmitModal(props) {
    return(
      <Modal isVisible={props.isSubmitModalVisible}>
        <View style={{alignSelf: 'center', width: '90%', height: 150, backgroundColor: 'white'}} >
          <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Submit {props.selectedName}?</Text>
          <View style={{flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'flex-end'}}>
            <Button light style={{alignSelf: 'center'}} onPress={props.closeSubmitModal}>
              <Text>Cancel</Text>
            </Button>
            <Button success style={{alignSelf: 'center'}} onPress={props.onPressSubmit}>
              <Text>Submit</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
}

export {SubmitModal}
