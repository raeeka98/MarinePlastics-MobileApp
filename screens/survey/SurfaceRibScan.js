import React, { Component } from 'react'
import {TextInput, Text, View } from 'react-native'
import {Item} from 'native-base'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'

export default class SurfaceRibScan extends Component {
    moveToTeamInfo = () => {
        this.props.navigation.push('TeamInfo', {surveyData: this.state.surveyData});
    }

    moveToArea = () => {
        this.props.navigation.push('Area', {surveyData: this.state.surveyData});
    }

    static navigationOptions = {
        title : "Surface Rib Scan"
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>I am text</Text>
                    <Item regular>
                        <TextInput></TextInput>
                    </Item>
                </View>
                <SurveyFooter srs moveToTeamInfo={this.moveToTeamInfo} moveToArea={this.moveToArea}/>
            </View>
        )
    }
}