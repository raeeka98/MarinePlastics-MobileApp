import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'
import RibInput from './RibInput'

var BUTTONS = [
    'Cigarette Butts', 
    'Fishing Line / Polypropylene Rope', 
    'Plastic Straws',
    'Filmed Plastic',
    'Plastic Bottles / Plastic Caps',
    'Aluminum Cans / Foil / Metal',
    'Glass',
    'Styofoam / Urethane',
    'Other: Plastics',
    'Other: Food / Organics',
    'Other: Cotton / Cloth',
    'Other: Wood / Paper'
]
var DESTRUCTIVE_INDEX = 12;
var CANCEL_INDEX = 13;

export default class SurfaceRibScan extends Component {
    state = {
        surveyData: this.props.navigation.getParam('surveyData') ? this.props.navigation.getParam('surveyData') : {},
        SRSData: this.props.navigation.getParam('SRSData') ? this.props.navigation.getParam('SRSData') : {},
        r1Items: this.props.navigation.getParam('r1Items') ? this.props.navigation.getParam('r1Items') : [],
        r2Items: this.props.navigation.getParam('r2Items') ? this.props.navigation.getParam('r2Items') : [],
        r3Items: this.props.navigation.getParam('r3Items') ? this.props.navigation.getParam('r3Items') : [],
        r4Items: this.props.navigation.getParam('r4Items') ? this.props.navigation.getParam('r4Items') : [],
    }

    moveToTeamInfo = () => {
        this.props.navigation.push(
            'TeamInfo', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
            }
        );
    }

    moveToArea = () => {
        this.props.navigation.push(
            'Area', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
            }
        );
    }

    moveToAS = () => {
        this.props.navigation.push(
            'AccumulationSweep', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
            }
        );
    }

    moveToMicro = () => {
        this.props.navigation.push(
            'MicroDebris', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
            }
        );
    }

    static navigationOptions = {
        title: 'Surface Rib Scan'
    }

    decrementSRS (refName, e){
        let key = refName;
        this.setState(prevState => {
            const newVal =  prevState.SRSData[key] - 1;
            if(newVal === undefined)
                return prevState
            if(newVal < 0)
                return prevState
            prevState.SRSData[key]--;
            return prevState;
        })
    }

    incrementSRS(refName, e){
        let key = refName;
        this.setState(prevState => {
            prevState.SRSData[key] = prevState.SRSData[key] ?  prevState.SRSData[key] + 1 : 1;
            return prevState;
        })
    }
    

    render() {
        return (
            <View style={styles.container}>
                <Header hasTabs style={{height: 1}}>
                </Header>
                <Tabs>
                    <Tab heading='Rib 1'>
                        <RibInput 
                            SRSData={this.state.SRSData} 
                            ribNumber={1} 
                            decrementSRS={this.decrementSRS} 
                            incrementSRS={this.incrementSRS}
                            inputItems={this.state.r1Items}
                        />
                    </Tab>
                    <Tab heading='Rib 2'>
                        <RibInput 
                            SRSData={this.state.SRSData} 
                            ribNumber={2} 
                            decrementSRS={this.decrementSRS} 
                            incrementSRS={this.incrementSRS}
                            inputItems={this.state.r2Items}
                        />
                    </Tab>
                    <Tab heading='Rib 3'>
                        <RibInput 
                            SRSData={this.state.SRSData} 
                            ribNumber={3} 
                            decrementSRS={this.decrementSRS} 
                            incrementSRS={this.incrementSRS}
                            inputItems={this.state.r3Items}
                        />
                    </Tab>
                    <Tab heading='Rib 4'>
                        <RibInput 
                            SRSData={this.state.SRSData} 
                            ribNumber={4} 
                            decrementSRS={this.decrementSRS} 
                            incrementSRS={this.incrementSRS}
                            inputItems={this.state.r4Items}
                        />
                    </Tab>    
                </Tabs>
                
                <SurveyFooter 
                    srs 
                    moveToTeamInfo={this.moveToTeamInfo} 
                    moveToArea={this.moveToArea}
                    moveToAS={this.moveToAS}
                    moveToMicro={this.moveToMicro}
                />
               
            </View>
        )
    }
}
