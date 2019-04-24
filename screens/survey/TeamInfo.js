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
        surveyData: this.props.surveyData ? this.props.surveyData : {},
        SRSData: this.props.SRSData ? this.props.SRSData : {},
        ASData: this.props.ASData ? this.props.ASData : {},
        r1Items: this.props.r1Items ? this.props.r1Items : [],
        r2Items: this.props.r2Items ? this.props.r2Items : [],
        r3Items: this.props.r3Items ? this.props.r3Items : [],
        r4Items: this.props.r4Items ? this.props.r4Items : [],
        asItems: this.props.asItems ? this.props.asItems : [],
        MicroData: this.props.MicroData ? this.props.MicroData : {},
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
                            onChange={this.props.updateSurveyState.bind(this, 'userFirst')}
                            value={this.state.surveyData.userFirst}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Last Name</Text>
                    <Item regular>
                        <Input
                            ref='userLast'
                            onChange={this.props.updateSurveyState.bind(this, 'userLast')}
                            value={this.state.surveyData.userLast}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Organization Name</Text>
                    <Item regular>
                        <Input
                            ref='orgName'
                            onChange={this.props.updateSurveyState.bind(this, 'orgName')}
                            value={this.state.surveyData.orgName}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Organization Location</Text>
                    <Item regular>
                        <Input
                            ref='orgLoc'
                            onChange={this.props.updateSurveyState.bind(this, 'orgLoc')}
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
                                onDateChange={this.props.updateSurveyTime.bind(this, 'cleanupDate')}
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
                                onConfirm={this.props.updateSurveyTime.bind(this, 'cleanupTime')}
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
            </View>  
        )
    }
}