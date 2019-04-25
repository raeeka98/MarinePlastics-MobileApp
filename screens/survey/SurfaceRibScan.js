import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title} from 'native-base'
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
        r1Items: this.props.r1Items ? this.props.r1Items : [],
        r2Items: this.props.r2Items ? this.props.r2Items : [],
        r3Items: this.props.r3Items ? this.props.r3Items : [],
        r4Items: this.props.r4Items ? this.props.r4Items : [],
        asItems: this.props.asItems ? this.props.asItems : [],
        MicroData: this.props.MicroData ? this.props.MicroData : {},
        modalVisible: false,
        tabArray: this.props.tabArray ? this.props.tabArray : [],
    }

    hideModal = () => { 
        this.setState({modalVisible: false})
    }

    submitAddRib (ribNumber, ribLength, ribStart) {
        let ribArrayName = `r${ribNumber}Items`
        let ribNumLength = `r${ribNumber}Length`
        let ribNumStart = `r${ribNumber}Start`
        let newRib = (
            <Tab heading={`Rib ${ribNumber}`}>
                <RibInput
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
            return prevState
        })
    }
    
    renderTabs = () => {
        console.log("Rendereing tgabsf") 
        this.setState({
            tabs:'rendered'
        })
    }
    
    /**
     * Here we render the actual input screens within the tabs so that each rib can have its
     * own input screen dedicated to entering data
     */
    render() {
        console.log("OUTER RENDER" )
        return (
            <View style={styles.container}>
                <Header hasTabs style={{height : 75}}>
                    <Left style={{marginTop: 20}}>
                        <Button transparent>
                        <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{marginTop: 20, fontSize: 18, color: 'white'}}>Header</Text>
                    </Body>
                    <Right style={{marginTop: 20}}/>
                </Header>
                <Tabs>
                    <Tab heading='+ Add Rib'>
                        <RibEntry
                            updateSurveyState={this.props.updateSurveyState}
                            surveyData={this.props.surveyData}
                            submitAddRib={this.submitAddRib}
                            tabArray={this.state.tabArray}
                            renderTabs={this.renderTabs}
                        />
                    </Tab>
                   {this.state.tabsArray}  
                </Tabs>
               
            </View>
        )
    }
}
