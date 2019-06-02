import React, { Component } from 'react'
import {Text, View} from 'react-native'
import {Button, Tab, Tabs, Header, Left, Body, Right, Picker} from 'native-base'

import styles from './surveyStyles'
import RibInput from './RibInput'
import RibEntry from './RibEntry'
import headerStyles from '../headerStyles';

/**
 * This is the most complex section of the survey. The SRS section allows users to dynamically
 * add up to 4 rib sections to survey. This is to make it easier for groups to take a rib
 * and conduct a survey on it, eventually putting it all together in the end when generating
 * the QR code to combine rib data
 */

export default class SurfaceRibScan extends Component {
    /**
     * 'tabArray'
     * - This is an array that contains each of the tab components that are to be rendered
     *   for its corresponding rib. This array needs to be preserved across all of the survey
     *   sections to that the rib input gets rendered. It will also need to be remade when
     *   a user comes back to edit the survey later on.
     * 
     * 'ribsToSelect'
     * - This is an array that will also need to be preserved across all components, mainly to
     *   make sure that the user can't enter in two 'Rib 1' sections, for example. As a user 
     *   creates a new Rib, the corresponding picker items will be removed.
     * 
     * 'remade'
     * - This is a boolean variable that is used to remake the tab sections when the user leaves
     *   the survey or navigates to another section.
     */
    constructor(props){
        super(props);

        this.state = {
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
    }

    /**
     * This function takes in the ribNumber, ribLength, and ribStart that the user inputs 
     * into RibEntry component and saves it into the 'ribData' object that can be exported to 
     * other surveys. Additionally, a RibInput component will be added to the tab array 
     * so that the rib's data can be added to the survey
     */

    submitAddRib = (ribNumber, ribLength, ribStart) => {
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
            return prevState
        })
    }
    
    /**
     * Check to see if there are preexisting rib data in order to remake a certain tab
     */

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
