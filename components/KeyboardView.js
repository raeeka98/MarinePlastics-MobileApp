import React, { Component } from 'react'
import { Animated, UIManager, TextInput, Dimensions, StyleSheet, Keyboard} from 'react-native'

const {State: TextInputState} = TextInput;

export default class KeyboardView extends Component {
    constructor(props){
        super(props);
        this.state={
            shift: new Animated.Value(0),
        }
    }

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }

    /**
     * Here, we need to handle some screen movements for when the keyboard pops up on the screen.
     * We take the window height and the position of the currently focused text input box. If we
     * find that the box is gonna get covered by the  keyboard (ie the gap < 0), then we need to shift 
     * the view up to reveal the keyboard
     */
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
                    toValue: gap - 5,
                    duration: 100,
                    useNativeDriver: true,
                }
            ).start();
        });
    }

    /**
     * When the keyboard gets closed, shift the view back down
     */
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

    render() {
        const {shift} = this.state;
        return (
            <Animated.View style={{transform: [{translateY: shift}]}}>
                {this.props.children}
            </Animated.View>
        )
    }
}
