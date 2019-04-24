import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'
import RibInput from './RibInput'
import RibEntryModal from './RibEntryModal'

/**
 * This class will contain the entire survey within the screen, rendering different 
 * sections of the survey within one page
 */

export default class SurveyContainer extends Component {
    constructor(props) {
        super(props);

        state = {
            surveyData: {},
            SRSData: {},
            ASData: {},
            r1Items: [],
            r2Items:  [],
            r3Items:  [],
            r4Items: [],
            asItems: [],
            MicroData: {},
            shouldRender:{
                teamInfo: true,
                area: false,
                srs: false,
                as: false,
                micro: false
            },
            currentScreen: "teamInfo"
        }
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
                    />
                )
        }
    }

    render() {
        const {shouldRender} = this.state;
        return(
            <View>
                {this.renderCurrentScreen()}
                <SurveyFooter 
                    teamInfo={shouldRender.teamInfo}
                    area={shouldRender.area }
                    srs={shouldRender.srs}
                    as={shouldRender.as}
                    micro={shouldRender.micro}
                />
            </View>
        )
    }
}