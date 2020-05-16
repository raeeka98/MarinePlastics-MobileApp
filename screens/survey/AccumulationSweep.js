import React, { Component } from 'react'

import CheckBox from 'react-native-check-box'

import {
  TextInput, View, Text, ScrollView
} from 'react-native'

import {
  Accordion,
  Item,
  Button,
  Icon,
  Header,
  Left,
  Body,
  Right,
  Card,
  CardItem
} from 'native-base'

import styles from './surveyStyles'
import debrisInfoID from './debrisInfo'
import SurveyItemHeader from '../../components/SurveyItemHeader'
import headerStyles from '../../components/headerStyles';

const invisiblePlaceholder = "                                                                                                   "

var BUTTONS = [
    'Incomplete Survey',
    'Cigarette Butts',
    'Fishing Line / Polypropylene Rope',
    'Plastic Cups',
    'Plastic Straws',
    'Filmed Plastic',
    'Misc. Plastic',
    'Plastic Bottles / Plastic Caps',
    'Styrofoam',
    'Food / Organics',
    'Urethane Foam',
    'Metal',
    'Glass',
    'Cotton / Cloth',
    'Aluminum Cans',
    'Hygiene Items',
    'Tile / Brick',
    'Wood / Paper',
    'Cancel'
]

/**
 * This has the same logic as a single input rib for a the SurfaceRibScan section
 */

export default class AccumulationSweep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyData: this.props.surveyData ? this.props.surveyData : {},
            SRSData: this.props.SRSData ? this.props.SRSData : {},
            ASData: this.props.ASData ? this.props.ASData : {},
            asItems: [
                {key: 'Cigarette Butts'},
                {key: 'Fishing Line / Polypropylene Rope'},
                {key: 'Plastic Cups'},
                {key: 'Plastic Straws'},
                {key: 'Filmed Plastic'},
                {key: 'Misc. Plastic'},
                {key: 'Plastic Bottles / Plastic Caps'},
                {key: 'Styrofoam'},
                {key: 'Food / Organics'},
                {key: 'Urethane Foam'},
                {key: 'Metal'},
                {key: 'Glass'},
                {key: 'Cotton / Cloth'},
                {key: 'Aluminum Cans'},
                {key: 'Hygiene Items'},
                {key: 'Tile / Brick'},
                {key: 'Wood / Paper'},

            ],
            MicroData: this.props.MicroData ? this.props.MicroData : {},
            ribData: this.props.ribData ? this.props.ribData : {},
            selections: BUTTONS
        }
    }

    renderAccordionHeader = (item, expanded) => <SurveyItemHeader title={item.title} expanded={expanded}/>

    renderCategoryInput = (item) => {
        const currentItemKey = debrisInfoID[item.title];
        const freshKey = `${currentItemKey}__fresh__accumulation`
        const weatheredKey = `${currentItemKey}__weathered__accumulation`
        return (
            <View style = {{padding:10, width: '99%', alignSelf: 'center', backgroundColor: '#ffffff'}}>
                <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                    <Text style={{fontSize: 18, alignSelf: 'center', justifyContent: 'center'}}>Fresh:</Text>
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
                    <Text style={{fontSize: 18, alignSelf: 'center', justifyContent: 'center'}}>Weathered:</Text>
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
            {title: 'Plastic Cups'},
            {title: 'Plastic Straws'},
            {title: 'Filmed Plastic'},
            {title: 'Misc. Plastic'},
            {title: 'Plastic Bottles / Plastic Caps'},
            {title: 'Styrofoam'},
            {title: 'Food / Organics'},
            {title: 'Urethane Foam'},
            {title: 'Metal'},
            {title: 'Glass'},
            {title: 'Cotton / Cloth'},
            {title: 'Aluminum Cans'},
            {title: 'Hygiene Items'},
            {title: 'Tile / Brick'},
            {title: 'Wood / Paper'},
        ]
        return(
            <View style={[{flex: 1, backgroundColor: '#e4eaff', marginBottom: 60}]}>
                <Header hasTabs style={headerStyles.header}>
                    <Left style={headerStyles.headerContents}>
                        <Button transparent onPress={this.props.openBackModal}>
                            <Icon type="AntDesign" name='close'/>
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{fontSize: 18, color: 'white'}}>Accumulation Sweep</Text>
                    </Body>
                    <Right style={headerStyles.headerContents}>
                        <Button success onPress={this.props.onClickFinish}>
                            <Text style={{padding: 5, color: 'white'}}>Finish</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.inputSingleContainer}>
                    <View style={[styles.inputSingle, (this.props.invalidFields.includes('incompleteSurvey') ? 
                                    {borderColor: 'red', borderWidth: 2} : {})]} >
                        <Text>
                             If unable to complete an accumulation survey, {"\n"} 
                             check box as to why:
                        </Text> 
                        <View style={styles.checkBox} >
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.incompleteSurveyTime} 
                                onClick={this.props.checkedbox.bind(this, 'incompleteSurveyTime')} 
                            />
                            <Text style={{marginLeft:5}}>Not enough time</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.incompleteSurveyPeople} 
                                onClick={this.props.checkedbox.bind(this, 'incompleteSurveyPeople')} 
                            />
                            <Text style={{marginLeft:5}}>Not enough people</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.incompleteSurveyArea} 
                                onClick={this.props.checkedbox.bind(this, 'incompleteSurveyArea')} 
                            />
                            <Text style={{marginLeft:5}}>Too much area</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.incompleteSurveyTrash} 
                                onClick={this.props.checkedbox.bind(this, 'incompleteSurveyTrash')} 
                            />
                            <Text style={{marginLeft:5}}>Too much trash</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                isChecked={this.state.surveyData.isotherChecked} 
                                onClick={this.props.checkedbox.bind(this, 'isotherChecked')} 
                            />
                            <Text style={{marginLeft:5}}>Other:</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput 
                                editable={this.state.surveyData.isotherChecked === true} 
                                placeholder={invisiblePlaceholder} 
                                style={{height: 30}}
                                onChange={this.props.updateSurveyState.bind(this, 'incompleteSurveyOther')}
                                value={this.state.surveyData.incompleteSurveyOther}
                            />
                        </Item>
                    </View>
                </View>
                  <Accordion
                      dataArray={accordData} renderHeader={this.renderAccordionHeader} renderContent={this.renderCategoryInput}
                  />
            </View>

        )
    }
}
