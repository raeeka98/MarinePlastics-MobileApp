/**
 * This file contains the header styles that are dependent on the platform (IOS/android)
 * Of the device running the app. Although React Native's 'SafeAreaView' accounts for the
 * notch at the top of IOS devices, notches at the top of Android devices will obscure the
 * header and will harm the overall experience. The styles account for this by adding the
 * status bar height to the header if the device is an Android. On devices without the notch,
 * it may appear that the header is a bit tall, but it is a small sacrifice to pay in order
 * to make sure that all devieces have the same usability.
 * P.S. Expo does not support the library 'react-native-device-info' at the time of creating
 * this app, so this is why we need this workaround.
 *
 */
import {Platform} from 'react-native'
import {Constants} from 'expo';

let headerStyles = (Platform.OS === 'android') ?

    // Android Styles
    {
      header: {
        height: Constants.statusBarHeight + 50
      },
      headerContents: {
        paddingTop: Constants.statusBarHeight
      }
    }
    :
    // iOS Styles
    {
      header: {
        height: Constants.statusBarHeight + 35,
        backgroundColor: '#3f51b5'
      },
      headerContents: {
        paddingTop: -30
      },
      text: {
        color: 'white',
        textAlign: 'right'
      }
    }


export default headerStyles;
