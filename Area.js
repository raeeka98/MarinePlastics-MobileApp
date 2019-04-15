import React, {Component} from 'react'
import {UIManager, Animated, TextInput, Keyboard, Dimensions, View, Text, StyleSheet, ScrollView} from 'react-native'
import {Item, Footer, FooterTab, Button, Icon, CheckBox} from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'


import KeyboardView from './KeyboardView'

/**
 * I think that users still need to enter in this information while they're at the beach because they need
 * to be able to take down the wave height, compass direction, wind speed, and possibly coordinates when
 * they're out in the field
*/
const invisiblePlaceholder = "                                                                                                   "

export default class Area extends Component{
    state = {
        showLastTime: false,
        lastTime: new Date(),
        lastHours: '00',
        lastMinutes: '00',
        showNextTime: false,
        nextTime: new Date(),
        nextHours: '00',
        nextMinutes: '00'
    }

    static navigationOptions =  {
        title: "Survey Area"
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

    moveToTeamInfo = () => {
        this.props.navigation.push('TeamInfo');
    }

    render() {
        return(
            <KeyboardView style={styles.container}>
                <ScrollView style={{marginBottom:50}}>

                {/* Render the Beach Info */}
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize:20}}>Beach Info</Text>
                    <Text style={styles.inputSingle}>Beach Name</Text>
                    <Item regular>
                        <TextInput placeholder={invisiblePlaceholder} style={styles.textInput} onFocus={()=> {console.log("Presseefweg")}}></TextInput>
                    </Item>

                    <Text style={styles.inputSingle}>Coordinates (Link to GPS stuff here)</Text>
                    <Item regular>
                        <TextInput placeholder={invisiblePlaceholder} style={styles.textInput}></TextInput>
                    </Item>
                    <Text style={styles.inputSingle}>Beach Name</Text>
                    <Item regular>
                        <TextInput placeholder={invisiblePlaceholder} style={styles.textInput}></TextInput>
                    </Item>
                </View>
                <View style={styles.inputDoubleContainer}>
                    <View style={styles.inputDouble}>
                        <Text>
                            Major Usage:
                        </Text> 
                        <View style={styles.checkBox}>
                            <CheckBox style={styles.checkBoxInput} checked={false} />
                            <Text style={{marginLeft:10}}>Recreation</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox style={styles.checkBoxInput} checked={false} />
                            <Text style={{marginLeft:10}}>Commercial</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox style={styles.checkBoxInput} checked={false} />
                            <Text style={{marginLeft:10}}>Other</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput placeholder={invisiblePlaceholder} style={{height: 30}}></TextInput>
                        </Item>
                    </View>
                    <View style={styles.inputDouble}>
                        <Text>
                            Reason For Beach Choice:
                        </Text>
                        <View style={styles.checkBox}>
                            <CheckBox style={styles.checkBoxInput} checked={true} />
                            <Text  style={{marginLeft:5}}>Proximity/Convenience</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox style={styles.checkBoxInput} checked={false} />
                            <Text style={{marginLeft:10}}>Known for Debris</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox style={styles.checkBoxInput} checked={false} />
                            <Text style={{marginLeft:10}}>Other</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput placeholder={invisiblePlaceholder} style={{height: 30}}></TextInput>
                        </Item>
                    </View>
                </View>
                <View style={{marginLeft: 15, marginRight:15}}>
                    <Text style={styles.inputSingle}>Compass Direction (Degrees)</Text>
                    <Item regular>
                        <TextInput placeholder={invisiblePlaceholder} style={styles.textInput}></TextInput>
                    </Item>
                </View>

                {/* Render the Nearest River Output Section */}
                <View style={styles.segmentSeparator}></View>
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize: 20}}>Nearest River Output</Text>
                    <Text style={styles.inputSingle}>River Name</Text>
                    <Item regular>
                        <TextInput placeholder={invisiblePlaceholder} style={styles.textInput}></TextInput>
                    </Item>
                    <Text style={styles.inputSingle}>Approximate Distance</Text>
                    <Item regular>
                        <TextInput placeholder={invisiblePlaceholder} style={styles.textInput}></TextInput>
                    </Item>
                </View>

                {/* Render Tide information */}
                <View style={styles.segmentSeparator}></View>
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize: 20}}>Last Tide Before Cleanup</Text>
                    <Text style={styles.inputSingle}>Type</Text>
                    <Item regular>
                        <TextInput placeholder={invisiblePlaceholder} style={styles.textInput}></TextInput>
                    </Item>
                </View>
                <View style={[styles.inputDoubleContainer, {marginBottom: 20}]}>
                    <View style={styles.inputDouble}>
                        <Text style={styles.inputDouble}>Height (ft.)</Text>
                        <Item regular>
                            <TextInput placeholder={invisiblePlaceholder} style={styles.textInput}></TextInput>
                        </Item>
                    </View>
                    <View style={styles.inputDouble}>
                        <Text style={{marginBottom: 5}}>Time</Text>
                        <Item regular>
                            <Button onPress={this.onPressLastTime} style={{color: 'gray'}}>
                                <Icon name='clock'></Icon>
                                <Text style={{marginRight: 5}}>
                                    Select Time
                                </Text>
                            </Button>
                            <DateTimePicker
                                isVisible={this.state.showLastTime}    
                                mode={'time'}
                                onConfirm={this.setLastTime}
                                is24Hour={false}   
                                onCancel={this.onCancelLast}                   
                            />
                            <Text>{this.state.lastHours + ":" + this.state.lastMinutes}</Text>
                        </Item>
                    </View>
                </View>
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize: 20}}>Next Tide After Cleanup</Text>
                    <Text style={styles.inputSingle}>Type</Text>
                    <Item regular>
                        <TextInput placeholder={invisiblePlaceholder} style={styles.textInput}></TextInput>
                    </Item>
                </View>
                <View style={[styles.inputDoubleContainer, {marginBottom: 20}]}>
                    <View style={styles.inputDouble}>
                        <Text style={styles.inputDouble}>Height (ft.)</Text>
                        <Item regular>
                            <TextInput placeholder={invisiblePlaceholder} style={styles.textInput}></TextInput>
                        </Item>
                    </View>
                    <View style={styles.inputDouble}>
                        <Text style={{marginBottom: 5}}>Time</Text>
                        <Item regular>
                            <Button onPress={this.onPressNextTime} style={{color: 'gray'}}>
                                <Icon name='clock'></Icon>
                                <Text style={{marginRight: 5}}>Select Time</Text>
                            </Button>
                            <DateTimePicker
                                isVisible={this.state.showNextTime}    
                                mode={'time'}
                                onConfirm={this.setNextTime}
                                is24Hour={false}   
                                onCancel={this.onCancelNext}                   
                            />
                            <Text>{this.state.nextHours + ":" + this.state.nextMinutes}</Text>
                        </Item>
                    </View>
                </View>
                </ScrollView>

                {/* Render the footer used for navigation */}
                <Footer style={styles.footer}>
                    <FooterTab>
                        <Button vertical onPress={this.moveToTeamInfo}>
                            <Icon name='person' />
                            <Text>Info</Text>
                        </Button>
                        <Button active style={{color: 'skyblue'}} vertical>
                            <Icon name='navigate' />
                            <Text style={{color: 'white'}}>Area</Text>
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
            </KeyboardView>
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
    checkBox: {
        flexDirection: 'row',
        marginTop: 3
    },
    checkBoxInput: {
        marginRight:5, 
        height: 25, 
        width: 25
    },
    textInput: {
        height: 40,
        fontSize: 16
    },
    segmentSeparator: {
        padding: 15,
        marginLeft: 15,
        marginRight: 15,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'yellow',
        justifyContent: 'center'
    }
})