import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title, Picker} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'
import RibInput from './RibInput'
import RibEntry from './RibEntry'
import headerStyles from '../headerStyles';

const tabHeadings = [
    '+ Add Rib',
    'Rib 1',
    'Rib 2',
    'Rib 3',
    'Rib 4'
]

export default class SurfaceRibScan extends Component {
    state = {
        surveyData: this.props.surveyData ? this.props.surveyData : {},
        SRSData: this.props.SRSData ? this.props.SRSData : {},
        ASData: this.props.ASData ? this.props.ASData : {},
        MicroData: this.props.MicroData ? this.props.MicroData : {},
        ribData: this.props.ribData ? this.props.ribData : {},
        modalVisible: false,
        tabArray: this.props.tabArray ? this.props.tabArray : [],
        ribsToSelect: this.props.ribsToSelect ? this.props.ribsToSelect : [
            <Picker.Item key='1' label="1" value="1" />,
            <Picker.Item key='2' label="2" value="2" />,
            <Picker.Item key='3' label="3" value="3" />,
            <Picker.Item key='4' label="4" value="4" />
        ],
        remade: this.props.remade ? this.props.remade : false
    }

    submitAddRib = (ribNumber, ribLength, ribStart) => {
        console.log("Made it")
        let ribArrayName = `r${ribNumber}Items`
        let ribNumLength = `r${ribNumber}Length`
        let ribNumStart = `r${ribNumber}Start`
        let newRib = (
            <Tab key={ribNumber} heading={`Rib ${ribNumber}`}>
                <RibInput
                    id={ribNumber}
                    SRSData={this.state.SRSData}
                    surveyData={this.state.surveyData}
                    ribData={this.state.ribData}
                    ribNumber={ribNumber} 
                    decrementSRS={this.props.decrementSRS} 
                    incrementSRS={this.props.incrementSRS}
                    inputItems={this.state[ribArrayName]}
                    updateSurveyState={this.props.updateSurveyState}
                    updateRibData={this.props.updateRibData}
                />
            </Tab>
        )
        
        this.setState(prevState => {
            prevState.tabArray.push(newRib);
            prevState.ribData[ribNumLength] = ribLength;
            prevState.ribData[ribNumStart] = ribStart;
            prevState.ribsToSelect = prevState.ribsToSelect.filter(comp => comp.props.value !== ribNumber)
            console.log(prevState.ribsToSelect)
            return prevState
        })
    }

    remakeTabs = () => {
        const {ribData} = this.state;
        if(ribData.r1Start !== undefined){
            this.submitAddRib('1', ribData.r1Length, ribData.r1Start);
        }
        if(ribData.r2Start !== undefined){
            this.submitAddRib('2', ribData.r2Length, ribData.r2Start);
        }
        if(ribData.r3Start !== undefined){
            this.submitAddRib('3', ribData.r3Length, ribData.r3Start);
        }
        if(ribData.r4Start !== undefined){
            this.submitAddRib('4', ribData.r4Length, ribData.r4Start);
        }
        this.props.setRemade();
    }

    /**
     * We need to check to see if we're editing a pre-existing survey. If so, 
     * we have to reconstruct the tabs
     */
    componentWillMount(){
        if(!this.state.remade)
            this.remakeTabs()
    }
    
    /**
     * Here we render the actual input screens within the tabs so that each rib can have its
     * own input screen dedicated to entering data
     * Once we get to 4 ribs, we want to hide the option to add a rib (for now...)
     */
    render() {
        console.log("OUTER RENDER" )
        return (
            <View style={styles.container}>
                <Header hasTabs style={headerStyles.header}>
                    <Left style={headerStyles.headerContents}>
                        
                    </Left>
                    <Body style={headerStyles.headerContents}>
                        <Text style={{fontSize: 18, color: 'white'}}>Header</Text>
                    </Body>
                    <Right style={headerStyles.headerContents}>
                        <Button success onPress={this.props.onClickFinish}>
                            <Text style={{padding: 5, color: 'white'}}>Finish</Text>
                        </Button>
                    </Right>
                </Header>
                <Tabs>
                    {
                        this.state.tabArray.length < 4 ? 
                            <Tab heading='+ Add Rib'>
                                <RibEntry
                                    updateSurveyState={this.props.updateSurveyState}
                                    updateRibData={this.props.updateRibData}
                                    surveyData={this.props.surveyData}
                                    submitAddRib={this.submitAddRib}
                                    tabArray={this.state.tabArray}
                                    renderTabs={this.renderTabs}
                                    ribsToSelect={this.state.ribsToSelect}
                                />
                            </Tab>
                        : null
                    }
                   {this.state.tabArray}  
                </Tabs>
               
            </View>
        )
    }
}
