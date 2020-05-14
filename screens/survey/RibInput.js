import React, { Component } from 'react'
import {TextInput, Text, View, ScrollView } from 'react-native'
import {
  Item,
  Button,
  Icon,
  Accordion,
  Card,
  CardItem,
  Left,
  Right
} from 'native-base'
import Modal from 'react-native-modal'

import styles from './surveyStyles'
import SurveyItemHeader from '../../components/SurveyItemHeader'
import debrisInfoID from './debrisInfo'

/* These are used to display the options on the modal */
var BUTTONS = [
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


export default class RibInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            SRSData: this.props.SRSData,
            surveyData: this.props.surveyData,
            ribData: this.props.ribData,
            ribNumber: this.props.ribNumber,
            inputItems: [
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
            ],
            selections: BUTTONS,
            isModalVisible: false,
            editLength: "",
            editStart: ""
        }
    }

    /**
     * Show the modal for editing the rib information
     */

    showModal = () => {
        this.setState({isModalVisible: true})
    }

    cancelModal = () => {
        this.setState(
            {
                isModalVisible: false,
                editLength: "",
                editStart: ""
            }
        )
    }

    /**
     * Save the new rib start and rib length information
     * NEED TO ADD A DELETE MODAL!!
     */

    saveModal(ribStart, ribLength){
        this.setState(prevState => {
            prevState.isModalVisible = false;
            prevState.ribData[ribStart] = prevState.editStart !== '' ? prevState.editStart : prevState.ribData[ribStart];
            prevState.ribData[ribLength] = prevState.editLength !== '' ? prevState.editLength : prevState.ribData[ribLength];
            prevState.editLength = '';
            prevState.editStart = ''
            return prevState
        })
    }
    onEditChange(refName, e){
        let key = refName;
        let val = e.nativeEvent.text
        this.setState(prevState => {
            prevState[key] = val;
            return prevState
        })
    }

    /*
     * We need to be able to render each category input individually within a FlatList of items (which dynamically
     *  re-renders). Each category will have some 'tally' system where users can increment and decrement
     *  the values. Additionally, the values will fall under some subcategories, including either
     *  "fresh" or 'weathered'
     */
    /*
        need to add a button to delete a rib around line 240
    */
    renderCategoryInput = (item) => {
        const currentItemKey = debrisInfoID[item.title];
        const freshKey = `${currentItemKey}__fresh__${this.state.ribNumber}`
        const weatheredKey = `${currentItemKey}__weathered__${this.state.ribNumber}`
        return (
            <View style = {{padding:10, width: '99%', alignSelf: 'center', backgroundColor: '#ffffff'}}>
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
            </View>
        )
    }


    renderAccordionHeader = (item, expanded) => <SurveyItemHeader title={item.title} expanded={expanded}/>;

    render() {
        const ribStart = `r${this.state.ribNumber}Start`;
        const ribLength = `r${this.state.ribNumber}Length`
        return (
            <ScrollView style={{marginBottom: 50, backgroundColor: '#e4eaff', flex: 1}}>
                <View style={
                        [
                            styles.inputDoubleContainer,
                            {
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                marginTop: 15
                            }
                        ]
                      }
                >
                    <Text style={{fontSize: 17}}>Rib Start:</Text>
                    <Text style={{fontSize: 17}}>{this.state.ribData[ribStart]}</Text>
                    <Text style={{fontSize: 17}}>Rib Length:</Text>
                    <Text style={{fontSize: 17}}>{this.state.ribData[ribLength]}</Text>
                    <Button onPress={this.showModal}>
                        <Text style={{padding: 8, color: 'white'}}>Edit Rib Info</Text>
                    </Button>
                </View>
                <Accordion
                    style={{marginTop: 20, padding: 10}}
                    dataArray={this.state.inputItems}
                    renderContent={this.renderCategoryInput}
                    renderHeader={this.renderAccordionHeader}
                />
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{alignSelf: 'center', width: '90%', height: 250, backgroundColor: 'white'}} >
                        <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Edit rib information</Text>
                        <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 20}]}>
                            <Text style={{marginLeft: 10, fontSize: 18}}>New Rib Start:</Text>
                            <Item regular style={{marginRight: 10}}>
                                <TextInput
                                    style={{width: 50, height: 35, fontSize: 18}}
                                    keyboardType="number-pad"
                                    onChange={this.onEditChange.bind(this, 'editStart')}
                                    value={this.state.editStart}
                                />
                            </Item>
                        </View>
                        <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 30}]}>
                            <Text style={{marginLeft: 10, fontSize: 18}}>New Rib Length:</Text>
                            <Item regular style={{marginRight: 10}}>
                                <TextInput
                                    style={{width: 50, height: 35, fontSize: 18}}
                                    keyboardType="number-pad"
                                    onChange={this.onEditChange.bind(this, 'editLength')}
                                    value={this.state.editLength}
                                />
                            </Item>
                        </View>
                        <View style={[styles.inputDoubleContainer, {justifyContent: 'space-evenly'}]}>
                            <Button light style={{justifyContent: 'center',width: 100}}onPress={this.cancelModal}>
                                <Text style={{padding: 8}}>Cancel</Text>
                            </Button>
                            <Button info style={{justifyContent: 'center', width: 100}}onPress={this.saveModal.bind(this, ribStart, ribLength)}>
                                <Text style={{color: 'white', padding: 8}}>Save</Text>
                            </Button>  
                        </View>

                    </View>
                </Modal>
            </ScrollView>
        )
    }
}
