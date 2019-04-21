import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'
import RibInput from './RibInput'


export default class SurfaceRibScan extends Component {
    state = {
        surveyData: this.props.navigation.getParam('surveyData') ? this.props.navigation.getParam('surveyData') : {},
        SRSData: this.props.navigation.getParam('SRSData') ? this.props.navigation.getParam('SRSData') : {},
        ASData: this.props.navigation.getParam('ASData') ? this.props.navigation.getParam('ASData') : {},
        r1Items: this.props.navigation.getParam('r1Items') ? this.props.navigation.getParam('r1Items') : [],
        r2Items: this.props.navigation.getParam('r2Items') ? this.props.navigation.getParam('r2Items') : [],
        r3Items: this.props.navigation.getParam('r3Items') ? this.props.navigation.getParam('r3Items') : [],
        r4Items: this.props.navigation.getParam('r4Items') ? this.props.navigation.getParam('r4Items') : [],
        asItems: this.props.navigation.getParam('asItems') ? this.props.navigation.getParam('asItems') : [],
        MicroData: this.props.navigation.getParam('MicroData') ? this.props.navigation.getParam('MicroData') : {},
    }

    moveToTeamInfo = () => {
        this.props.navigation.push(
            'TeamInfo', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
            }
        );
    }

    moveToArea = () => {
        this.props.navigation.push(
            'Area', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
            }
        );
    }

    moveToAS = () => {
        this.props.navigation.push(
            'AccumulationSweep', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
            }
        );
    }

    moveToMicro = () => {
        this.props.navigation.push(
            'MicroDebris', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
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

    updateSurveyState(refName, e) {
        console.log(this.state.surveyData)
        let key =  refName;//e.target.id;
        let value = e.nativeEvent.text;
        this.setState(prevState => {
            prevState.surveyData[key] = value;
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
                            surveyData={this.state.surveyData}
                            ribNumber={1} 
                            decrementSRS={this.decrementSRS} 
                            incrementSRS={this.incrementSRS}
                            inputItems={this.state.r1Items}
                            updateSurveyState={this.updateSurveyState}
                        />
                    </Tab>
                    <Tab heading='Rib 2'>
                        <RibInput 
                            SRSData={this.state.SRSData}
                            surveyData={this.state.surveyData} 
                            ribNumber={2} 
                            decrementSRS={this.decrementSRS} 
                            incrementSRS={this.incrementSRS}
                            inputItems={this.state.r2Items}
                            updateSurveyState={this.updateSurveyState}
                        />
                    </Tab>
                    <Tab heading='Rib 3'>
                        <RibInput 
                            SRSData={this.state.SRSData}
                            surveyData={this.state.surveyData} 
                            ribNumber={3} 
                            decrementSRS={this.decrementSRS} 
                            incrementSRS={this.incrementSRS}
                            inputItems={this.state.r3Items}
                            updateSurveyState={this.updateSurveyState}
                        />
                    </Tab>
                    <Tab heading='Rib 4'>
                        <RibInput 
                            SRSData={this.state.SRSData}
                            surveyData={this.state.surveyData} 
                            ribNumber={4} 
                            decrementSRS={this.decrementSRS} 
                            incrementSRS={this.incrementSRS}
                            inputItems={this.state.r4Items}
                            updateSurveyState={this.updateSurveyState}
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
