import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'
import RibInput from './RibInput'

const microRowLabels = [
    {key: 'Rib 1'}, 
    {key: 'Rib 2'},
    {key: 'Rib 3'},
    {key: 'Rib 4'}
]

const microRowIDs = {
    'Rib 1' : 'rib1',
    'Rib 2' : 'rib2',
    'Rib 3' : 'rib3',
    'Rib 4' : 'rib4'
}

export default class MicroDebris extends Component {
    state = {
        surveyData: this.props.navigation.getParam('surveyData') ? this.props.navigation.getParam('surveyData') : {},
        SRSData: this.props.navigation.getParam('SRSData') ? this.props.navigation.getParam('SRSData') : {},
        ASData: this.props.navigation.getParam('ASData') ? this.props.navigation.getParam('ASData') : {},
        r1Items: this.props.navigation.getParam('r1Items') ? this.props.navigation.getParam('r1Items') : [],
        r2Items: this.props.navigation.getParam('r2Items') ? this.props.navigation.getParam('r2Items') : [],
        r3Items: this.props.navigation.getParam('r3Items') ? this.props.navigation.getParam('r3Items') : [],
        r4Items: this.props.navigation.getParam('r4Items') ? this.props.navigation.getParam('r4Items') : [],
        asItems: this.props.navigation.getParam('asItems') ? this.props.navigation.getParam('asItems') : [],
        MicroData: this.props.navigation.getParam('MicroData') ? this.props.navigation.getParam('MicroData') : {},
        microRowLabels: microRowLabels
    }

    static navigationOptions = {
        title: 'Micro Debris'
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
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
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
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
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
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
            }
        );
    }

    moveToAS = () => {
        this.props.navigation.push(
            'AccumulationSweep', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
            }
        );
    }

    decrementMicro (refName, e){
        let key = refName;
        this.setState(prevState => {
            const newVal =  prevState.MicroData[key] - 1;
            if(newVal === undefined)
                return prevState
            if(newVal < 0)
                return prevState
            prevState.MicroData[key]--; 
            return prevState;
        })
    }

    incrementMicro(refName, e){
        let key = refName;
        this.setState(prevState => {
            prevState.MicroData[key] = prevState.MicroData[key] ?  prevState.MicroData[key] + 1 : 1;
            return prevState;
        })
    }

    renderMicroRows = ({item}) => {
        const currentItemKey = microRowIDs[item.key];
        const freshKey = `${currentItemKey}__fresh__micro`
        const weatheredKey = `${currentItemKey}__weathered__micro`
        return (
            <View style = {{marginBottom: 15}}>
                <Text style={{fontSize: 19}}>{item.key}</Text>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                    <Text style={{fontSize: 18, alignSelf: 'center', justifyContent: 'center'}}>Amount Fresh:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Button 
                            light 
                            onPress={this.decrementMicro.bind(this, freshKey)}
                        >
                            <Icon type='AntDesign' name='minus'/>
                        </Button>
                        <Item regular>
                            <TextInput 
                                editable={false} 
                                style={{width : 50, height: 35, textAlign: 'center',fontSize: 18}} 
                                value={this.state.MicroData[freshKey] ? this.state.MicroData[freshKey] + '' : '0'}
                            />
                        </Item>
                        <Button 
                            light
                            onPress={this.incrementMicro.bind(this, freshKey)}    
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
                            onPress={this.decrementMicro.bind(this, weatheredKey)}
                        >
                            <Icon type='AntDesign' name='minus'/>
                        </Button>
                        <Item regular>
                            <TextInput 
                                editable={false} 
                                style={{width : 50, height: 35, textAlign: 'center',fontSize: 18}} 
                                value={this.state.MicroData[weatheredKey] ? this.state.MicroData[weatheredKey] + '' : '0'}
                            />
                        </Item>
                        <Button 
                            light
                            onPress={this.incrementMicro.bind(this, weatheredKey)}    
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
                <FlatList 
                    style={{marginLeft:20, marginRight:20}}
                    data={this.state.microRowLabels} 
                    extraData={this.state} 
                    renderItem={this.renderMicroRows}
                />
                <SurveyFooter 
                    micro 
                    moveToTeamInfo={this.moveToTeamInfo} 
                    moveToArea={this.moveToArea}
                    moveToSRS={this.moveToSRS}
                    moveToAS={this.moveToAS}
                />
            </View>
            
        )
    }
}