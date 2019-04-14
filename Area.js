import React, {Component} from 'react'
import {UIManager, Animated, TextInput, Keyboard, Dimensions, View, Text, StyleSheet} from 'react-native'
import {Item, Footer, FooterTab, Button, Icon, CheckBox} from 'native-base'

/**
 * I think that users still need to enter in this information while they're at the beach because they need
 * to be able to take down the wave height, compass direction, wind speed, and possibly coordinates when
 * they're out in the field
*/
const invisiblePlaceholder = "                                                                                                   "
const{ State: TextInputState} = TextInput;

export default class Area extends Component{
    state = {
        shift: new Animated.Value(0),
    };

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }

    /**Some magic off of stack overflow */
    handleKeyboardDidShow = (event) => {
        const {height: windowHeight} = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField();
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
            if(gap >= 0) {
                return;
            }
            Animated.timing(
                this.state.shift,
                {
                    toValue: gap,
                    duration: 100,
                    useNativeDriver: true,
                }
            ).start();
        });
    }

    handleKeyboardDidHide = () => {
        Animated.timing(
            this.state.shift,
            {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }
        ).start();
    }

    moveToTeamInfo = () => {
        this.props.navigation.push('TeamInfo');
    }

    render() {
        const {shift} = this.state;
        return(
            <Animated.View style={[styles.container, {transform: [{translateY: shift}]}]}>
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize:20}}>Beach Info</Text>
                    <Text style={styles.inputSingle}>Beach Name</Text>
                    <Item regular>
                        <TextInput placeholder={invisiblePlaceholder} style={{fontSize: 16,height:40}} onFocus={()=> {console.log("Presseefweg")}}></TextInput>
                    </Item>

                    <Text style={styles.inputSingle}>Coordinates (Link to GPS stuff here)</Text>
                    <Item regular>
                        <TextInput placeholder={invisiblePlaceholder} style={{fontSize: 16,height:40}}></TextInput>
                    </Item>
                    <Text style={styles.inputSingle}>Beach Name</Text>
                    <Item regular>
                        <TextInput placeholder={invisiblePlaceholder} style={{fontSize: 16,height:40}}></TextInput>
                    </Item>
                </View>
                <View style={styles.inputDoubleContainer}>
                    <View style={styles.inputDouble}>
                        <Text>
                            Major Usage:
                        </Text> 
                        <View style={styles.checkBox}>
                            <CheckBox style={{marginRight:5, height: 25, width: 25}} checked={false} />
                            <Text style={{marginLeft:10}}>Recreation</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox style={{marginRight:5, height: 25, width: 25}} checked={false} />
                            <Text style={{marginLeft:10}}>Commercial</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox style={{marginRight:5, height: 25, width: 25}} checked={false} />
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
                            <CheckBox style={{marginRight:5, height: 25, width: 25}} checked={true} />
                            <Text  style={{marginLeft:5}}>Proximity/Convenience</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox style={{marginRight:5, height: 25, width: 25}} checked={false} />
                            <Text style={{marginLeft:10}}>Known for Debris</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox style={{marginRight:5, height: 25, width: 25}} checked={false} />
                            <Text style={{marginLeft:10}}>Other</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput placeholder={invisiblePlaceholder} style={{height: 30}}></TextInput>
                        </Item>
                    </View>
                </View>
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
            </Animated.View>
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
    footer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'yellow',
        justifyContent: 'center'
    }
})