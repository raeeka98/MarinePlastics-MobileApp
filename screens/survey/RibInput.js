import React, { Component } from 'react'
import {TextInput, Text, View, ScrollView } from 'react-native'
import {Item, Button, Icon, Accordion} from 'native-base'
import Modal from 'react-native-modal'
import QRCode from 'react-native-qrcode';

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
                            <Icon type='AntDesign' name='minus' />
                        </Button>
                        <Item regular>
                            <TextInput
                                editable={false}
                                style={{ width: 50, height: 35, textAlign: 'center', fontSize: 18 }}
                                value={this.state.SRSData[freshKey] ? this.state.SRSData[freshKey] + '' : '0'}
                            />
                        </Item>
                        <Button
                            light
                            onPress={this.props.incrementSRS.bind(this, freshKey)}
                        >
                            <Icon type='AntDesign' name='plus' />
                        </Button>
                    </View>

                </View>
                <View style={[styles.inputDoubleContainer, { justifyContent: 'space-between', marginBottom: 10 }]}>
                    <Text style={{ fontSize: 18, alignSelf: 'center', justifyContent: 'center' }}>Amount Weathered:</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            light
                            onPress={this.props.decrementSRS.bind(this, weatheredKey)}
                        >
                            <Icon type='AntDesign' name='minus' />
                        </Button>
                        <Item regular>
                            <TextInput
                                editable={false}
                                style={{ width: 50, height: 35, textAlign: 'center', fontSize: 18 }}
                                value={this.state.SRSData[weatheredKey] ? this.state.SRSData[weatheredKey] + '' : '0'}
                            />
                        </Item>
                        <Button
                            light
                            onPress={this.props.incrementSRS.bind(this, weatheredKey)}
                        >
                            <Icon type='AntDesign' name='plus' />
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
                    backgroundColor: "#6CB5FF" }} 
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
                    <Button info onPress={this.showModal}>
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


    // Encode the text entry box data into a string of printable characters recognizable for a QR code
    // Takes the rib start, rib length, fresh and weathered values. 
    // Converts these to 8-bit binary and adds them to a binary string (binstring)
    // The binToEncoded then translates this to a string using ascii values in the range 48-112
    encodeToText = () => {
        var binstring = "";
        var ribStart = this.state.surveyData[`rib${this.state.ribNumber}Start`];
        var ribLength = this.state.surveyData[`rib${this.state.ribNumber}Length`];

        //Encode ribStart
        if (ribStart === undefined) ribStart = 0;
        binstring += ("00000000" + (Number(ribStart).toString(2))).slice(-8);
        //Encode ribLength
        if (ribLength === undefined) ribLength = 0;
        binstring += ("00000000" + (Number(ribLength).toString(2))).slice(-8);

        //Encode fresh and weathered for each category
        for (var key in debrisInfoID) {
            var fresh = this.state.SRSData[`${debrisInfoID[key]}__fresh__${this.state.ribNumber}`];
            var weathered = this.state.SRSData[`${debrisInfoID[key]}__weathered__${this.state.ribNumber}`];

            //encode fresh and weathered debris to binary and add to the binary string
            if (fresh === undefined) fresh = 0;
            binstring += ("00000000" + Number(fresh).toString(2)).slice(-8);
            if (weathered === undefined) weathered = 0;
            binstring += ("00000000" + Number(weathered).toString(2)).slice(-8);
        }
        var encoded = this.binToEncoded(binstring);
        var decoded = this.decodeText(encoded);
        return encoded;
    }

    // Binary to Encoded (using an encoding style similar to base64)
    // This method takes a binary string and encodes it into printable ascii chars
    // It does this by popping the six front-most bits and mapping the decimal value of this into the range
    // of 48-112, which are all printable ascii value. If the binstring is not divisible by 6
    // the remainder will be encoded after a ! in plain binary (min of 2 max of 6 extra chars)
    binToEncoded(binstring) {
        var encoded = "";
        while (binstring.length >= 6) {
            var substr = binstring.substr(0, 6);
            binstring = binstring.substr(6);
            var dec = parseInt(substr, 2);
            var charrep = String.fromCharCode(48 + dec);
            encoded += charrep;
        }
        if (binstring.length != 0) {
            encoded += '!';
            encoded += binstring;
        }
        return encoded;
    }

    decodeText(encoded) {
        var binstring = this.encodedToBin(encoded);
        var decoded = "";
        while (binstring.length >= 8) {
            var substr = binstring.substr(0, 8);
            binstring = binstring.substr(8);
            var dec = parseInt(substr, 2);
            decoded += dec;
        }
        return decoded;
    }

    encodedToBin(encoded) {
        var binstring = "";
        for (var i = 0; i < encoded.length; i++) {
            if (encoded.charAt(i) !== "!") {
                var dec = encoded.charCodeAt(i) - 48;
                binstring += ("000000" + (Number(dec).toString(2))).slice(-6);
            }
            else{
                binstring += encoded.substr(i+1);
                i = encoded.length;
            }
        }
        return binstring;

    }
}