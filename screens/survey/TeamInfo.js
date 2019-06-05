import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DatePicker, Icon, Item, Input, Footer, FooterTab, Button} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker'

export default class TeamInfo extends Component {

    constructor(props){
        super(props);
    }
    state = {
        showTime: false,
        time: new Date(),
        hours: '00',
        minutes: '00',
        surveyData: this.props.navigation.getParam('surveyData') ? this.props.navigation.getParam('surveyData') : {},
        srsData: {},
        asData:{}
    }
    static navigationOptions = {
        title: "Team information"
    }

    displayTimeString = () => {
        const {cleanupTime} = this.state.surveyData
        if(!cleanupTime)
            return "00:00";
        let timeString, hours, hourString, minutes, minutesString;
        hours = cleanupTime.getHours();
        hourString = hours < 10 ? `0${hours}` : `${hours}`
        minutes = cleanupTime.getMinutes();
        minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

        timeString = `${hourString}:${minutesString}`;
        return timeString;
    }

    onPressBack = () => {
        this.props.navigation.pop();
    }

    onPressTime = () => {
        this.setState({showTime: true})
    }

    setTime = (time) => {
        this.setState(
            {
                time: time,
                hours: time.getHours().length < 2 ? `0${time.getHours()}` : time.getHours(),
                minutes: time.getMinutes().length < 2 ? `0${time.getMinutes()}` : time.getMinutes(),
                showTime: false
            }
        )
    }

    onCancel = () => {
        this.setState({showTime: false})

    }

    moveToArea = () => {
        this.props.navigation.push('Area', {surveyData: this.state.surveyData});
    }

    updateSurveyState(refName, e) {
        console.log(e);
        let key =  refName;//e.target.id;
        let value = e.nativeEvent.text;
        console.log(`Key: ${key}, value: ${value}`);
        this.setState(prevState => {
            prevState.surveyData[key] = value;
            return prevState;
        })
        if(key === 'cleanupTime')
            this.setState({showTime: false})
        console.log("State set: " + JSON.stringify(this.state.surveyData))
    }

    updateSurveyTime(refName, e) {
        let key = refName;
        let val = e;

        this.setState(prevState => {
            prevState.surveyData[key] = val;
            return prevState;
        })
        
    }

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
                                ref='cleanupDate'
                                onDateChange={this.updateSurveyTime.bind(this, 'cleanupDate')}
                                maximumDate={new Date()}
                                defaultDate = {new Date()}
                                locale={'en-us'}
                            />
                        </Item>
                    </View>
                    <View style={styles.inputDouble}>
                        <Text>Time</Text>
                        <Item regular>
                            <Button onPress={this.onPressTime} style={{color: 'gray'}}>
                                <Icon name='clock'/>
                                <Text>
                                    Select Time
                                </Text>
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
                            <Text>{this.displayTimeString()}</Text>
                        </Item>
                    </View>  
                </View>
                <Footer style={styles.footer}>
                    <FooterTab>
                        <Button active style={{color: 'skyblue'}}>
                            <Icon name='person' />
                            <Text style={{color: 'white'}}>Info</Text>
                        </Button>
                        <Button vertical onPress={this.moveToArea}>
                            <Icon name='navigate' />
                            <Text >Area</Text>
                        </Button>
                        <Button vertical>
                            <Icon name='grid' />
                            <Text >SRS</Text>
                        </Button>
                        <Button vertical>
                            <Icon name='people' />
                            <Text >AS</Text>
                        </Button>
                        <Button vertical>
                            <Icon name='search' />
                            <Text >Micro</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>  
        )
    }
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        inputSingleContainer: {
            padding: 30,
        },
        inputSingle: {
            marginTop: 15
        },
        inputDoubleContainer: {
            flexDirection: 'row'
        },
        inputDouble: { 
            flex: 2,
            marginLeft: 10,
            marginRight: 10
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'yellow',
            justifyContent: 'center'
        }
    })