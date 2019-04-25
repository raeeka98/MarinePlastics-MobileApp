import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import TeamInfo from './TeamInfo'
import Area from './Area'
import SurfaceRibScan from './SurfaceRibScan'
import AccumulationSweep from './AccumulationSweep'
import MicroDebris from './MicroDebris'
import SurveyFooter from './SurveyFooter'
import RibInput from './RibInput'
import RibEntryModal from './RibEntry'

/**
 * This class will contain the entire survey within the screen, rendering different 
 * sections of the survey within one page
 */

export default class SurveyContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            surveyData: {},
            SRSData: {},
            ASData: {},
            r1Items: [],
            r2Items:  [],
            r3Items:  [],
            r4Items: [],
            asItems: [],
            MicroData: {},
            tabArray : [],
            shouldRender:{
                teamInfo: false,
                area: false,
                srs: true,
                as: false,
                micro: false
            },
            currentScreen: "srs"
        }
        this.renderCurrentScreen = this.renderCurrentScreen.bind(this);
        this.moveToTeamInfo = this.moveToTeamInfo.bind(this);
        this.moveToArea=this.moveToArea.bind(this);
        this.moveToSRS = this.moveToSRS.bind(this);
        this.moveToAS = this.moveToAS.bind(this);
        this.moveToMicro = this.moveToMicro.bind(this);
    }

    static navigationOptions = {
        header : null 
    }

    moveToTeamInfo() {
        console.log(this.state )
        this.setState({
            currentScreen: "teamInfo",
            shouldRender:{
                teamInfo: true,
                area: false,
                srs: false,
                as: false,
                micro: false
            }
        })
    }

    moveToArea() {
        this.setState({
            currentScreen: "area",
            shouldRender:{
                teamInfo: false,
                area: true,
                srs: false,
                as: false,
                micro: false
            }
        })
    }

    moveToSRS() {
        this.setState({
            currentScreen: "srs",
            shouldRender:{
                teamInfo: false,
                area: false,
                srs: true,
                as: false,
                micro: false
            }
        })
    }

    moveToAS() {
        this.setState({
            currentScreen: "as",
            shouldRender:{
                teamInfo: false,
                area: false,
                srs: false,
                as: true,
                micro: false
            }
        })
    }

    moveToMicro() {
        this.setState({
            currentScreen: "micro",
            shouldRender:{
                teamInfo: false,
                area: false,
                srs: false,
                as: false,
                micro: true
            }
        })
    }

    /**
     * This function takes in a reference name and an event to update the state of the survey.
     * The reference name is the key that will be used to update the variable in surveyData. 
     * e is used to grab the text from the text input and update the data with the new
     * value
     */
    updateSurveyState(refName, e) {
        console.log(this.state)
        let key =  refName;//e.target.id;
        let value = e.nativeEvent.text;
        this.setState(prevState => {
            prevState.surveyData[key] = value;
            return prevState;
        })
        if(key === 'cleanupTime')
            this.setState({showTime: false})
    }

    /**
     * A slightly different function has to be done here; e itself is the time that is being
     * updated, so we use it as the value to update the key
     */
    updateSurveyTime(refName, e) {
        let key = refName;
        let val = e;

        this.setState(prevState => {
            prevState.surveyData[key] = val;
            return prevState;
        })
        
    }

    /**
     * Here, we need to take the change in the dropdown menu, stored in value, and set 
     * surveyData[refName] to the new value.
     */
    onDropdownChange(refName, value) {
        this.setState(prevState => {
            prevState.surveyData[refName] = value;
            console.log(prevState.surveyData)
            return prevState
        })
    }

    /**
     * When updating the data, the checked value should be the opposite from what it was
     * before the user checked the value.
     */
    checkedbox(refName, e) {
        let key = refName;
        let selection = this.state.surveyData[refName];
        this.setState(prevState => {
            prevState.surveyData[key] = !selection;
            return prevState;
        })
    }

     /**
     * Increment or decrement the given key. When decrementing, the user cannot have a negative
     * value.
     */

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

    decrementAS (refName, e){
        let key = refName;
        this.setState(prevState => {
            const newVal =  prevState.ASData[key] - 1;
            if(newVal === undefined)
                return prevState
            if(newVal < 0)
                return prevState
            prevState.ASData[key]--;
            return prevState;
        })
    }

    incrementAS(refName, e){
        let key = refName;
        this.setState(prevState => {
            prevState.ASData[key] = prevState.ASData[key] ?  prevState.ASData[key] + 1 : 1;
            return prevState;
        })
    }

    decrementMicro (refName, e){
        let key = refName;
        this.setState(prevState => {
            const newVal =  prevState.MicroData[key] - 1;
            if(newVal === undefined)
                return prevState
            if(newVal < 0)
                return prevState
            prevState.MicroData[key]--; 
            return prevState;
        })
    }

    incrementMicro(refName, e){
        let key = refName;
        this.setState(prevState => {
            prevState.MicroData[key] = prevState.MicroData[key] ?  prevState.MicroData[key] + 1 : 1;
            return prevState;
        })
    }

    renderCurrentScreen() {
        const {currentScreen} = this.state;
        switch(currentScreen) {
            case "teamInfo" :
                return (
                    <TeamInfo 
                        surveyData={this.state.surveyData}
                        SRSData={this.state.SRSData}
                        ASData={this.state.ASData}
                        r1Items={this.state.r1Items}
                        r2Items={this.state.r2Items}
                        r3Items={this.state.r3Items}
                        r4Items={this.state.r4Items}
                        asItems={this.state.asItems}
                        MicroData={this.state.MicroData}
                        tabArray={this.state.tabArray}
                        updateSurveyState={this.updateSurveyState}
                        updateSurveyTime={this.updateSurveyTime}
                    />
                )
            case "area" : 
                return(
                    <Area 
                        surveyData={this.state.surveyData}
                        SRSData={this.state.SRSData}
                        ASData={this.state.ASData}
                        r1Items={this.state.r1Items}
                        r2Items={this.state.r2Items}
                        r3Items={this.state.r3Items}
                        r4Items={this.state.r4Items}
                        asItems={this.state.asItems}
                        MicroData={this.state.MicroData}
                        checkedbox={this.checkedbox}
                        onDropdownChange={this.onDropdownChange}
                        updateSurveyState={this.updateSurveyState}
                        updateSurveyTime={this.updateSurveyTime}
                    />
                )
            case "srs" :
                return (
                    <SurfaceRibScan 
                        surveyData={this.state.surveyData}
                        SRSData={this.state.SRSData}
                        ASData={this.state.ASData}
                        r1Items={this.state.r1Items}
                        r2Items={this.state.r2Items}
                        r3Items={this.state.r3Items}
                        r4Items={this.state.r4Items}
                        asItems={this.state.asItems}
                        MicroData={this.state.MicroData}
                        tabArray={this.state.tabArray}
                        updateSurveyState={this.updateSurveyState}
                        incrementSRS={this.incrementSRS}
                        decrementSRS={this.decrementSRS}
                    />
                )
            case "as" : 
                return (
                    <AccumulationSweep 
                        surveyData={this.state.surveyData}
                        SRSData={this.state.SRSData}
                        ASData={this.state.ASData}
                        r1Items={this.state.r1Items}
                        r2Items={this.state.r2Items}
                        r3Items={this.state.r3Items}
                        r4Items={this.state.r4Items}
                        asItems={this.state.asItems}
                        MicroData={this.state.MicroData}
                        incrementAS={this.incrementAS}
                        decrementAS={this.decrementAS} 
                    />
                )
            default :
                return (
                    <MicroDebris 
                        surveyData={this.state.surveyData}
                        SRSData={this.state.SRSData}
                        ASData={this.state.ASData}
                        r1Items={this.state.r1Items}
                        r2Items={this.state.r2Items}
                        r3Items={this.state.r3Items}
                        r4Items={this.state.r4Items}
                        asItems={this.state.asItems}
                        MicroData={this.state.MicroData}
                        incrementMicro={this.incrementMicro}
                        decrementMicro={this.decrementMicro}
                    />
                )
        }
    }

    render() {
        const {shouldRender} = this.state;
        console.log("BIG RENDER")
        return(
            <View style={styles.container}>
                {this.renderCurrentScreen()}
                <SurveyFooter 
                    teamInfo={shouldRender.teamInfo}
                    area={shouldRender.area }
                    srs={shouldRender.srs}
                    as={shouldRender.as}
                    micro={shouldRender.micro}
                    moveToTeamInfo={this.moveToTeamInfo}
                    moveToArea={this.moveToArea}
                    moveToSRS={this.moveToSRS}
                    moveToAS={this.moveToAS}
                    moveToMicro={this.moveToMicro}
                />
            </View>
        )
    }
}