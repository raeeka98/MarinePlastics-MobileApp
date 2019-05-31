import {Platform} from 'react-native'
import {Constants} from 'expo';

let homeStyles = (Platform.OS === 'android') ?

    // Android Styles
    {
      container: {
        justifyContent: "center",
        marginTop: 10,
        padding: 20,
        backgroundColor: "#ffffff",
      },
      sectionHeader: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        textAlign: "left",
        color: "#010101"
      }
    }
    :
    // iOS Styles
    {
      container: {
        justifyContent: "center",
        marginTop: 10,
        padding: 20,
        backgroundColor: "#ffffff",
      },
      sectionHeader: {
        paddingTop: 10,
        paddingBottom: 5,
        textAlign: "left"
      }
    }


export default homeStyles;
