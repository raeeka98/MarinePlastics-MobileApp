import React, {Component} from 'react'
import {Footer, FooterTab, Icon, Button} from 'native-base'
import {Text} from 'react-native'

import styles from './surveyStyles'

export default class SurveyFooter extends Component {
    render() {
        return (
            <Footer style={styles.footer}>
                <FooterTab>
                    <Button 
                        active={this.props.teamInfo === true} 
                        style={this.props.teamInfo === true ? {color: 'skyblue'} : {}} 
                        onPress={this.props.teamInfo === true ?  () => {} : this.props.moveToTeamInfo}   
                    >
                        <Icon name='person' />
                        <Text style={this.props.teamInfo === true ? {color: 'white'} : {}}>Info</Text>
                    </Button>
                    <Button 
                        active={this.props.area === true} 
                        style={this.props.area === true ? {color: 'skyblue'} : {}} 
                        onPress={this.props.area === true ?() => {} : this.props.moveToArea}    
                    >
                        <Icon name='globe' type='Octicons' />
                        <Text style={this.props.area === true ? {color: 'white'} : {}}>Area</Text>
                    </Button>
                    <Button
                        active={this.props.srs === true} 
                        style={this.props.srs === true ? {color: 'skyblue'} : {}} 
                        onPress={this.props.srs === true ?  () => {} : this.props.moveToSRS} 
                    >
                        <Icon name='backburger' type='MaterialCommunityIcons' />
                        <Text style={this.props.srs === true ? {color: 'white'} : {}}>Rib</Text>
                    </Button>
                    <Button
                        active={this.props.as === true} 
                        style={this.props.as === true ? {color: 'skyblue'} : {}} 
                        onPress={this.props.as === true ?  () => {} : this.props.moveToAS} 
                    >
                        <Icon name='broom' type='MaterialCommunityIcons' />
                        <Text style={this.props.as === true ? {color: 'white'} : {}}>Sweep</Text>
                    </Button>
                    <Button
                        active={this.props.micro === true} 
                        style={this.props.micro === true ? {color: 'skyblue'} : {}} 
                        onPress={this.props.micro === true ?  () => {} : this.props.moveToMicro} 
                    >
                        <Icon name='cup-water' type='MaterialCommunityIcons'/>
                        <Text style={this.props.micro === true ? {color: 'white'} : {}}>Micro</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}
