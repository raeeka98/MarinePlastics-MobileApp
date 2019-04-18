import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, List} from 'native-base'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'

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
var DESTRUCTIVE_INDEX = 12;
var CANCEL_INDEX = 13;

export default class SurfaceRibScan extends Component {
    state = {
        surveyData: {},
        inputItems: []
    }

    moveToTeamInfo = () => {
        this.props.navigation.push('TeamInfo', {surveyData: this.state.surveyData});
    }

    moveToArea = () => {
        this.props.navigation.push('Area', {surveyData: this.state.surveyData});
    }

    static navigationOptions = {
        title : "Surface Rib Scan"
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={[{marginTop: 40, marginRight: 10, marginLeft: 10}, styles.inputSingleContainer]}>
                    <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                        <Text style={{fontSize: 20}}>Rib Number:</Text>
                        <Item regular>
                            <TextInput style={{width: 100, height: 35}}/>
                        </Item>
                    </View>
                    <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                        <Text style={{fontSize: 20}}>Rib Start:</Text>
                        <Item regular>
                            <TextInput style={{width: 100, height: 35}}/>
                        </Item>
                    </View>
                    <View style={[styles.inputDoubleContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
                        <Text style={{fontSize: 20}}>Rib Length:</Text>
                        <Item regular>
                            <TextInput style={{width: 100, height: 35}}/>
                        </Item>
                    </View>
                </View>
                <View style={styles.segmentSeparator}/>
                <View style={[styles.inputSingleContainer]}>
                    <Button 
                        info 
                        style={{alignSelf: 'stretch', justifyContent: 'center'}}
                        onPress={() => {
                            ActionSheet.show(
                                {
                                    options: BUTTONS,
                                    cancelButtonIndex: CANCEL_INDEX,
                                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                    title: "Select a Category"
                                },
                                buttonIndex => {
                                    const temp = BUTTONS;
                                    this.setState(prevState => {
                                        prevState.inputItems.push(
                                            {key: temp[buttonIndex]}
                                        )
                                        console.log(JSON.stringify(prevState.inputItems))
                                        return prevState
                                    })
                                    BUTTONS = BUTTONS.filter((category) => category !== BUTTONS[buttonIndex])

                                    
                                }
                            )
                        }}
                    >
                        <Icon type='AntDesign' name='plus'/>
                        <Text style={{color: 'white'}}>Add Category</Text>
                    </Button>
                    
                </View>
                <FlatList data={this.state.inputItems} extraData={this.state} renderItem={({item}) => {return <Text style={{marginBottom: 50}}>{item.key}</Text>}}/>
                <SurveyFooter srs moveToTeamInfo={this.moveToTeamInfo} moveToArea={this.moveToArea}/>
               
            </View>
        )
    }
}
