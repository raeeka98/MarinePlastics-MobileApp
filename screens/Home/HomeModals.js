import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  RefreshControl
} from 'react-native';

import {
  Icon,
  Footer,
  Button,
  Toast,
  Text,
  Container,
  Header,
  Content,
  View
} from 'native-base'
import Modal from 'react-native-modal'

function DeleteModal(props) {
  return(
    <Modal isVisible={props.isDeleteVisible}>
      <View style={{alignSelf: 'center', width: '90%', height: 250, backgroundColor: 'white'}} >
        <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Delete {props.name}?</Text>
        <View style={ {flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button light style={{justifyContent: 'center',width: 100}}onPress={props.closeDelete}>
            <Text>No</Text>
          </Button>
          <Button danger  style={{justifyContent: 'center', width: 100}}onPress={props.deleteSurvey} title='Edit'>
            <Text>Delete</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

export { DeleteModal }
