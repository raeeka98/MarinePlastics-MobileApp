import React from 'react';


import {
  Button,
  Text,
  View,
  List,
  ListItem
} from 'native-base'
import Modal from 'react-native-modal'

function DeleteModal(props) {
  const { isDeleteVisible, name, cancelDelete, deleteSurvey } = props;
  return(
    <Modal isVisible={isDeleteVisible}>
      <View style={{alignSelf: 'center', width: '90%', height: 200, backgroundColor: 'white'}} >
        <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Delete {name}?</Text>
        <Text style={{alignSelf: 'center', padding: 4, fontSize: 16}}>If you delete, the data is gone for good!</Text>
        <View style={ {flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly'}}>
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

function GeneralModal (props) {
  const {isModalVisible, openDelete, name, encodeToText, cancelModal, openSurvey, onPressDeleteSurvey, navToPublish } = props;
  return(
    <Modal
      isVisible={isModalVisible}
      onModalHide={openDelete}
      style={{flex: 1}}>
      <View style={{alignSelf: 'center', width: '90%', backgroundColor: 'white'}} >
        <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>{name}</Text>
          <List>
            <ListItem>
              <Button transparent style={{justifyContent: 'flex-start'}}onPress={encodeToText} >
                <Text style={{color: 'royalblue'}}>Generate QR Code</Text>
              </Button>
            </ListItem>
            <ListItem>
              <Button
                transparent
                style={{justifyContent: 'flex-start', width: 100}}
                onPress={() => {if(!props.published){openSurvey()}} }
                >
                <Text style={{color: props.published ? 'lightgrey' : 'royalblue'}}>Edit</Text>
              </Button>
            </ListItem>
            <ListItem>
              <Button transparent style={{justifyContent: 'flex-start',width: 100}} onPress={()=>{if(!props.published){navToPublish()}}}>
                <Text style={{color: props.published ? 'lightgrey' : 'royalblue'}}>Publish</Text>
              </Button>
            </ListItem>
            <ListItem>
              <Button transparent style={{justifyContent: 'flex-start', width: 100}}onPress={onPressDeleteSurvey} title='Delete'>
                <Text style={{color: 'red'}}>Delete</Text>
              </Button>
            </ListItem>
            <ListItem>
              <Button transparent style={{justifyContent: 'flex-start',width: 100}}onPress={cancelModal} >
                <Text style={{color: 'royalblue'}}>Back</Text>
              </Button>
            </ListItem>
          </List>
      </View>
    </Modal>
  );
}

export { DeleteModal, GeneralModal }
