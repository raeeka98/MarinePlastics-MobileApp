import React, {Component} from 'react'
import {Modal, View, Text, TextInput} from 'react-native'
import {Button, Item} from 'native-base'
import styles from './surveyStyles'


export default class RibEntryModal extends Component {
    state={
        modalVisible: false
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                    <Text style={{fontSize: 20}}>Rib Start:</Text>
                    <Item regular>
                        <TextInput 
                            style={{width: 100, height: 35}}
                            onChange={this.props.updateSurveyState.bind(this, ribStart)}
                            value={this.state.surveyData[ribStart]}
                        />
                    </Item>
                </View>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                    <Text style={{fontSize: 20}}>Rib Length:</Text>
                    <Item regular>
                        <TextInput 
                            style={{width: 100, height: 35}}
                            onChange={this.props.updateSurveyState.bind(this, ribLength)}
                            value={this.state.surveyData[ribLength]}
                        />
                    </Item>
                </View>
            </View>
            
        )
    }
}