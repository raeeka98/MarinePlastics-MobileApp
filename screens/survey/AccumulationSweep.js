import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'
import RibInput from './RibInput'

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
    'Other: Wood / Paper'
]

export default class AccumulationSweep extends Component {
    state = {
        surveyData: this.props.navigation.getParam('surveyData') ? this.props.navigation.getParam('surveyData') : {},
        SRSData: this.props.navigation.getParam('SRSData') ? this.props.navigation.getParam('SRSData') : {},
        ASData: this.props.navigation.getParam('ASData') ? this.props.navigation.getParam('ASData') : {},
        r1Items: this.props.navigation.getParam('r1Items') ? this.props.navigation.getParam('r1Items') : [],
        r2Items: this.props.navigation.getParam('r2Items') ? this.props.navigation.getParam('r2Items') : [],
        r3Items: this.props.navigation.getParam('r3Items') ? this.props.navigation.getParam('r3Items') : [],
        r4Items: this.props.navigation.getParam('r4Items') ? this.props.navigation.getParam('r4Items') : [],
        asItems: this.props.navigation.getParam('asItems') ? this.props.navigation.getParam('asItems') : [],
    }

    static navigationOptions = {
        title: 'Accumulation Sweep'
    }

    moveToTeamInfo = () => {
        this.props.navigation.push(
            'TeamInfo', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems
            }
        );
    }

    moveToArea = () => {
        this.props.navigation.push(
            'Area', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems
            }
        );
    }

    moveToSRS = () => {
        this.props.navigation.push(
            'SurfaceRibScan', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems
            }
        );
    }

    moveToMicro = () => {
        this.props.navigation.push(
            'MicroDebris', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems
            }
        );
    }

    decrementAS (refName, e){
        let key = refName;
        this.setState(prevState => {
            const newVal =  prevState.ASData[key] - 1;
            if(newVal === undefined)
                return prevState
            if(newVal < 0)
                return prevState
            prevState.ASData[key]--;
            return prevState;
        })
    }

    incrementAS(refName, e){
        let key = refName;
        this.setState(prevState => {
            prevState.ASData[key] = prevState.ASData[key] ?  prevState.ASData[key] + 1 : 1;
            return prevState;
        })
    }

    renderCategoryInput = ({item}) => {
        const currentItemKey = item.key;
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
                            onPress={this.decrementAS.bind(this, freshKey)}
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
                            onPress={this.incrementAS.bind(this, freshKey)}    
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
                            onPress={this.decrementAS.bind(this, weatheredKey)}
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
                            onPress={this.incrementAS.bind(this, weatheredKey)}    
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
                                    options: BUTTONS,
                                    title: "Select a Category"
                                },
                                buttonIndex => {
                                    const temp = BUTTONS;
                                    this.setState(prevState => {
                                        prevState.asItems.push(
                                            {key: temp[buttonIndex]}
                                        )
                                        BUTTONS = BUTTONS.filter((category) => category !== BUTTONS[buttonIndex])
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
                <FlatList data={this.state.asItems} extraData={this.state} renderItem={this.renderCategoryInput}/>
                <SurveyFooter 
                    as 
                    moveToTeamInfo={this.moveToTeamInfo} 
                    moveToArea={this.moveToArea}
                    moveToSRS={this.moveToSRS}
                    moveToMicro={this.moveToMicro}
                />
            </View>
        
        )
    }
}