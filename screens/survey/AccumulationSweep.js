import React, { Component } from 'react'

import {
  TextInput,
  Text,
  View
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
            <View style = {{padding: 10, backgroundColor: 'white'}}>
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
            <View style={[{flex: 1, backgroundColor: '#e4eaff', marginBottom: 60}]}>
                <Header hasTabs style={headerStyles.header}>
                    <Left style={headerStyles.headerContents}>
                        <Button transparent onPress={this.props.openBackModal}>
                            <Icon type="AntDesign" name='close'/>
                        </Button>
                    </Left>
                    <Body style={headerStyles.headerContents}>
                        <Text style={{fontSize: 18, color: 'white'}}>Accumulation Sweep</Text>
                    </Body>
                    <Right style={headerStyles.headerContents}>
                        <Button success onPress={this.props.onClickFinish}>
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
