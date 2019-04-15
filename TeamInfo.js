import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Container, DatePicker, Icon, Item, Input, Footer, FooterTab, Button} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker'

export default class TeamInfo extends Component {
    state = {
        showTime: false,
        time: new Date(),
        hours: '00',
        minutes: '00'
    }
    static navigationOptions = {
        title: "Team information"
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
        this.props.navigation.push('Area');
    }

    render() {
        return(
            <View style={styles.container}>
                
                <View style={styles.inputSingleContainer} >
                    <Text style={styles.inputSingle}>First Name</Text>
                    <Item regular>
                        <Input></Input>
                    </Item>
                    <Text style={styles.inputSingle}>Last Name</Text>
                    <Item regular>
                        <Input></Input>
                    </Item>
                    <Text style={styles.inputSingle}>Organization Name</Text>
                    <Item regular>
                        <Input></Input>
                    </Item>
                    <Text style={styles.inputSingle}>Organization Location</Text>
                    <Item regular>
                        <Input></Input>
                    </Item>
                    
                </View>
                <View style={styles.inputDoubleContainer}>
                    <View style={styles.inputDouble}>
                        
                        <Text>Date</Text>
                        <Item regular>
                            <DatePicker 
                                
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
                                isVisible={this.state.showTime}    
                                mode={'time'}
                                onConfirm={this.setTime}
                                is24Hour={false}   
                                onCancel={this.onCancel}                   
                            />
                            <Text>{this.state.hours + ":" + this.state.minutes}</Text>
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