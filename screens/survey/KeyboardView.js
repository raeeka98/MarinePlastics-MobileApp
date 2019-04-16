import React, { Component } from 'react'
import { Animated, UIManager, TextInput, Dimensions, StyleSheet, Text, Keyboard} from 'react-native'

const {State: TextInputState} = TextInput;

export default class KeyboardView extends Component {
    state={
        shift: new Animated.Value(0),
    }

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
                    toValue: gap - 5,
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

    render() {
        const {shift} = this.state;
        return (
            <Animated.View style={{transform: [{translateY: shift}]}}>
                {this.props.children}
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})