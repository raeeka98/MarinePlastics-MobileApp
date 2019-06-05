import React, {Component} from 'react'
import {View, Text, ScrollView} from 'react-native'
import {Button, Icon, Header, Left, Right, Body, Accordion} from 'native-base'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import headerStyles from '../../components/headerStyles'
import {BeachInfo, NRO, TideInfo, WindInfo, SlopeSubstrate} from './areaSections'

/**
 * Users still need to enter in this information while they're at the beach because they need
 * to be able to take down the wave height, compass direction, wind speed, and possibly coordinates when
 * they're out in the field
*/


export default class Area extends Component{
    constructor(props) {
        super(props);
        this.state = {
            surveyData: this.props.surveyData ? this.props.surveyData : {},
            SRSData: this.props.SRSData ? this.props.SRSData : {},
            ASData: this.props.ASData ? this.props.ASData : {},
            MicroData: this.props.MicroData ? this.props.MicroData : {},
            ribData: this.props.ribData ? this.props.ribData : {},
            showLastTime: false,
            lastTime: new Date(),
            lastHours: '00',
            lastMinutes: '00',
            showNextTime: false,
            nextTime: new Date(),
            nextHours: '00',
            nextMinutes: '00',
        }
    }

    static navigationOptions =  {
        title: "Survey Area"
    }

    renderAccordionHeader = (item, expanded) => {
        if(expanded) {
            return (
                <View 
                    style={{
                        flexDirection: "row", 
                        padding: 10,
                        justifyContent: "space-between",
                        alignItems: "center" ,
                        backgroundColor: "#87cefa" }}
                >
                    <Text style={{fontWeight: "500"}}>{" "}{item.title}</Text>
                    <Icon style={{fontSize: 18}} type="SimpleLineIcons" name="arrow-up"/>
                </View>
            )
        }
        return (
            <View 
                style={{
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center" ,
                    backgroundColor: "#1a8cff" }} 
            >
                <Text style={{fontWeight: "400", color: 'white'}}>{" "}{item.title}</Text>
                <Icon style={{fontSize: 18, color: 'white'}}type="SimpleLineIcons" name="arrow-down"/>
            </View>
        )
    }

    /**
     * Here we need to wrap the entire screen in a KeyboardView component, which will 
     * let the user input data without it being obscured by the keyboard
     */
    render() {
        /*
         * This array contains the content and headers to be displayed using the accordian
         * component. Each element represents the corresponding subsection in the 
         * Area portion of the survey.
         */
        const subSections = [
            {
                title: "Beach Info",
                content: <BeachInfo 
                            surveyData={this.props.surveyData} 
                            updateSurveyState={this.props.updateSurveyState}
                            invalidFields={this.props.invalidFields} 
                            checkedbox={this.props.checkedbox} 
                            updateSurveyLocation={this.props.updateSurveyLocation}
                        />  
            },
            {
                title: "Nearest River Output",
                content: <NRO 
                            surveyData={this.props.surveyData} 
                            updateSurveyState={this.props.updateSurveyState}
                            invalidFields={this.props.invalidFields}
                         />
            },
            {
                title: "Tide Info",
                content: <TideInfo 
                            surveyData={this.props.surveyData} 
                            updateSurveyState={this.props.updateSurveyState}
                            invalidFields={this.props.invalidFields}
                            updateSurveyTime={this.props.updateSurveyTime}
                            onDropdownChange={this.props.onDropdownChange}

                         />
            },
            {
                title: "Wind Info",
                content: <WindInfo 
                            surveyData={this.props.surveyData} 
                            updateSurveyState={this.props.updateSurveyState}
                            invalidFields={this.props.invalidFields}
                            onDropdownChange={this.props.onDropdownChange}
                         />
            },
            {
                title: "Slope and Substrate Type",
                content: <SlopeSubstrate 
                            surveyData={this.props.surveyData} 
                            updateSurveyState={this.props.updateSurveyState}
                            invalidFields={this.props.invalidFields}
                            onDropdownChange={this.props.onDropdownChange}
                            checkedbox={this.props.checkedbox}
                         />
            }
        ]
        return(
            /* We'll need to use the KeyboardView component to prevent the keyboard from blocking the input
             * while the user is typing
             */
            <KeyboardView style={styles.container}>
            
                <Header hasTabs style={headerStyles.header} >
                    <Left style={headerStyles.headerContents}>
                    
                    </Left>
                    <Body style={headerStyles.headerContents}>
                        <Text style={{fontSize: 18, color: 'white'}}>Survey Area</Text>
                    </Body>
                    <Right style={headerStyles.headerContents}>
                        <Button success onPress={this.props.onClickFinish}>
                            <Text style={{padding: 5, color: 'white'}}>Finish</Text>
                        </Button>
                    </Right>
                </Header>

                <ScrollView style={{marginBottom:125}}>
                    <Accordion dataArray={subSections} renderContent={(item) => {return item.content}} renderHeader={this.renderAccordionHeader}/>                       
                </ScrollView>

            </KeyboardView>
        )
    }
}

