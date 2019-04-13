import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Item, Input, Footer, FooterTab, Button, Icon} from 'native-base'

export default class Area extends Component{
    moveToTeamInfo = () => {
        this.props.navigation.push('TeamInfo');
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>
                    Area places
                </Text>
                <Footer style={styles.footer}>
                    <FooterTab>
                        <Button vertical onPress={this.moveToTeamInfo}>
                            <Icon name='person' />
                            <Text>Info</Text>
                        </Button>
                        <Button active style={{color: 'skyblue'}} vertical>
                            <Icon name='navigate' />
                            <Text style={{color: 'white'}}>Area</Text>
                        </Button>
                        <Button vertical>
                            <Icon name='grid' />
                            <Text >SRS</Text>
                        </Button>
                        <Button vertical>
                            <Icon name='people' />
                            <Text >AS</Text>
                        </Button>
                        <Button vertical>
                            <Icon name='search' />
                            <Text >Micro</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputSingleContainer: {
        padding: 30,
    },
    inputSingle: {
        marginTop: 15
    },
    inputDoubleContainer: {
        flexDirection: 'row'
    },
    inputDouble: { 
        flex: 2,
        marginLeft: 10,
        marginRight: 10
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'yellow',
        justifyContent: 'center'
    }
})