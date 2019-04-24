import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'
import RibInput from './RibInput'
import RibEntryModal from './RibEntryModal'

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
        tabArray: [
            <Tab heading='+ Add Rib'>
                <RibEntryModal
                />
            </Tab>
        ],
        loading: true
    }

    hideModal = () => { 
        this.setState({modalVisible: false})
    }

    async componentWillMount() { 
        await Expo.Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }
    
    renderTabs = () => {
        let tabArray = [];
        tabArray.push(
            <Tab heading={tabHeadings[1]}>
                <RibInput 
                    SRSData={this.state.SRSData} 
                    surveyData={this.state.surveyData}
                    ribNumber={1} 
                    decrementSRS={this.props.decrementSRS} 
                    incrementSRS={this.props.incrementSRS}
                    inputItems={this.state.r1Items}
                    updateSurveyState={this.props.updateSurveyState}
                />
            </Tab> 
        )
        tabArray.push(
            <Tab heading='Rib 2'>
                <RibInput 
                    SRSData={this.state.SRSData}
                    surveyData={this.state.surveyData} 
                    ribNumber={2} 
                    decrementSRS={this.props.decrementSRS} 
                    incrementSRS={this.props.incrementSRS}
                    inputItems={this.state.r2Items}
                    updateSurveyState={this.props.updateSurveyState}
                />
            </Tab>
        )

        tabArray.push(
            <Tab heading='Rib 3'>
                <RibInput 
                    SRSData={this.state.SRSData}
                    surveyData={this.state.surveyData} 
                    ribNumber={3} 
                    decrementSRS={this.props.decrementSRS} 
                    incrementSRS={this.props.incrementSRS}
                    inputItems={this.state.r3Items}
                    updateSurveyState={this.props.updateSurveyState}
                />
            </Tab>
        )
        tabArray.push(
            <Tab heading='Rib 4'>
                <RibInput 
                    SRSData={this.state.SRSData}
                    surveyData={this.state.surveyData} 
                    ribNumber={4} 
                    decrementSRS={this.props.decrementSRS} 
                    incrementSRS={this.props.incrementSRS}
                    inputItems={this.state.r4Items}
                    updateSurveyState={this.props.updateSurveyState}
                />
            </Tab> 
        )
        
        return tabArray
    }
    
    /**
     * Here we render the actual input screens within the tabs so that each rib can have its
     * own input screen dedicated to entering data
     */
    render() {
        
        return (
            <View style={styles.container}>
                <Header hasTabs >
                        <Left>
                    <Button transparent>
                    <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Text>Header</Text>
                </Body>
                <Right>
                    <Button transparent>
                    <Icon name='menu' />
                    </Button>
                </Right> 
                </Header>
                <Tabs>
                   {this.renderTabs()}  
                </Tabs>
               
            </View>
        )
    }
}
