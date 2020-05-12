import React, {Component} from 'react'
import {TextInput, View, Text} from 'react-native'
import {Item, Button, Icon, Picker} from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'
import CheckBox from 'react-native-check-box'

import styles from './surveyStyles'

const invisiblePlaceholder = "                                                                                                   "

/**
 * This class is the beach information section that allows the user to turn on their location
 * services to obtain the beach coordinates for the survey, enter in the beach name, and
 * check off why the user is at the beach and what the major usage is
 */
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
                            style={[styles.textInput, (
                                this.props.invalidFields.includes('beachName') ? 
                                    {borderColor: 'red', borderWidth: 2} : {}
                            )]} 
                            onChange={this.props.updateSurveyState.bind(this, 'beachName')}
                            value={this.state.surveyData.beachName}
                        />
                    </Item>

                    <Button light full style={{padding: 8, marginTop: 8}}onPress={this.props.updateSurveyLocation}>
                        <Text>Get Coordinates</Text>
                    </Button>
                    <Text style={styles.inputSingle}>Latitude</Text>
                    <Item regular>
                        <TextInput
                            ref = 'latitude' 
                            placeholder={invisiblePlaceholder} 
                            style={[styles.textInput, (
                                this.props.invalidFields.includes('latitude') ? 
                                    {borderColor: 'red', borderWidth: 2} : {}
                            )]}  
                            onChange={this.props.updateSurveyState.bind(this, 'latitude')}
                            keyboardType='number-pad'
                            value={this.state.surveyData.latitude ? this.state.surveyData.latitude + "" : ""}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Longitude</Text>
                    <Item regular>
                        <TextInput
                            ref = 'longitude' 
                            placeholder={invisiblePlaceholder} 
                            style={[styles.textInput, (
                                this.props.invalidFields.includes('longitude') ? 
                                    {borderColor: 'red', borderWidth: 2} : {}
                            )]} 
                            keyboardType='number-pad'
                            onChange={this.props.updateSurveyState.bind(this, 'longitude')}
                            value={this.state.surveyData.longitude ? this.state.surveyData.longitude + "" : ""}
                        />
                    </Item>
                </View>
                <View style={styles.inputDoubleContainer}>
                    <View style={[styles.inputDouble, (this.props.invalidFields.includes('usage') ? 
                                    {borderColor: 'red', borderWidth: 2} : {})]} >
                        <Text>
                            Major Usage: {"\n"} (most approperiate one)
                        </Text> 
                        <View 
                            style={styles.checkBox} 
                        >
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
                                isChecked={this.state.surveyData.usageRemote} 
                                onClick={this.props.checkedbox.bind(this, 'usageRemote')} 
                            />
                            <Text style={{marginLeft:5}}>Remote/Unused</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.otherChecked} 
                                onClick={this.props.checkedbox.bind(this, 'otherChecked')} 
                            />
                            <Text style={{marginLeft:5}}>Other</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput 
                                editable={this.state.surveyData.otherChecked === true} 
                                placeholder={invisiblePlaceholder} 
                                style={{height: 30}}
                                onChange={this.props.updateSurveyState.bind(this, 'usageOther')}
                                value={this.state.surveyData.usageOther}
                            />
                        </Item>
                    </View>
                    <View style={[styles.inputDouble, (this.props.invalidFields.includes('locChoice') ? 
                                    {borderColor: 'red', borderWidth: 2} : {})]}>
                        <Text>
                            Reason For Beach Choice: {"\n"} (check all that apply)
                        </Text>
                        <View 
                            style={[styles.checkBox]} 
                        >
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
                                isChecked={this.state.surveyData.lcOtherChecked} 
                                onClick={this.props.checkedbox.bind(this, 'lcOtherChecked')} 
                            />
                            <Text style={{marginLeft:5}}>Other</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput 
                                editable={this.state.surveyData.lcOtherChecked === true} 
                                placeholder={invisiblePlaceholder} 
                                style={{height: 30}}
                                onChange={this.props.updateSurveyState.bind(this, 'locationChoiceOther')}
                                value={this.state.surveyData.locationChoiceOther}
                            />
                        </Item>
                    </View>
                </View>
                <View style={{marginLeft: 15, marginRight:15}}>
                    <Text style={styles.inputSingle}>Compass Direction {"\n"} (when facing the water - Degrees)</Text>
                    <Item regular>
                        <TextInput
                            ref = 'cmpsDir' 
                            keyboardType='number-pad'
                            placeholder={invisiblePlaceholder} 
                            style={[styles.textInput, (this.props.invalidFields.includes('cmpsDir') ? 
                                    {borderColor: 'red', borderWidth: 2} : {})]} 
                            onChange={this.props.updateSurveyState.bind(this, 'cmpsDir')}
                            value={this.state.surveyData.cmpsDir}
                        />
                    </Item>
                </View>
            </View>
        )
    }
}

/**
 * NRO = Nearest River Output
 * Simple component that just contains information for the nearest river name and distance
 */

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
                            style={[styles.textInput, (this.props.invalidFields.includes('riverName') ? 
                                    {borderColor: 'red', borderWidth: 2} : {})]} 
                            onChange={this.props.updateSurveyState.bind(this, 'riverName')}
                            value={this.state.surveyData.riverName}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Approximate Distance</Text>
                    <Item regular>
                        <TextInput
                            ref = 'riverDistance' 
                            placeholder={invisiblePlaceholder} 
                            keyboardType='number-pad'
                            style={[styles.textInput, (this.props.invalidFields.includes('riverDistance') ? 
                                    {borderColor: 'red', borderWidth: 2} : {})]} 
                            onChange={this.props.updateSurveyState.bind(this, 'riverDistance')}
                            value={this.state.surveyData.riverDistance}
                        />
                    </Item>
                </View>
            </View>
        )
    }
}

/**
 * TideInfo records the input for tide height, time, and type for the tides before and after the 
 * Beach survey
 */

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
                                style={[styles.textInput, (this.props.invalidFields.includes('tideHeightA') ? 
                                        {borderColor: 'red', borderWidth: 2} : {})]}  
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
                                style={[{width: '70%', textAlign: 'center', fontSize: 17}, (this.props.invalidFields.includes('tideTimeA') ? 
                                            {borderColor: 'red', borderWidth: 2} : {})]} 
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
                                style={[styles.textInput, (this.props.invalidFields.includes('tideHeightB') ? 
                                        {borderColor: 'red', borderWidth: 2} : {})]} 
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
                                style={[{width: '70%', textAlign: 'center', fontSize: 17}, (this.props.invalidFields.includes('tideTimeB') ? 
                                            {borderColor: 'red', borderWidth: 2} : {})]} 
                                value={this.displayTimeString('tideTimeB')}
                            />
                        </Item>
                    </View>
                </View>
            </View>
        )
    }
}

/**
 * WindInfo has the information for the wind speed and direction at the time of the survey
 * In the future, it may be possible to incorporate some sort of API that the user could use
 * to either 
 * - A: Record the wind speed with the use of the phone
 * - B: Pull wind speed and direction using the user's location to query a weather API or 
 *      website/database
 */

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
                            style={[styles.textInput, (this.props.invalidFields.includes('windSpeed') ? 
                                        {borderColor: 'red', borderWidth: 2} : {})]} 
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

/**
 * Check boxes and pickers to record the substrate type and beach slope
 */

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
                    <View style={[styles.inputSingle, (this.props.invalidFields.includes('subType') ? 
                                        {borderColor: 'red', borderWidth: 2} : {})]}
                     >
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
                                isChecked={this.state.surveyData.stOther} 
                                onClick={this.props.checkedbox.bind(this, 'stOther')} 
                                checkedImage={<Icon type="AntDesign" name="checksquare" color="#84E17F" size={45} />}
                                unCheckedImage={<Icon type="Feather" name="square" color="#84E17F" size={45} />} 
                            />
                            <Text style={{marginLeft:15, fontSize: 16}}>Other</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput 
                                editable={this.state.surveyData.stOther === true} 
                                placeholder={invisiblePlaceholder} 
                                style={{height: 30}}
                                onChange={this.props.updateSurveyState.bind(this, 'substrateTypeOther')}
                                value={this.state.surveyData.substrateTypeOther}
                            />
                        </Item>
                    </View>
                </View>
            </View>
        )
    }
}

export {BeachInfo, NRO, TideInfo, WindInfo,SlopeSubstrate};