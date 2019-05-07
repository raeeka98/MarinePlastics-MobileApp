import React, {Component} from 'react'
import {TextInput, View, Text, StyleSheet, ScrollView} from 'react-native'
import {Item, Footer, FooterTab, Button, Icon, Picker, Header, Left, Right, Body, Accordion} from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'
import CheckBox from 'react-native-check-box'

import SurveyFooter from './SurveyFooter'
import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'

/**
 * I think that users still need to enter in this information while they're at the beach because they need
 * to be able to take down the wave height, compass direction, wind speed, and possibly coordinates when
 * they're out in the field
*/
const invisiblePlaceholder = "                                                                                                   "


export default class Area extends Component{
    state = {
        surveyData: this.props.surveyData ? this.props.surveyData : {},
        SRSData: this.props.SRSData ? this.props.SRSData : {},
        ASData: this.props.ASData ? this.props.ASData : {},
        MicroData: this.props.MicroData ? this.props.MicroData : {},
        showLastTime: false,
        lastTime: new Date(),
        lastHours: '00',
        lastMinutes: '00',
        showNextTime: false,
        nextTime: new Date(),
        nextHours: '00',
        nextMinutes: '00',
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
                    backgroundColor: "#6CB5FF" }} 
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
                            checkedbox={this.props.checkedbox} 
                        />  
            },
            {
                title: "Nearest River Output",
                content: <NRO 
                            surveyData={this.props.surveyData} 
                            updateSurveyState={this.props.updateSurveyState}
                         />
            },
            {
                title: "Tide Info",
                content: <TideInfo 
                            surveyData={this.props.surveyData} 
                            updateSurveyState={this.props.updateSurveyState}
                            updateSurveyTime={this.props.updateSurveyTime}
                            onDropdownChange={this.props.onDropdownChange}

                         />
            },
            {
                title: "Wind Info",
                content: <WindInfo 
                            surveyData={this.props.surveyData} 
                            updateSurveyState={this.props.updateSurveyState}
                            onDropdownChange={this.props.onDropdownChange}
                         />
            },
            {
                title: "Slope and Substrate Type",
                content: <SlopeSubstrate 
                            surveyData={this.props.surveyData} 
                            updateSurveyState={this.props.updateSurveyState}
                            onDropdownChange={this.props.onDropdownChange}
                            checkedbox={this.props.checkedbox}
                         />
            }
        ]
        return(
            <KeyboardView style={styles.container}>
            
                <Header hasTabs style={{height : 75}} >
                    <Left style={{marginTop: 20}}>
                    
                    </Left>
                    <Body>
                        <Text style={{marginTop: 20, fontSize: 18, color: 'white'}}>Survey Area</Text>
                    </Body>
                    <Right style={{marginTop: 25}}>
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

class BeachInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            surveyData: this.props.surveyData ? this.props.surveyData : {},
        }
    }

    render() {
        return (    
            <View style={{marginBottom: 8}}>
                {/* Render the Beach Info */}
                <View style={styles.inputSingleContainer}>
                    <Text style={styles.inputSingle}>Beach Name</Text>
                    <Item regular>
                        <TextInput
                            ref = 'beachName' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.props.updateSurveyState.bind(this, 'beachName')}
                            value={this.state.surveyData.beachName}
                        />
                    </Item>

                    <Text style={styles.inputSingle}>Latitude (Link to GPS stuff here)</Text>
                    <Item regular>
                        <TextInput
                            ref = 'latitude' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.props.updateSurveyState.bind(this, 'latitude')}
                            value={this.state.surveyData.latitude}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Longitude (Link to GPS stuff here)</Text>
                    <Item regular>
                        <TextInput
                            ref = 'longitude' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.props.updateSurveyState.bind(this, 'longitude')}
                            value={this.state.surveyData.longitude}
                        />
                    </Item>
                </View>
                <View style={styles.inputDoubleContainer}>
                    <View style={styles.inputDouble}>
                        <Text>
                            Major Usage:
                        </Text> 
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.usageRecreation} 
                                onClick={this.props.checkedbox.bind(this, 'usageRecreation')} 
                            />
                            <Text style={{marginLeft:5}}>Recreation</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.usageCommercial} 
                                onClick={this.props.checkedbox.bind(this, 'usageCommercial')} 
                            />
                            <Text style={{marginLeft:5}}>Commercial</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.usageOther} 
                                onClick={this.props.checkedbox.bind(this, 'usageOther')} 
                            />
                            <Text style={{marginLeft:5}}>Other</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput 
                                editable={this.state.surveyData.usageOther === true} 
                                placeholder={invisiblePlaceholder} 
                                style={{height: 30}}
                            />
                        </Item>
                    </View>
                    <View style={styles.inputDouble}>
                        <Text>
                            Reason For Beach Choice:
                        </Text>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.locationChoiceProximity} 
                                onClick={this.props.checkedbox.bind(this, 'locationChoiceProximity')} 
                            />
                            <Text  style={{marginLeft:5}}>Proximity/Convenience</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.locationChoiceDebris} 
                                onClick={this.props.checkedbox.bind(this, 'locationChoiceDebris')} 
                            />
                            <Text style={{marginLeft:5}}>Known for Debris</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.locationChoiceOther} 
                                onClick={this.props.checkedbox.bind(this, 'locationChoiceOther')} 
                            />
                            <Text style={{marginLeft:5}}>Other</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput 
                                editable={this.state.surveyData.locationChoiceOther === true} 
                                placeholder={invisiblePlaceholder} 
                                style={{height: 30}}
                            />
                        </Item>
                    </View>
                </View>
                <View style={{marginLeft: 15, marginRight:15}}>
                    <Text style={styles.inputSingle}>Compass Direction (Degrees)</Text>
                    <Item regular>
                        <TextInput
                            ref = 'cmpsDir' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.props.updateSurveyState.bind(this, 'cmpsDir')}
                            value={this.state.surveyData.cmpsDir}
                        />
                    </Item>
                </View>
            </View>
        )
    }
}

class NRO extends Component {
    constructor(props) {
        super(props)

        this.state={
            surveyData: this.props.surveyData ? this.props.surveyData : {}
        }
    }

    render() {
        return (
            <View>
                {/* Render the Nearest River Output Section */}
                <View style={styles.inputSingleContainer}>
                    <Text style={styles.inputSingle}>River Name</Text>
                    <Item regular>
                        <TextInput
                            ref = 'riverName' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.props.updateSurveyState.bind(this, 'riverName')}
                            value={this.state.surveyData.riverName}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Approximate Distance</Text>
                    <Item regular>
                        <TextInput
                            ref = 'riverDistance' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.props.updateSurveyState.bind(this, 'riverDistance')}
                            value={this.state.surveyData.riverDistance}
                        />
                    </Item>
                </View>
            </View>
        )
    }
}

class TideInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            surveyData: this.props.surveyData ? this.props.surveyData : {}
        }
    }

    displayTimeString = (time) => {
        const tideTime = this.state.surveyData[time]
        if(!tideTime)
            return "--:--";
        let timeString, hours, hourString, minutes, minutesString;
        hours = tideTime.getHours();
        hourString = hours < 10 ? `0${hours}` : `${hours}`
        minutes = tideTime.getMinutes();
        minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

        timeString = `${hourString}:${minutesString}`;
        return timeString;
    }

    onPressLastTime = () => {
        this.setState({showLastTime: true})
    }

    setLastTime = (time) => {
        this.setState(
            {
                lastTime: time,
                lastHours: time.getHours() < 10 ? `0${time.getHours()}` : time.getHours(),
                lastMinutes: time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes(),
                showLastTime: false
            }
        )
    }

    onCancelLast = () => {
        this.setState({showLastTime: false})

    }

    onPressNextTime = () => {
        this.setState({showNextTime: true})
    }

    setNextTime = (time) => {
        this.setState(
            {
                nextTime: time,
                nextHours: time.getHours() < 10 ? `0${time.getHours()}` : time.getHours(),
                nextMinutes: time.getMinutes().length < 10 ? `0${time.getMinutes()}` : time.getMinutes(),
                showNextTime: false
            }
        )
    }

    onCancelNext = () => {
        this.setState({showNextTime: false})

    }

    render () {
        return (
            <View>
                {/* Render Tide information */}
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize: 20}}>Last Tide Before Cleanup</Text>
                    <Text style={styles.inputSingle}>Type</Text>
                    <Item regular>
                        <Picker
                            mode='dropdown'
                            iosIcon={<Icon name="arrow-down"/>}
                            placeholder="Please Select"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            style={{width: undefined}}
                            selectedValue={this.state.surveyData.tideTypeA}
                            onValueChange={this.props.onDropdownChange.bind(this, 'tideTypeA' )}
                        >
                            <Picker.Item label="High" value="high" />
                            <Picker.Item label="Low" value='low' />
                        </Picker>
                        
                    </Item>
                </View>
                <View style={[styles.inputDoubleContainer, {marginBottom: 20}]}>
                    <View style={styles.inputDouble}>
                        <Text style={styles.inputDouble}>Height (ft.)</Text>
                        <Item regular>
                            <TextInput
                                ref = 'tideHeightA' 
                                keyboardType="number-pad"
                                placeholder={invisiblePlaceholder} 
                                style={styles.textInput} 
                                onChange={this.props.updateSurveyState.bind(this, 'tideHeightA')}
                                value={this.state.surveyData.tideHeightA}
                            />
                        </Item>
                    </View>
                    <View style={styles.inputDouble}>
                        <Text style={{marginBottom: 5}}>Select Time</Text>
                        <Item regular>
                            <Button onPress={this.onPressLastTime} style={{color: 'gray'}}>
                                <Icon name='clock'></Icon>
                            </Button>
                            <DateTimePicker
                                isVisible={this.state.showLastTime}    
                                mode={'time'}
                                onConfirm={this.props.updateSurveyTime.bind(this, 'tideTimeA')}
                                is24Hour={false}   
                                onCancel={this.onCancelLast}                   
                            />
                            <TextInput 
                                editable={false }
                                style={{width: '70%', textAlign: 'center', fontSize: 17}} 
                                value={this.displayTimeString('tideTimeA')}
                            />
                        </Item>
                    </View>
                </View>
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize: 20}}>Next Tide After Cleanup</Text>
                    <Text style={styles.inputSingle}>Type</Text>
                    <Item regular>
                        <Picker
                            mode='dropdown'
                            iosIcon={<Icon name="arrow-down"/>}
                            placeholder="Please Select"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            style={{width: undefined}}
                            selectedValue={this.state.surveyData.tideTypeB}
                            onValueChange={this.props.onDropdownChange.bind(this, 'tideTypeB' )}
                        >
                            <Picker.Item label="High" value="high" />
                            <Picker.Item label="Low" value='low' />
                        </Picker>
                    </Item>
                </View>
                <View style={[styles.inputDoubleContainer, {marginBottom: 20}]}>
                    <View style={styles.inputDouble}>
                        <Text style={styles.inputDouble}>Height (ft.)</Text>
                        <Item regular>
                            <TextInput
                                ref = 'tideHeightB' 
                                placeholder={invisiblePlaceholder} 
                                keyboardType="number-pad"
                                style={styles.textInput} 
                                onChange={this.props.updateSurveyState.bind(this, 'tideHeightB')}
                                value={this.state.surveyData.tideHeightB}
                            />
                        </Item>
                    </View>
                    <View style={styles.inputDouble}>
                        <Text style={{marginBottom: 5}}>Select Time</Text>
                        <Item regular>
                            <Button onPress={this.onPressNextTime} style={{color: 'gray'}}>
                                <Icon name='clock'></Icon>
                            </Button>
                            <DateTimePicker
                                isVisible={this.state.showNextTime}    
                                mode={'time'}
                                onConfirm={this.props.updateSurveyTime.bind(this, 'tideTimeB')}
                                is24Hour={false}   
                                onCancel={this.onCancelNext}                   
                            />
                            <TextInput 
                                editable={false }
                                style={{width: '70%', textAlign: 'center', fontSize: 17}} 
                                value={this.displayTimeString('tideTimeB')}
                            />
                        </Item>
                    </View>
                </View>
            </View>
        )
    }
}

class WindInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyData : this.props.surveyData ? this.props.surveyData : {}
        }
    }

    render() {
        return(
            <View>
                {/* Render the wind info */}
                <View style={styles.inputSingleContainer}>
                    <Text style={styles.inputSingle}>Speed (knots):</Text>
                    <Item regular>
                        <TextInput
                            ref = 'windSpeed'
                            keyboardType="number-pad" 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.props.updateSurveyState.bind(this, 'windSpeed')}
                            value={this.state.surveyData.windSpeed}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Direction:</Text>
                    <Item regular>
                        <Picker
                            mode='dropdown'
                            iosIcon={<Icon name="arrow-down"/>}
                            placeholder="Please Select"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            style={{width: undefined}}
                            selectedValue={this.state.surveyData.windDir}
                            onValueChange={this.props.onDropdownChange.bind(this, 'windDir' )}
                        >
                            <Picker.Item label="North" value="n" />
                            <Picker.Item label="Northeast" value='ne' />
                            <Picker.Item label="East" value='e' />
                            <Picker.Item label="Southeast" value='se' />
                            <Picker.Item label="South" value='s' />
                            <Picker.Item label="Southwest" value='sw' />
                            <Picker.Item label="West" value='w' />
                            <Picker.Item label="Northwest" value='nw' />
                        </Picker>
                    </Item>
                </View>
            </View>
        )
    }
}

class SlopeSubstrate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyData : this.props.surveyData ? this.props.surveyData : {}
        }
    }

    render() {
        return (
            <View>
                {/* Render the slope information */}
                <View style={styles.inputSingleContainer}>
                    <Text>Beach Slope:</Text>
                    <Item regular>
                        <Picker
                            mode='dropdown'
                            iosIcon={<Icon name="arrow-down"/>}
                            placeholder="Please Select"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            style={{width: undefined}}
                            selectedValue={this.state.surveyData.slope}
                            onValueChange={this.props.onDropdownChange.bind(this, 'slope' )}
                        >
                            <Picker.Item label="Winter Profile" value="winter" />
                            <Picker.Item label="Summer Profile" value='summer' />
                        </Picker>
                    </Item>
                    
                </View>

                {/* Render the subtrate type choices */}
                <View style={styles.inputSingleContainer}>
                    <Text>Substrate Type:</Text>
                    <View style={styles.inputSingle}>
                        <View style={styles.checkBoxLarge}>
                            <CheckBox 
                                isChecked={this.state.surveyData.substrateTypeSand} 
                                onClick={this.props.checkedbox.bind(this, 'substrateTypeSand')} 
                                checkedImage={<Icon type="AntDesign" name="checksquare" color="#84E17F" size={45} />}
                                unCheckedImage={<Icon type="Feather" name="square" color="#84E17F" size={45} />} 
                            />
                            <Text  style={{marginLeft:15, fontSize: 16}}>Sand</Text>
                        </View>
                        <View style={styles.checkBoxLarge}>
                            <CheckBox 
                                isChecked={this.state.surveyData.substrateTypePebble} 
                                onClick={this.props.checkedbox.bind(this, 'substrateTypePebble')} 
                                checkedImage={<Icon type="AntDesign" name="checksquare" color="#84E17F" size={45} />}
                                unCheckedImage={<Icon type="Feather" name="square" color="#84E17F" size={45} />} 
                            />
                            <Text style={{marginLeft:15, fontSize: 16}}>Pebble</Text>
                        </View>
                        <View style={styles.checkBoxLarge}>
                            <CheckBox 
                                isChecked={this.state.surveyData.substrateTypeRipRap} 
                                onClick={this.props.checkedbox.bind(this, 'substrateTypeRipRap')}
                                checkedImage={<Icon type="AntDesign" name="checksquare" color="#84E17F" size={45} />}
                                unCheckedImage={<Icon type="Feather" name="square" color="#84E17F" size={45} />}  
                            />
                            <Text style={{marginLeft:15, fontSize: 16}}>Rip Rap</Text>
                        </View>
                        <View style={styles.checkBoxLarge}>
                            <CheckBox 
                                isChecked={this.state.surveyData.substrateTypeSeaweed} 
                                onClick={this.props.checkedbox.bind(this, 'substrateTypeSeaweed')} 
                                checkedImage={<Icon type="AntDesign" name="checksquare" color="#84E17F" size={45} />}
                                unCheckedImage={<Icon type="Feather" name="square" color="#84E17F" size={45} />} 
                            />
                            <Text style={{marginLeft:15, fontSize: 16}}>Seaweed</Text>
                        </View>
                        <View style={styles.checkBoxLarge}>
                            <CheckBox 
                                isChecked={this.state.surveyData.substrateTypeOther} 
                                onClick={this.props.checkedbox.bind(this, 'substrateTypeOther')} 
                                checkedImage={<Icon type="AntDesign" name="checksquare" color="#84E17F" size={45} />}
                                unCheckedImage={<Icon type="Feather" name="square" color="#84E17F" size={45} />} 
                            />
                            <Text style={{marginLeft:15, fontSize: 16}}>Other</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput 
                                editable={this.state.surveyData.locationChoiceOther === true} 
                                placeholder={invisiblePlaceholder} 
                                style={{height: 30}}
                            />
                        </Item>
                    </View>
                </View>
            </View>
        )
    }
}