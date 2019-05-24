import React, { Component } from 'react'
import {TextInput, Text, View, ScrollView } from 'react-native'
import {Item, Button, Icon, Accordion} from 'native-base'
import Modal from 'react-native-modal'

import styles from './surveyStyles'
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


export default class RibInput extends Component {
    state = {
        SRSData: this.props.SRSData,
        surveyData: this.props.surveyData,
        ribData: this.props.ribData,
        ribNumber: this.props.ribNumber,
        inputItems: [
            {title: "Cigarette Butts"},
            {title: 'Fishing Line / Polypropylene Rope'},
            {title: 'Plastic Straws'},
            {title: 'Filmed Plastic'},
            {title: 'Plastic Bottles / Plastic Caps'},
            {title: 'Aluminum Cans / Foil / Metal'},
            {title: "Glass"},
            {title: 'Styofoam / Urethane'},
            {title: "Other: Plastics"},
            {title: "Other: Food / Organics"},
            {title: "Other: Cotton / Cloth"},
            {title: "Other: Wood / Paper"},

        ],
        selections: BUTTONS,
        isModalVisible: false,
        editLength: "",
        editStart: ""
    }

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
    renderCategoryInput = (item) => {
        const currentItemKey = debrisInfoID[item.title];
        const freshKey = `${currentItemKey}__fresh__${this.state.ribNumber}`
        const weatheredKey = `${currentItemKey}__weathered__${this.state.ribNumber}`
        return (
            <View style = {{padding:10}}>
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
                    backgroundColor: "#1a8cff" }} 
            >
                <Text style={{fontWeight: "400", color: 'white'}}>{" "}{item.title}</Text>
                <Icon style={{fontSize: 18, color: 'white'}}type="SimpleLineIcons" name="arrow-down"/>
            </View>
        )
    }

    render() {
        const ribStart = `r${this.state.ribNumber}Start`;
        const ribLength = `r${this.state.ribNumber}Length`
        return (
            <ScrollView style={{marginBottom: 50}}>
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