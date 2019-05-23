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
  const { isDeleteVisible, name, cancelDelete, deleteSurvey } = props;
  return(
    <Modal isVisible={isDeleteVisible}>
      <View style={{alignSelf: 'center', width: '90%', height: 250, backgroundColor: 'white'}} >
        <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Delete {name}?</Text>
        <View style={ {flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button light style={{justifyContent: 'center',width: 100}}onPress={cancelDelete}>
            <Text>No</Text>
          </Button>
          <Button danger  style={{justifyContent: 'center', width: 100}}onPress={deleteSurvey} title='Edit'>
            <Text>Delete</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

export { DeleteModal }
