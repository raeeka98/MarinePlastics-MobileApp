import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
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
    checkBox: {
        flexDirection: 'row',
        marginTop: 3
    },
    checkBoxInput: {
        marginRight: 5,
        height: 25,
        width: 25
    },
    checkBoxLarge: {
        flexDirection: 'row',
        marginTop: 6
    },
    checkBoxLargeInput: {
        marginRight: 10,
        height: 35,
        width: 35
    },
    textInput: {
        height: 40,
        fontSize: 16
    },
    segmentSeparator: {
        padding: 15,
        marginLeft: 15,
        marginRight: 15,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center'
    }
})

export default styles;
