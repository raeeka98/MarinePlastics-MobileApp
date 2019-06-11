import React, {Component} from 'react'
import {ScrollView, View, Text, Image} from 'react-native'
import {SafeAreaView, DrawerItems} from 'react-navigation'

/**
 * Our Custom Drawer component
 */

export default class CustomDrawer extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <ScrollView style={{height: '100%'}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'column'} }>
                        <Image source={require('../assets/images/coi-logo.png')} resizeMode={'contain'} style={{marginTop: 30, height: 100}}/>
                        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}> Marine Plastics Monitor</Text>
                    </View>
                    <DrawerItems {... this.props} />
            </ScrollView>
        )
    }
}
