import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'
import RibInput from './RibInput'
import debrisInfoID from './debrisInfo'

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

export default class AccumulationSweep extends Component {
    state = {
        surveyData: this.props.surveyData ? this.props.surveyData : {},
        SRSData: this.props.SRSData ? this.props.SRSData : {},
        ASData: this.props.ASData ? this.props.ASData : {},
        r1Items: this.props.r1Items ? this.props.r1Items : [],
        r2Items: this.props.r2Items ? this.props.r2Items : [],
        r3Items: this.props.r3Items ? this.props.r3Items : [],
        r4Items: this.props.r4Items ? this.props.r4Items : [],
        asItems: this.props.asItems ? this.props.asItems : [],
        MicroData: this.props.MicroData ? this.props.MicroData : {},
        selections: BUTTONS
    }


    renderCategoryInput = ({item}) => {
        const currentItemKey = debrisInfoID[item.key];
        const freshKey = `${currentItemKey}__fresh__accumulation`
        const weatheredKey = `${currentItemKey}__weathered__accumulation`
        return (
            <View style = {{marginBottom: 15}}>
                <Text style={{fontSize: 19}}>{item.key}</Text>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                    <Text style={{fontSize: 18, alignSelf: 'center', justifyContent: 'center'}}>Amount Fresh:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Button 
                            light 
                            onPress={this.props.decrementAS.bind(this, freshKey)}
                        >
                            <Icon type='AntDesign' name='minus'/>
                        </Button>
                        <Item regular>
                            <TextInput 
                                editable={false} 
                                style={{width : 50, height: 35, textAlign: 'center',fontSize: 18}} 
                                value={this.state.ASData[freshKey] ? this.state.ASData[freshKey] + '' : '0'}
                            />
                        </Item>
                        <Button 
                            light
                            onPress={this.props.incrementAS.bind(this, freshKey)}    
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
                            onPress={this.props.decrementAS.bind(this, weatheredKey)}
                        >
                            <Icon type='AntDesign' name='minus'/>
                        </Button>
                        <Item regular>
                            <TextInput 
                                editable={false} 
                                style={{width : 50, height: 35, textAlign: 'center',fontSize: 18}} 
                                value={this.state.ASData[weatheredKey] ? this.state.ASData[weatheredKey] + '' : '0'}
                            />
                        </Item>
                        <Button 
                            light
                            onPress={this.props.incrementAS.bind(this, weatheredKey)}    
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
        return(
            <View style={styles.container}>
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
                                    const temp = this.state.selections;
                                    if(temp[buttonIndex] === 'Cancel'){
                                        ActionSheet.hide()
                                        return;
                                    }
                                    this.setState(prevState => {
                                        prevState.asItems.push(
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
                    data={this.state.asItems} 
                    extraData={this.state} 
                    renderItem={this.renderCategoryInput}
                />
            </View>
        
        )
    }
}