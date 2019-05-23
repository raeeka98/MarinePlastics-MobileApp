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

import { FlatList } from 'react-native-gesture-handler';

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

function LoginModal(props) {
  return(
    <Modal isVisible={props.isLoginModalVisible}>
      <View style={{alignSelf: 'center', width: '90%', height: 150, backgroundColor: 'white'}} >
        <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Attention!</Text>
        <Text style={{alignSelf: 'center', padding: 8, fontSize: 15,}}>You must be logged in to submit a survey!</Text>
        <View style={{flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'flex-end'}}>
          <Button light style={{alignSelf: 'center'}} onPress={props.closeLoginModal}>
            <Text>OK</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

function LoadingModal(props) {
  return(
    <Modal isVisible={props.isLoadingModalVisible}>
      <View style={{alignSelf: 'center', width: '90%', height: '20%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around', flexDirection:'row'}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{fontSize: 17}}>Loading ...</Text>
      </View>
    </Modal>
  );
}

function FinishedModal(props) {
  return(
    <Modal isVisible={props.isFinishedVisible}>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', width: '90%', height: "20%", backgroundColor: 'white'}}>
          <Text style={{alignSelf: 'center', textAlign: 'center', padding: 8, fontSize: 20, fontWeight: 'bold'}}>Your survey has been successfully submitted!</Text>
          <Button style={{alignSelf: 'center'}}light onPress={props.closeFinishedModal}>
            <Text>OK</Text>
          </Button>
      </View>
    </Modal>
  );
}

function ConfirmModal(props) {
  const { isConfirmModalVisible, match, confirmBeach, closeConfirmModal, finalBeachSubmit } = props;
  return(
    <Modal isVisible={isConfirmModalVisible}>
      <View style={{alignSelf: 'center', width: '90%', height: 150, backgroundColor: 'white'}} >
        <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>
          {
            match ?
              `Submit under beach \"${confirmBeach}\"?` :
              `Create a new beach \"${confirmBeach}\"?`
          }
          </Text>
        <View style={{flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'flex-end'}}>
          <Button light style={{alignSelf: 'center'}} onPress={closeConfirmModal}>
            <Text>No</Text>
          </Button>
          <Button success style={{alignSelf: 'center'}} onPress={finalBeachSubmit}>
            <Text>Yes</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

export { SubmitModal, LoginModal, LoadingModal, FinishedModal, ConfirmModal }
