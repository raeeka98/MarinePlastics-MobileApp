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
        surveyData: this.props.surveyData ? this.props.surveyData : {},
        SRSData: this.props.SRSData ? this.props.SRSData : {},
        ASData: this.props.ASData ? this.props.ASData : {},
        r1Items: this.props.r1Items ? this.props.r1Items : [],
        r2Items: this.props.r2Items ? this.props.r2Items : [],
        r3Items: this.props.r3Items ? this.props.r3Items : [],
        r4Items: this.props.r4Items ? this.props.r4Items : [],
        asItems: this.props.asItems ? this.props.asItems : [],
        MicroData: this.props.MicroData ? this.props.MicroData : {},
        microRowLabels: microRowLabels
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
                            onPress={this.props.decrementMicro.bind(this, freshKey)}
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
                            onPress={this.props.incrementMicro.bind(this, freshKey)}    
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
                            onPress={this.props.decrementMicro.bind(this, weatheredKey)}
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
                            onPress={this.props.incrementMicro.bind(this, weatheredKey)}    
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
                <Header hasTabs style={{height : 75}}>
                    <Left style={{marginTop: 20}}>
                       
                    </Left>
                    <Body>
                        <Text style={{marginTop: 20, fontSize: 18, color: 'white'}}>Micro Debris</Text>
                    </Body>
                    <Right style={{marginTop: 25}}>
                        <Button success onPress={this.props.onClickFinish}>
                            <Text style={{padding: 5, color: 'white'}}>Finish</Text>
                        </Button>
                    </Right>
                </Header>
                
                <FlatList 
                    style={{marginLeft:20, marginRight:20}}
                    data={this.state.microRowLabels} 
                    extraData={this.state} 
                    renderItem={this.renderMicroRows}
                />
                
            </View>
            
        )
    }
}