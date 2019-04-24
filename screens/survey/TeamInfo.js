import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {DatePicker, Icon, Item, Input, Footer, FooterTab, Button} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker'

import SurveyFooter from './SurveyFooter'
import styles from './surveyStyles'

export default class TeamInfo extends Component {

    constructor(props){
        super(props);
    }
    /*
     * Setting up the initial state of the app.
     * Note that here we separate the surveyData, SRS, Micro, and AS in order to keep the functions
     * for each object separate and independent
     * 
     * Note that when we initialize the items, we want to check to see if any existing values that are passed
     * from a previous screeen 
     */
    state = {
        showTime: false,
        time: new Date(),
        hours: '00',
        minutes: '00',
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
    static navigationOptions = {
        title: "Team information"
    }

    /**
     * Creates the time string to display on the app before and after the user enters a time
    */
    displayTimeString = () => {
        const {cleanupTime} = this.state.surveyData
        if(!cleanupTime)
            return "--:--";
        let timeString, hours, hourString, minutes, minutesString;
        hours = cleanupTime.getHours();
        hourString = hours < 10 ? `0${hours}` : `${hours}`
        minutes = cleanupTime.getMinutes();
        minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

        timeString = `${hourString}:${minutesString}`;
        return timeString;
    }

    /**
     * Some navigation for pressing back
     */
    onPressBack = () => {
        this.props.navigation.pop();
    }

    onPressTime = () => {
        this.setState({showTime: true})
    }

    onCancel = () => {
        this.setState({showTime: false})

    }

    /**
     * Navigate to the Area screen. The logic for this function is pretty simple and is reflected across all 
     * navigation functions: pass the data that we have onto the next screen
     */
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
                MicroData: this.state.MicroData,
            }
        );
    }

    moveToSRS = () => {
        this.props.navigation.push(
            'SurfaceRibScan', 
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

    /**
     * This function takes in a reference name and an event to update the state of the survey.
     * The reference name is the key that will be used to update the variable in surveyData. 
     * e is used to grab the text from the text input and update the data with the new
     * value
     */
    updateSurveyState(refName, e) {
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
     * In the render function, whenever we update the survey state we need to bind the function
     * using this and the reference name. The reason that we do this is because elements in 
     * react native don't maintain an id attribute like react does, so we can't simply set
     * the id in the props. We need to pass the actual reference by binding the function
     * each time it is called.
     * 
     * NOTE: Binding the function each time can lead to a bit of a slow down, but since there's
     * not really an easier way to do this for now we might need to stick with it.
     */
    render() {
        return(
            <View style={styles.container}>
                
                <View style={styles.inputSingleContainer} >
                    <Text style={styles.inputSingle}>First Name</Text>
                    <Item regular>
                        <Input 
                            editable={true}
                            ref='userFirst'
                            onChange={this.updateSurveyState.bind(this, 'userFirst')}
                            value={this.state.surveyData.userFirst}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Last Name</Text>
                    <Item regular>
                        <Input
                            ref='userLast'
                            onChange={this.updateSurveyState.bind(this, 'userLast')}
                            value={this.state.surveyData.userLast}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Organization Name</Text>
                    <Item regular>
                        <Input
                            ref='orgName'
                            onChange={this.updateSurveyState.bind(this, 'orgName')}
                            value={this.state.surveyData.orgName}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Organization Location</Text>
                    <Item regular>
                        <Input
                            ref='orgLoc'
                            onChange={this.updateSurveyState.bind(this, 'orgLoc')}
                            value={this.state.surveyData.orgLoc}
                        />
                    </Item>
                    
                </View>
                <View style={styles.inputDoubleContainer}>
                    <View style={styles.inputDouble}>
                        
                        <Text>Date</Text>
                        <Item regular>
                            <DatePicker 
                                style={{height: '100%', textAlign: 'center'}}
                                ref='cleanupDate'
                                onDateChange={this.updateSurveyTime.bind(this, 'cleanupDate')}
                                maximumDate={new Date()}
                                defaultDate = {new Date()}
                                locale={'en-us'}
                            />
                        </Item>
                    </View>
                    <View style={styles.inputDouble}>
                        <Text>Select Time</Text>
                        <Item regular>
                            <Button onPress={this.onPressTime} style={{ color: 'gray'}}>
                                <Icon name='clock'/>
                            </Button>
                            <DateTimePicker
                                ref='cleanupTime'
                                isVisible={this.state.showTime}    
                                mode={'time'}
                                onConfirm={this.updateSurveyTime.bind(this, 'cleanupTime')}
                                is24Hour={false}
                                maximumDate={new Date()}   
                                onCancel={this.onCancel}                   
                            />
                            <TextInput 
                                editable={false }
                                style={{width: '70%', textAlign: 'center', fontSize: 17}} 
                                value={this.displayTimeString('cleanupTime')}
                            />
                        </Item>
                    </View>  
                </View>
                <SurveyFooter 
                    teamInfo 
                    moveToArea={this.moveToArea} 
                    moveToSRS={this.moveToSRS}
                    moveToAS={this.moveToAS}
                    moveToMicro={this.moveToMicro}
                />
            </View>  
        )
    }
}