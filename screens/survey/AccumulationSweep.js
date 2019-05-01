import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {Accordion, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title} from 'native-base'
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
        asItems: [
            {key: 'Cigarette Butts'},
            {key: 'Fishing Line / Polypropylene Rope'},
            {key: 'Plastic Straws'},
            {key: 'Filmed Plastic'},
            {key: 'Plastic Bottles / Plastic Caps'},
            {key: 'Aluminum Cans / Foil / Metal'},
            {key: 'Glass'},
            {key: 'Styofoam / Urethane'},
            {key: 'Other: Plastics'},
            {key: 'Other: Food / Organics'},
            {key: 'Other: Cotton / Cloth'},
            {key: 'Other: Wood / Paper'},
            
        ],
        MicroData: this.props.MicroData ? this.props.MicroData : {},
        selections: BUTTONS
    }

    renderAccordionHeader = (item, expanded) => {
        if(expanded) {
            return (
                <View 
                    style={{
                        flexDirection: "row", 
                        padding: 10,
                        justifyContent: "space-between",
                        alignItems: "center" ,
                        backgroundColor: "#87cefa" }}
                >
                    <Text style={{fontWeight: "500"}}>{" "}{item.title}</Text>
                    <Icon style={{fontSize: 18}} type="SimpleLineIcons" name="arrow-up"/>
                </View>
            )
        }
        return (
            <View 
                style={{
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center" ,
                    backgroundColor: "#6CB5FF" }} 
            >
                <Text style={{fontWeight: "400", color: 'white'}}>{" "}{item.title}</Text>
                <Icon style={{fontSize: 18, color: 'white'}}type="SimpleLineIcons" name="arrow-down"/>
            </View>
        )
    }

    renderCategoryInput = (item) => {
        const currentItemKey = debrisInfoID[item.title];
        const freshKey = `${currentItemKey}__fresh__accumulation`
        const weatheredKey = `${currentItemKey}__weathered__accumulation`
        return (
            <View style = {{padding: 15}}>
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
            </View>
        )
    }

    render() {
        const accordData = [
            {title: 'Cigarette Butts'},
            {title: 'Fishing Line / Polypropylene Rope'},
            {title: 'Plastic Straws'},
            {title: 'Filmed Plastic'},
            {title: 'Plastic Bottles / Plastic Caps'},
            {title: 'Aluminum Cans / Foil / Metal'},
            {title: 'Glass'},
            {title: 'Styofoam / Urethane'},
            {title: 'Other: Plastics'},
            {title: 'Other: Food / Organics'},
            {title: 'Other: Cotton / Cloth'},
            {title: 'Other: Wood / Paper'},
        ]
        return(
            <View style={styles.container}>
                <Header hasTabs style={{height : 75}}>
                    <Left style={{marginTop: 20}}>
                        
                    </Left>
                    <Body>
                        <Text style={{marginTop: 20, fontSize: 18, color: 'white'}}>Accumulation Sweep</Text>
                    </Body>
                    <Right style={{marginTop: 25}}>
                        <Button success>
                            <Text style={{padding: 5, color: 'white'}}>Finish</Text>
                        </Button>
                    </Right>
                </Header> 
                <Accordion 
                    dataArray={accordData} renderHeader={this.renderAccordionHeader} renderContent={this.renderCategoryInput}
                />
            </View>
        
        )
    }
}