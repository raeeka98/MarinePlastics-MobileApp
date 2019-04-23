import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'
import debrisInfoID from './debrisInfo'

/* These are used to display the options on the modal */
var BUTTONS = [
    'Cigarette Butts', 
    'Fishing Line / Polypropylene Rope', 
    'Plastic Straws',
    'Filmed Plastic',
    'Plastic Bottles / Plastic Caps',
    'Aluminum Cans / Foil / Metal',
    'Glass',
    'Styofoam / Urethane',
    'Other: Plastics',
    'Other: Food / Organics',
    'Other: Cotton / Cloth',
    'Other: Wood / Paper',
    'Cancel'
]

var CANCEL_INDEX = 12;


export default class RibInput extends Component {
    state = {
        SRSData: this.props.SRSData,
        surveyData: this.props.surveyData,
        ribNumber: this.props.ribNumber,
        inputItems: this.props.inputItems,
        selections: BUTTONS
    }

    /*
     * We need to be able to render each category input individually within a FlatList of items (which dynamically
     *  re-renders). Each category will have some 'tally' system where users can increment and decrement
     *  the values. Additionally, the values will fall under some subcategories, including either
     *  "fresh" or 'weathered'
     */
    renderCategoryInput = ({item}) => {
        const currentItemKey = debrisInfoID[item.key];
        const freshKey = `${currentItemKey}__fresh__${this.state.ribNumber}`
        const weatheredKey = `${currentItemKey}__weathered__${this.state.ribNumber}`
        return (
            <View style = {{marginBottom: 15}}>
                <Text style={{fontSize: 19}}>{item.key}</Text>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                    <Text style={{fontSize: 18, alignSelf: 'center', justifyContent: 'center'}}>Amount Fresh:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Button 
                            light 
                            onPress={this.props.decrementSRS.bind(this, freshKey)}
                        >
                            <Icon type='AntDesign' name='minus'/>
                        </Button>
                        <Item regular>
                            <TextInput 
                                editable={false} 
                                style={{width : 50, height: 35, textAlign: 'center',fontSize: 18}} 
                                value={this.state.SRSData[freshKey] ? this.state.SRSData[freshKey] + '' : '0'}
                            />
                        </Item>
                        <Button 
                            light
                            onPress={this.props.incrementSRS.bind(this, freshKey)}    
                        >
                            <Icon type='AntDesign' name='plus'/>
                        </Button>
                    </View>
                    
                </View>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                    <Text style={{fontSize: 18, alignSelf: 'center', justifyContent: 'center'}}>Amount Weathered:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Button 
                            light 
                            onPress={this.props.decrementSRS.bind(this, weatheredKey)}
                        >
                            <Icon type='AntDesign' name='minus'/>
                        </Button>
                        <Item regular>
                            <TextInput 
                                editable={false} 
                                style={{width : 50, height: 35, textAlign: 'center',fontSize: 18}} 
                                value={this.state.SRSData[weatheredKey] ? this.state.SRSData[weatheredKey] + '' : '0'}
                            />
                        </Item>
                        <Button 
                            light
                            onPress={this.props.incrementSRS.bind(this, weatheredKey)}    
                        >
                            <Icon type='AntDesign' name='plus'/>
                        </Button>
                    </View>
                </View>
                <View style={styles.segmentSeparator}/>
            </View>
        )
    }

    render() {
        const ribStart = `rib${this.state.ribNumber}Start`;
        const ribLength = `rib${this.state.ribNumber}Length`
        return (
            <View>
                <View style={[{marginTop: 10, marginRight: 10, marginLeft: 10}, styles.inputSingleContainer]}>
                    <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                        <Text style={{fontSize: 20}}>Rib Start:</Text>
                        <Item regular>
                            <TextInput 
                                style={{width: 100, height: 35}}
                                onChange={this.props.updateSurveyState.bind(this, ribStart)}
                                value={this.state.surveyData[ribStart]}
                            />
                        </Item>
                    </View>
                    <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                        <Text style={{fontSize: 20}}>Rib Length:</Text>
                        <Item regular>
                            <TextInput 
                                style={{width: 100, height: 35}}
                                onChange={this.props.updateSurveyState.bind(this, ribLength)}
                                value={this.state.surveyData[ribLength]}
                            />
                        </Item>
                    </View>
                </View>
                <View style={styles.segmentSeparator}/>
                <View style={[styles.inputSingleContainer]}>
                    <Button 
                        info 
                        style={{alignSelf: 'stretch', justifyContent: 'center'}}
                        onPress={() => {
                            ActionSheet.show(
                                {
                                    options: this.state.selections,
                                    title: "Select a Category",
                                    cancelButtonIndex: CANCEL_INDEX
                                },
                                buttonIndex => {
                                    /* Here we need to add the selected item to the list of input items
                                       and remove it from the list of button selections
                                    */
                                    const temp = this.state.selections;
                                    if(temp[buttonIndex]==='Cancel'){
                                        ActionSheet.hide();
                                        return
                                    }
                                    this.setState(prevState => {
                                        prevState.inputItems.push(
                                            {key: temp[buttonIndex]}
                                        )
                                        prevState.selections = prevState.selections.filter((category) => category !== BUTTONS[buttonIndex])
                                        return prevState
                                    })

                                    
                                }
                            )
                        }}
                    >
                        <Icon type='AntDesign' name='plus'/>
                        <Text style={{color: 'white'}}>Add Category</Text>
                    </Button>
                    
                </View>
                <FlatList 
                    style={{marginLeft:20, marginRight:20}} 
                    data={this.state.inputItems} 
                    extraData={this.state} 
                    renderItem={this.renderCategoryInput}
                />
            </View>
        )
    }
}