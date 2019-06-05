import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import {DatePicker, Icon, Item, Input, Button, Header, Right, Left, Body} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker' 

import headerStyles from '../../components/headerStyles'
import styles from './surveyStyles'

export default class TeamInfo extends Component {

    constructor(props){
        super(props);
    /*
     * Setting up the initial state of the app.
     * Note that here we separate the surveyData, SRS, Micro, and AS in order to keep the functions
     * for each object separate and independent
     *
     * Note that when we initialize the items, we want to check to see if any existing values that are passed
     * from a previous screeen
     */
    this.state = {
        showTime: false,
        time: new Date(),
        hours: '00',
        minutes: '00',
        surveyData: this.props.surveyData ? this.props.surveyData : {},
        SRSData: this.props.SRSData ? this.props.SRSData : {},
        ASData: this.props.ASData ? this.props.ASData : {},
        MicroData: this.props.MicroData ? this.props.MicroData : {},
        ribData: this.props.ribData ? this.props.ribData : {},
        tabArray: this.props.tabArray ? this.props.tabArray : []
    }
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
     * Some navigation for pressing back. We only want the user to press back in this page, since it
     * signifies that they will be leaving the survey form
     */
    onPressBack = () => {
        this.props.openBackModal();
    }

    onPressTime = () => {
        this.setState({showTime: true})
    }

    hideTime = () => {
        this.setState({showTime: false})
    }

    onConfirm = (id, time) => {
        this.props.updateSurveyTime(id, time);
        this.hideTime();
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
                <Header style={headerStyles.header}>
                    <Left style={headerStyles.headerContents}>
                        <Button transparent onPress={this.onPressBack}>
                            <Icon type="AntDesign" name='close'/>
                        </Button>
                    </Left>
                    <Body>
                        <Text style={[headerStyles.headerContents, {fontSize: 18, color: 'white'}]}>Team Information</Text>
                    </Body>
                    <Right style={headerStyles.headerContents}>
                        <Button success onPress={this.props.onClickFinish}>
                            <Text style={{padding: 5, color: 'white'}}>Finish</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.inputSingleContainer} >
                    <Text style={styles.inputSingle}>First Name</Text>
                    <Item regular>
                        <Input
                            style={this.props.invalidFields.includes('userFirst') ? {borderWidth: 2, borderColor: 'red'} : {}}
                            editable={true}
                            ref='userFirst'
                            onChange={this.props.updateSurveyState.bind(this, 'userFirst')}
                            value={this.state.surveyData.userFirst}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Last Name</Text>
                    <Item regular>
                        <Input
                            style={this.props.invalidFields.includes('userLast') ? {borderWidth: 2, borderColor: 'red'} : {}}
                            ref='userLast'
                            onChange={this.props.updateSurveyState.bind(this, 'userLast')}
                            value={this.state.surveyData.userLast}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Organization Name</Text>
                    <Item regular>
                        <Input
                            style={this.props.invalidFields.includes('orgName') ? {borderWidth: 2, borderColor: 'red'} : {}}
                            ref='orgName'
                            onChange={this.props.updateSurveyState.bind(this, 'orgName')}
                            value={this.state.surveyData.orgName}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Organization Location</Text>
                    <Item regular>
                        <Input
                            style={this.props.invalidFields.includes('orgLoc') ? {borderWidth: 2, borderColor: 'red'} : {}}
                            ref='orgLoc'
                            onChange={this.props.updateSurveyState.bind(this, 'orgLoc')}
                            value={this.state.surveyData.orgLoc}
                        />
                    </Item>

                </View>
                {/* - Use the DatePicker component to have a user select a date that the beach survey takes place */}
                {/* - Use the DateTimePicker component to have a user select the time for the beach survey */}
                <View style={styles.inputDoubleContainer}>
                    <View style={styles.inputDouble}>

                        <Text>Date</Text>
                        <Item regular style={this.props.invalidFields.includes('cleanupDate') ?
                                        {
                                            borderWidth: 4,
                                            borderColor: 'red',
                                            textAlign: 'center'
                                        } :
                                        {}
                                      }>
                            <DatePicker
                                style={
                                        {
                                            height: '100%',
                                            textAlign: 'center'
                                        }
                                      }
                                ref='cleanupDate'
                                onDateChange={this.props.updateSurveyTime.bind(this, 'cleanupDate')}
                                maximumDate={new Date()}
                                defaultDate = {this.state.surveyData.cleanupDate}
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
                                onConfirm={this.onConfirm.bind(this, 'cleanupTime')}
                                is24Hour={false}
                                maximumDate={new Date()}
                                onCancel={this.hideTime}
                            />
                            <TextInput
                                editable={false }
                                style={this.props.invalidFields.includes('cleanupTime') ?
                                        {
                                            borderColor: 'red',
                                            borderWidth: 2,
                                            width: '70%',
                                            textAlign: 'center',
                                            fontSize: 17
                                        } :
                                        {
                                            width: '70%',
                                            textAlign: 'center',
                                            fontSize: 17
                                        }
                                    }
                                value={this.displayTimeString('cleanupTime')}
                            />
                        </Item>
                    </View>
                </View>
            </View>
        )
    }
}
