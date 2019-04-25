import React, {Component} from 'react'
import {Modal, View, Text, TextInput} from 'react-native'
import {Button, Item, Icon } from 'native-base'
import styles from './surveyStyles'


export default class RibEntry extends Component {
    state={
        modalVisible: false,
        surveyData: this.props.surveyData,
        ribNumber: "",
        canEdit: false,
        tabArray: this.props.tabArray
    }

    updateRibNumber(e) {
        let ribNumber = e.nativeEvent.text;
        this.setState({
            ribNumber: ribNumber,
            canEdit: true
        })
    }

    render() {
        console.log("Render Render")
        return (
            <View style={styles.container}>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10, padding: 10}]}>
                    <Text style={{fontSize: 20}}>Rib Number:</Text>
                    <Item regular>
                        <TextInput 
                            style={{width: 100, height: 35}}
                            onChange={this.updateRibNumber.bind(this)}
                            value={this.state.ribNumber}
                        />
                    </Item>
                </View>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10, padding: 10}]}>
                    <Text style={{fontSize: 20}}>Rib Start:</Text>
                    <Item regular>
                        <TextInput 
                            style={{width: 100, height: 35}}
                            editable={this.state.canEdit}
                            onChange={this.props.updateSurveyState.bind(this, "ribStart")}
                            value={this.state.ribStart}
                        />
                    </Item>
                </View>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10, padding: 10}]}>
                    <Text style={{fontSize: 20}}>Rib Length:</Text>
                    <Item regular>
                        <TextInput 
                            style={{width: 100, height: 35}}
                            editable={this.state.canEdit}
                            onChange={this.props.updateSurveyState.bind(this, "ribLength")}
                            value={this.state.ribLength}
                        />
                    </Item>
                </View>
                <View style={styles.inputSingleContainer}>
                    <Button
                        info
                        style={{alignSelf: 'stretch', justifyContent: 'center'}}
                        onPress={this.props.renderTabs}
                    >
                        <Icon type='AntDesign' name='plus'/>
                        <Text style={{color: 'white'}}>Add Rib</Text>
                    </Button>
                </View>
            </View>
            
        )
    }
}