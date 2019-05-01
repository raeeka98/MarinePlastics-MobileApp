import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title, Picker} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'
import RibInput from './RibInput'
import RibEntry from './RibEntry'

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
        asItems: this.props.asItems ? this.props.asItems : [],
        MicroData: this.props.MicroData ? this.props.MicroData : {},
        modalVisible: false,
        tabArray: this.props.tabArray ? this.props.tabArray : [],
        ribsToSelect: [
            <Picker.Item label="1" value="1" />,
            <Picker.Item label="2" value="2" />,
            <Picker.Item label="3" value="3" />,
            <Picker.Item label="4" value="4" />
        ]
    }

    hideModal = () => { 
        this.setState({modalVisible: false})
    }

    

    submitAddRib = (ribNumber, ribLength, ribStart) => {
        console.log("Made it")
        let ribArrayName = `r${ribNumber}Items`
        let ribNumLength = `r${ribNumber}Length`
        let ribNumStart = `r${ribNumber}Start`
        let newRib = (
            <Tab heading={`Rib ${ribNumber}`}>
                <RibInput
                    key={ribNumber}
                    SRSData={this.state.SRSData}
                    surveyData={this.state.surveyData}
                    ribNumber={ribNumber} 
                    decrementSRS={this.props.decrementSRS} 
                    incrementSRS={this.props.incrementSRS}
                    inputItems={this.state[ribArrayName]}
                    updateSurveyState={this.props.updateSurveyState}
                />
            </Tab>
        )
        
        this.setState(prevState => {
            prevState.tabArray.push(newRib);
            prevState.surveyData[ribNumLength] = ribLength;
            prevState.surveyData[ribNumStart] = ribStart;
            prevState.ribsToSelect = prevState.ribsToSelect.filter(comp => comp.props.value !== ribNumber)
            console.log(prevState)
            return prevState
        })
    }
    
    renderTabs = (parameter) =>{
        console.log(`Passed: ${parameter}`)  
        this.setState({
            tabs:'rendered'
        })
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
                <Header hasTabs style={{height : 75}}>
                    <Left style={{marginTop: 20}}>
                        
                    </Left>
                    <Body>
                        <Text style={{marginTop: 20, fontSize: 18, color: 'white'}}>Header</Text>
                    </Body>
                    <Right style={{marginTop: 25}}>
                        <Button success>
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
