import React, {Component} from 'react'
import {Modal, View, Text, TextInput} from 'react-native'
import {Button, Item, Icon, Picker} from 'native-base'
import styles from './surveyStyles'

/**
 * RibEntry is used to initialize a rib component when a user wants to survey a rib
 * in the beach. It takse in the rib number, start position, and length, and uses
 * those to create new rib components and add that data to the survey's SRS information
 */

export default class RibEntry extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            surveyData: this.props.surveyData,
            ribNumber: this.props.ribsToSelect[0].props.value,
            canEdit: true,
            tabArray: this.props.tabArray
        }
    }

    /**
     * Take the refName and update its information based on the input.
     * Here, we also need to distinguish when a user uses the picker to update information
     * versus when they use a simple text input
     */

    updateRibInfo(refName, e) {
        let newValue = e.nativeEvent ? e.nativeEvent.text : e;
        let key = refName
        this.setState(prevState => {
            if(!prevState.canEdit)
                prevState.canEdit = true;
            prevState[key] = newValue;
            return prevState
        })
    }

    clearInputs =()=>{
        this.setState({
            ribNumber: "",
            ribLength: "",
            ribStart: "",
            canEdit: true
        })
    }

    /**
     * Make sure that the user inputs all of the required information to create a rib. Once
     * they enter all that info, then call 'submitAddRib' to create a new rib component. Also,
     * clear the inputs to get ready for another rib input
     */

    onSubmitEdits = async () => {
        if(this.state.ribNumber === "" || this.state.ribLength === "" || this.state.ribStart === ""){
            alert("Please fill out all of the information")
            return
        }

        await this.props.submitAddRib(this.state.ribNumber, this.state.ribLength, this.state.ribStart);
        this.clearInputs();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10, padding: 10}]}>
                    <Text style={{fontSize: 20}}>Rib Number:</Text>
                    <Item regular>
                        <Picker
                            mode='dropdown'
                            iosIcon={<Icon name="arrow-down"/>}
                            placeholder="Please Select"
                            placeholderStyle={{color: 'gray'}}
                            placeholderIconColor="#007aff"
                            style={{width:100, height: 35}}
                            selectedValue={this.state.ribNumber}
                            onValueChange={this.updateRibInfo.bind(this, "ribNumber")}
                        >
                            {this.props.ribsToSelect}
                        </Picker>
                    </Item>
                </View>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10, padding: 10}]}>
                    <Text style={{fontSize: 20}}>Rib Start (meters):</Text>
                    <Item regular>
                        <TextInput
                            style={{width: 100, height: 35}}
                            keyboardType="number-pad"
                            editable={this.state.canEdit}
                            onChange={this.updateRibInfo.bind(this, "ribStart")}
                            value={this.state.ribStart}
                        />
                    </Item>
                </View>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10, padding: 10}]}>
                    <Text style={{fontSize: 20}}>Rib Length (meters):</Text>
                    <Item regular>
                        <TextInput
                            style={{width: 100, height: 35}}
                            keyboardType="number-pad"
                            editable={this.state.canEdit}
                            onChange={this.updateRibInfo.bind(this, "ribLength")}
                            value={this.state.ribLength}
                        />
                    </Item>
                </View>
                <View style={styles.inputSingleContainer}>
                    <Button
                        style={{alignSelf: 'stretch', justifyContent: 'center'}}
                        onPress={this.onSubmitEdits}
                    >
                        <Icon type='AntDesign' name='plus'/>
                        <Text style={{color: 'white'}}>Add Rib</Text>
                    </Button>
                </View>
            </View>

        )
    }
}
