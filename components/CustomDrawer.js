import React, {Component} from 'react'
import {ScrollView, View, Text} from 'react-native'
import {SafeAreaView, DrawerItems} from 'react-navigation'

export default class CustomDrawer extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <ScrollView style={{height: '100%'}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'column', height: 150, backgroundColor: '#6CB5FF'} }>
                        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}> Marine Plastics Monitor</Text>
                    </View>
                    <DrawerItems {... this.props} />
            </ScrollView>
        )
    }
}