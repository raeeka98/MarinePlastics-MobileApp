import React, { Component } from 'react'
import { TextInput, View } from 'react-native'
import { Button, Item, Text, Container, Content } from 'native-base'
import Modal from 'react-native-modal'

import styles from './surveyStyles'


/*
  Modal to make sure the user wants to exit the survey.
*/
function ExitModal(props) {
    const { isBackVisible, closeBackModal, closeBackAndNavigate } = props;
    return (
        <Modal isVisible={isBackVisible}>
            <View style={
                {
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    height: 150,
                    width: '90%'
                }
            }
            >
                <Text style={{ alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500' }}>Exit without saving?</Text>
                <View style={[styles.inputDoubleContainer, { justifyContent: 'space-evenly' }]}>
                    <Button light style={{ justifyContent: 'center', width: 100 }} onPress={closeBackModal}>
                        <Text style={{ padding: 8 }}>No</Text>
                    </Button>
                    <Button danger style={{ justifyContent: 'center', width: 100 }} onPress={closeBackAndNavigate}>
                        <Text style={{ color: 'white', padding: 8 }}>Exit</Text>
                    </Button>
                </View>
            </View>
        </Modal>
    );
}

export { ExitModal };
