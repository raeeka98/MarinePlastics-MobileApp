import React, { Component } from 'react'
import {TextInput, FlatList } from 'react-native'

import {
  Item,
  Button,
  Icon,
  Header,
  Left,
  Body,
  Text,
  Right,
  View,
  Container,
  Content,
  Card,
  CardItem
} from 'native-base'

import styles from './surveyStyles'
import headerStyles from '../../components/headerStyles';

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

/**
 * This section is pretty static, mainly because all of the micro debris ribs can
 * be rendered on a single page
 */

export default class MicroDebris extends Component {
    constructor(props){
        super(props);
        this.state = {
            surveyData: this.props.surveyData ? this.props.surveyData : {},
            SRSData: this.props.SRSData ? this.props.SRSData : {},
            ASData: this.props.ASData ? this.props.ASData : {},
            MicroData: this.props.MicroData ? this.props.MicroData : {},
            ribData: this.props.ribData ? this.props.ribData : {},
            microRowLabels: microRowLabels
        }
    }


    renderMicroRows = ({item}) => {
        const currentItemKey = microRowIDs[item.key];
        const freshKey = `${currentItemKey}__fresh__micro`
        const weatheredKey = `${currentItemKey}__weathered__micro`
        return (
            <Card bordered>
              <CardItem header bordered>
                <Text style={{fontSize: 19}}>{item.key}</Text>
              </CardItem>
              <CardItem bordered  style={{flex: 1}}>
                  <Left>
                    <Text style={{fontSize: 18}}>Fresh:</Text>
                  </Left>
                  <Body style={{flexDirection: 'row'}}>
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
                  </Body>
              </CardItem>
              <CardItem bordered>
                <Left>
                    <Text style={{fontSize: 18}}>Weathered:</Text>
                </Left>
                <Body style={{flexDirection: 'row'}}>
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
                </Body>
              </CardItem>
            </Card>
        )
    }

    render() {

        return(
            <Container style={[{marginBottom: 60, flex: 1, backgroundColor: '#e4eaff'}]}>
                <Header hasTabs style={headerStyles.header}>
                    <Left style={headerStyles.headerContents}>
                        <Button transparent onPress={this.props.openBackModal}>
                            <Icon type="AntDesign" name='close'/>
                        </Button>
                    </Left>
                    <Body style={headerStyles.headerContents}>
                        <Text style={{fontSize: 18, color: 'white'}}>Micro Debris</Text>
                    </Body>
                    <Right style={headerStyles.headerContents}>
                        <Button success onPress={this.props.onClickFinish}>
                            <Text style={{padding: 5, color: 'white'}}>Finish</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                  <FlatList
                      style={{marginTop: 10, marginLeft: 5, marginRight: 5}}
                      data={this.state.microRowLabels}
                      extraData={this.state}
                      renderItem={this.renderMicroRows}
                  />
                </Content>
            </Container>

        )
    }
}
