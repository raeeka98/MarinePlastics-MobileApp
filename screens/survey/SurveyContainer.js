import React, { Component } from 'react'
import {TextInput, View } from 'react-native'
import {Button, Item, Text} from 'native-base'
import Modal from 'react-native-modal'

import styles from './surveyStyles'
import TeamInfo from './TeamInfo'
import Area from './Area'
import SurfaceRibScan from './SurfaceRibScan'
import AccumulationSweep from './AccumulationSweep'
import MicroDebris from './MicroDebris'
import SurveyFooter from './SurveyFooter'
import surveyDB from '../../storage/mongoStorage'
import { NavigationActions } from 'react-navigation';


const navigateToHome = NavigationActions.navigate({
    routeName: 'DrawerNavigator',
    params: {}, 
    action: NavigationActions.navigate({routeName: 'HomePage', params: {reload: true}})
});

/**
 * This class will contain the entire survey within the screen, rendering different
 * sections of the survey within one page
 */

/**
 * Here's how the data will be stored in each object:
 * surveyData: {
 *   userFirst: String,
 *   userLast: String,
 *   orgName: String,
 *   orgLoc: String,
 *   cleanupDate: Date,
 *   cleanupTime: Date,
 *   beachName: String,
 *   latitude: Number (?),
 *   longitude: Number,
 *   usageRecreation: Boolean,
 *   usageCommercial: Boolean,
 *   usageOther: String,
 *   locationChoiceProximity: boolean,
 *   locationChoiceDebris: Boolean,
 *   locationChoiceOther: tring,
 *   cmpsDir: String,
 *   riverName: String,
 *   riverDistance: String,
 *   tideTypeA: String,
 *   tideHeightA: String,
 *   tideTimeA: Date,
 *   tideTypeB: String,
 *   tideHeightB: String,
 *   tideTimeB: Date,
 *   windSpeed: String,
 *   windDir: String,
 *   slope: String,
 *   substrateTypeSand: Boolean,
 *   substrateTypePebble: Boolean,
 *   subastrateTypeRipRap: Boolean,
 *   substrateTypeSeaweed: Boolean,
 *   subStrateTypeOther: String
 * },
 *
 * ribData: {
 *   r1Length: String/Number,
 *   r1Start: String/Number,
 *   r2Length: String/Number,
 *   r2Start: String/Number,
 *   r3Length: String/Number,
 *   r3Start: String/Number,
 *   r4Length: String/Number,
 *   r4Start: String/Number,
 * ,}
 *
 * SRSData: {
 *   ITEMNAME__fresh__RIBNUMBER: Number,
 *   ITEMNAME__weathered__RIBNUMBER: Number
 *   (Example)
 *   plasticStraws__fresh__1: 9,
 *   plasticStraws__weathered__1: 14
 *   :
 *   :
 * }
 *
 * ASData: {
 *   ITEMNAME__fresh__accumulation: NUMBER
 *   ITEMNAME__weathered__accumulation: NUMBER
 * }
 *
 * MicroData: {
 *   rib1__fresh__micro: Number,
 *   rib1__weathered__micro: Number
 *   :
 *   :
 *   rib4__weathered__micro: Number
 * }
 *
 */

export default class SurveyContainer extends Component {
    constructor(props) {
        super(props);

        //We may have props passed to this now: the data from a previous/inprogress
        //survey.
        const nav = this.props.navigation
        this.state = {
            surveyData: nav.getParam('surveyData') ? nav.getParam('surveyData') : {
                windDir: 'n',
                tideTypeA: 'high',
                tideTypeB: 'high',
                slope: 'winter'
            },
            SRSData: nav.getParam('SRSData') ? nav.getParam('SRSData') :  {},
            ASData: nav.getParam('ASData') ? nav.getParam('ASData') : {},
            MicroData: nav.getParam('MicroData') ? nav.getParam('MicroData') : {},
            ribData: nav.getParam('ribData') ? nav.getParam('ribData') : {},
            tabArray : [],
            ribsToSelect: undefined,
            shouldRender:{
                teamInfo: true,
                area: false,
                srs: false,
                as: false,
                micro: false
            },
            currentScreen: "teamInfo",
            surveyName: nav.getParam('surveyName') ? nav.getParam('surveyName') : "",
            isModalVisible: false,
            isValidVisible: nav.getParam('fromPublish') ? nav.getParam('fromPublish') : false,
            isBackVisible: false,
            invalidFields: nav.getParam('invalidArray') ? nav.getParam('invalidArray') : [],
            fromPublish: nav.getParam('fromPublish') ? nav.getParam('fromPublish') : false,
            remade: false,
        }
        this.renderCurrentScreen = this.renderCurrentScreen.bind(this);
        this.moveToTeamInfo = this.moveToTeamInfo.bind(this);
        this.moveToArea=this.moveToArea.bind(this);
        this.moveToSRS = this.moveToSRS.bind(this);
        this.moveToAS = this.moveToAS.bind(this);
        this.moveToMicro = this.moveToMicro.bind(this);
    }

    static navigationOptions = {
        header : null
    }

    /**
     * These 'moveTo' functions are used to render each section of the survey, while
     * updating the icons and highlights in the footer tabs on the survey.
     */
    moveToTeamInfo() {
        this.setState({
            currentScreen: "teamInfo",
            shouldRender:{
                teamInfo: true,
                area: false,
                srs: false,
                as: false,
                micro: false
            }
        })
    }

    moveToArea() {
        this.setState({
            currentScreen: "area",
            shouldRender:{
                teamInfo: false,
                area: true,
                srs: false,
                as: false,
                micro: false
            }
        })
    }

    moveToSRS() {
        this.setState({
            currentScreen: "srs",
            shouldRender:{
                teamInfo: false,
                area: false,
                srs: true,
                as: false,
                micro: false
            }
        })
    }

    moveToAS() {
        this.setState({
            currentScreen: "as",
            shouldRender:{
                teamInfo: false,
                area: false,
                srs: false,
                as: true,
                micro: false
            }
        })
    }

    moveToMicro() {
        this.setState({
            currentScreen: "micro",
            shouldRender:{
                teamInfo: false,
                area: false,
                srs: false,
                as: false,
                micro: true
            }
        })
    }

    /**
     * This function takes in a reference name and an event to update the state of the survey.
     * The reference name is the key that will be used to update the variable in surveyData.
     * e is used to grab the text from the text input and update the data with the new
     * value
     */
    updateSurveyState(refName, e) {
        let key =  refName;//e.target.id;
        let value = e.nativeEvent.text;
        this.setState(prevState => {
            prevState.surveyData[key] = value;
            return prevState;
        })
        if(key === 'cleanupTime')
            this.setState({showTime: false})
    }

    /*
     * Update the rib length or the rib start
     */

    updateRibData(refName, e) {
        let key = refName;
        let val = e.nativeEvent.text;
        this.setState(prevState => {
            prevState.ribData[key] = val;
            return prevState;
        })
    }

    /**
     * Use the navigator's geolocation function to get the current position of 
     * the user. The user will be asked to enable location services upon request.
     * If the user does not want to have location services, then they can manually
     * enter their location
     */

    updateSurveyLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState(prevState => {
                    prevState.surveyData.latitude = position.coords.latitude;
                    prevState.surveyData.longitude = position.coords.longitude;
                    prevState.error = null;
                    return prevState;

                })
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        )
    }

    /**
     * A slightly different function has to be done here; e itself is the time that is being
     * updated, so we use it as the value to update the key
     */
    updateSurveyTime = (refName, e) => {
        let key = refName;
        let val = e;
        this.setState(prevState => {
            prevState.surveyData[key] = val;
            return prevState;
        })
    }

    /**
     * Here, we need to take the change in the dropdown menu, stored in value, and set
     * surveyData[refName] to the new value.
     */
    onDropdownChange(refName, value) {
        this.setState(prevState => {
            prevState.surveyData[refName] = value;
            return prevState
        })
    }

    /**
     * When updating the data, the checked value should be the opposite from what it was
     * before the user checked the value.
     */
    checkedbox(refName, e) {
        let key = refName;
        let selection = this.state.surveyData[refName];
        this.setState(prevState => {
            prevState.surveyData[key] = !selection;
            return prevState;
        })
    }

     /**
     * Increment or decrement the given key. When decrementing, the user cannot have a negative
     * value.
     */

    decrementSRS (refName, e){
        let key = refName;
        this.setState(prevState => {
            const newVal =  prevState.SRSData[key] - 1;
            if(newVal === undefined)
                return prevState
            if(newVal < 0)
                return prevState
            prevState.SRSData[key]--;
            return prevState;
        })
    }

    incrementSRS(refName, e){
        let key = refName;
        this.setState(prevState => {
            prevState.SRSData[key] = prevState.SRSData[key] ?  prevState.SRSData[key] + 1 : 1;
            return prevState;
        })
    }

    decrementAS (refName, e){
        let key = refName;
        this.setState(prevState => {
            const newVal =  prevState.ASData[key] - 1;
            if(newVal === undefined)
                return prevState
            if(newVal < 0)
                return prevState
            prevState.ASData[key]--;
            return prevState;
        })
    }

    incrementAS(refName, e){
        let key = refName;
        this.setState(prevState => {
            prevState.ASData[key] = prevState.ASData[key] ?  prevState.ASData[key] + 1 : 1;
            return prevState;
        })
    }

    decrementMicro (refName, e){
        let key = refName;
        this.setState(prevState => {
            const newVal =  prevState.MicroData[key] - 1;
            if(newVal === undefined)
                return prevState
            if(newVal < 0)
                return prevState
            prevState.MicroData[key]--;
            return prevState;
        })
    }

    incrementMicro(refName, e){
        let key = refName;
        this.setState(prevState => {
            prevState.MicroData[key] = prevState.MicroData[key] ?  prevState.MicroData[key] + 1 : 1;
            return prevState;
        })
    }

    /**
     * Use the currentScreen variable to determine which section of the survey to render, based
     * on what the user has selected using the navigation bar. Here we'll also take the functions
     * that are used by each component, such as updateSurveyState, and pass them as props
     */

    renderCurrentScreen() {
        const {currentScreen} = this.state;
        switch(currentScreen) {
            case "teamInfo" :
                return (
                    <TeamInfo
                        surveyData={this.state.surveyData}
                        SRSData={this.state.SRSData}
                        ASData={this.state.ASData}
                        MicroData={this.state.MicroData}
                        ribData={this.state.ribData}
                        tabArray={this.state.tabArray}
                        ribsToSelect={this.state.ribsToSelect}
                        updateSurveyState={this.updateSurveyState}
                        updateSurveyTime={this.updateSurveyTime}
                        onClickFinish={this.onClickFinish}
                        fromPublish={this.state.fromPublish}
                        navigation={this.props.navigation}
                        invalidFields={this.state.invalidFields}
                        openBackModal={this.openBackModal}
                        closeBackModal={this.closeBackModal}
                    />
                )
            case "area" :
                return(
                    <Area
                        surveyData={this.state.surveyData}
                        SRSData={this.state.SRSData}
                        ASData={this.state.ASData}
                        MicroData={this.state.MicroData}
                        ribData={this.state.ribData}
                        tabArray={this.state.tabArray}
                        ribsToSelect={this.state.ribsToSelect}
                        checkedbox={this.checkedbox}
                        onDropdownChange={this.onDropdownChange}
                        updateSurveyState={this.updateSurveyState}
                        updateSurveyTime={this.updateSurveyTime}
                        onClickFinish={this.onClickFinish}
                        fromPublish={this.state.fromPublish}
                        invalidFields={this.state.invalidFields}
                        updateSurveyLocation={this.updateSurveyLocation}
                    />
                )
            case "srs" :
                return (
                    <SurfaceRibScan
                        surveyData={this.state.surveyData}
                        SRSData={this.state.SRSData}
                        ASData={this.state.ASData}
                        MicroData={this.state.MicroData}
                        ribData={this.state.ribData}
                        tabArray={this.state.tabArray}
                        ribsToSelect={this.state.ribsToSelect}
                        updateSurveyState={this.updateSurveyState}
                        updateRibData={this.updateRibData}
                        incrementSRS={this.incrementSRS}
                        decrementSRS={this.decrementSRS}
                        onClickFinish={this.onClickFinish}
                        fromPublish={this.state.fromPublish}
                        setRemade={this.setRemade}
                        remade={this.state.remade}
                    />
                )
            case "as" :
                return (
                    <AccumulationSweep
                        surveyData={this.state.surveyData}
                        SRSData={this.state.SRSData}
                        ASData={this.state.ASData}
                        MicroData={this.state.MicroData}
                        ribData={this.state.ribData}
                        incrementAS={this.incrementAS}
                        decrementAS={this.decrementAS}
                        onClickFinish={this.onClickFinish}
                        fromPublish={this.state.fromPublish}
                        tabArray={this.state.tabArray}
                        ribsToSelect={this.state.ribsToSelect}
                    />
                )
            default :
                return (
                    <MicroDebris
                        surveyData={this.state.surveyData}
                        SRSData={this.state.SRSData}
                        ASData={this.state.ASData}
                        MicroData={this.state.MicroData}
                        ribData={this.state.ribData}
                        incrementMicro={this.incrementMicro}
                        decrementMicro={this.decrementMicro}
                        onClickFinish={this.onClickFinish}
                        fromPublish={this.state.fromPublish}
                        tabArray={this.state.tabArray}
                        ribsToSelect={this.state.ribsToSelect}
                    />
                )
        }
    }

    /**
     * The "remade" variable is used to ensure that the ribs have been rendered properly
     * after the user selects this survey tp be edited
     */

    setRemade =() => {
        this.setState({remade: true})
    }

    onClickFinish = () => {
        /**
         * Render a modal/popup that will prompt the user to enter in a user defined name for the survey
         * Once they finish, then the survey will be stored locally and accessed locally
         */
        this.setState({isModalVisible:true})
    }

    onChangeSurveyName = (e) => {
        let surveyName = e.nativeEvent.text;
        this.setState({surveyName: surveyName})
    }

    cancelModal =() => {
        this.setState({isModalVisible:false})
    }

    saveModal = async  () => {
        /**
         * Commit all of the data to local storage
         */
        const {surveyName, surveyData, SRSData, ASData, MicroData, ribData} = this.state;
        const survStoreData = {
            surveyName,
            surveyData,
            SRSData,
            ASData,
            MicroData,
            ribData,
            published: false,
            /* Possibly store user credentials here too */
        }
        if(this.props.navigation.getParam('inProgress') !== undefined){
            /* This survey just needs an update */
            let survID = this.props.navigation.getParam('inProgress');
            await surveyDB.updateSurvey(survID, survStoreData);
        } else {
            await surveyDB.addSurvey(survStoreData);
        }
        /* Navigate back to the home page */
        await this.setState({isModalVisible:false, surveyName: ''})
        this.props.navigation.dispatch(navigateToHome);
    }

    /**
     * This function will only be called once the user finishes validating the survey.
     * If the user has not completed the required fields, then we'll prompt them to keep 
     * filling it out, other wise we'll go back to the publish workflow
     */

    onPressVerify = () => {
        let invalidArray = this.verifyModal();
        if(invalidArray.length > 0){
            /* Let the user know that they ain't done yet */
            this.setState({invalidFields: invalidArray, isModalVisible: false, isValidVisible: true})
        } else {
            /* Save the survey, move back to publish */
            let survID = this.props.navigation.getParam('inProgress');
            console.log("SURVEY ID:" + survID)
            const {surveyName, surveyData, SRSData, ASData, MicroData, ribData} = this.state;
            const survStoreData = {
                surveyName,
                surveyData,
                SRSData,
                ASData,
                MicroData,
                ribData,
                published: false
                /* Possibly store user credentials here too */
            }
            surveyDB.updateSurvey(survID, survStoreData);
            /* We need to indicate that we're coming back from the validation process so that we can
               perform the following:
                - Query the website's database to see if the beach already exists
            */
            this.props.navigation.navigate('PublishContainer', {
                isVerified: true,
                verifyID: survID
            })
        }
    }

    /**
     * Verify that the user has filled out all of the required fields
     */

    verifyModal = () => {
        /* Here we'll need to verify the new survey information */
        const survey = this.state;
        let invalid = [];
        const requiredIDs = ['userFirst', 'userLast', 'orgName', 'orgLoc',
            'cleanupTime', 'cleanupDate', 'beachName', 'cmpsDir', 'riverName',
            'riverDistance', 'slope', 'tideHeightA', 'tideHeightB', 'tideTimeA',
            'tideTimeB', 'tideTypeA', 'tideTypeB', 'windDir', 'windSpeed',
            'latitude', 'longitude'
        ];

        for(const id in requiredIDs) {
            if(survey.surveyData[requiredIDs[id]] === undefined) {
                invalid.push(requiredIDs[id]);
            }
        }

        if(!survey.surveyData.locationChoiceDebris && !survey.surveyData.locationChoiceOther
            && !survey.surveyData.locationChoiceProximity)
            invalid.push('locChoice')

        if(!survey.surveyData.usageRecreation && !survey.surveyData.usageCommercial
            && !survey.surveyData.usageOther)
            invalid.push('usage')

        if(!survey.surveyData.substrateTypeSand && !survey.surveyData.substrateTypePebble && !survey.surveyData.substrateTypeRipRap
            && !survey.surveyData.substrateTypeSeaweed && !survey.surveyData.substrateTypeOther)
            invalid.push('subType');

        return invalid
    }

    cancelValidModal = () => {
        this.setState({isValidVisible: false})
    }

    openBackModal = () => {
        this.setState({isBackVisible: true})
    }

    closeBackModal = () => {
        this.setState({isBackVisible: false})
    }

    closeBackAndNavigate = async () => {
        await this.closeBackModal();
        this.props.navigation.pop()
    }

    render() {
        const {shouldRender} = this.state;
        return(
            <View style={styles.container}>
                {this.renderCurrentScreen()}
                {/* This modal is used to prompt the user to give the survey a name before saving */}
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{alignSelf: 'center', width: '90%', height: 250, backgroundColor: 'white'}} >
                        <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Enter Survey Name:</Text>
                        <View style={[styles.inputSingleContainer, {marginBottom: 30}]}>
                            <Item regular>
                                <TextInput
                                    style={{width: '90%', height: 40, fontSize: 18}}
                                    placeholder="<Survey Name>"
                                    onChange={this.onChangeSurveyName}
                                    value={this.state.surveyName}
                                />
                            </Item>
                        </View>
                        <View style={[styles.inputDoubleContainer, {justifyContent: 'space-evenly'}]}>
                            <Button light style={{justifyContent: 'center',width: 100}}onPress={this.cancelModal}>
                                <Text style={{color: 'black', fontWeight: 'bold', padding: 8}}>Back</Text>
                            </Button>
                            {
                                this.state.fromPublish ?
                                    <Button success style={{justifyContent: 'center', width: 100}} onPress={this.onPressVerify}>
                                        <Text style={{color: 'white', fontWeight: 'bold', padding: 8}}>Verify</Text>
                                    </Button> :
                                    <Button success style={{justifyContent: 'center', width: 100}}onPress={this.saveModal}>
                                        <Text style={{color: 'white', fontWeight: 'bold', padding: 8}}>Save</Text>
                                    </Button>
                            }

                        </View>

                    </View>
                </Modal>
                {/* Modal to tell the user that their survey is invalid */}
                <Modal isVisible={this.state.isValidVisible}>
                    <View style={{alignSelf: 'center', justifyContent:'center', alignItems: 'center', width: '90%', height: 250, backgroundColor: 'white'}} >
                        <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>
                            Please fill out the required fields, highlighted in red.
                        </Text>
                        <View style={[styles.inputDoubleContainer, {justifyContent: 'space-evenly'}]}>
                            <Button info style={{justifyContent: 'center',width: 100}}onPress={this.cancelValidModal}>
                                <Text style={{color: 'white', padding: 8}}>Continue</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
                {/* Modal to make sure the user want to exit the survey */}
                <Modal isVisible={this.state.isBackVisible}>
                    <View style= {
                        {
                            alignSelf:'center', 
                            backgroundColor: 'white', 
                            height: 150, 
                            width: '90%'
                        }
                    } 
                    >
                        <Text style={{alignSelf: 'center', padding: 8, fontSize: 20, fontWeight: '500'}}>Exit without saving?</Text>
                        <View style={[styles.inputDoubleContainer, {justifyContent: 'space-evenly'}]}>
                            <Button light style={{justifyContent: 'center',width: 100}}onPress={this.closeBackModal}>
                                <Text style={{padding: 8}}>No</Text>
                            </Button>
                            <Button danger style={{justifyContent: 'center',width: 100}}onPress={this.closeBackAndNavigate}>
                                <Text style={{color: 'white', padding: 8}}>Exit</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
                {/* Render the survey footer */}
                <SurveyFooter
                    teamInfo={shouldRender.teamInfo}
                    area={shouldRender.area }
                    srs={shouldRender.srs}
                    as={shouldRender.as}
                    micro={shouldRender.micro}
                    moveToTeamInfo={this.moveToTeamInfo}
                    moveToArea={this.moveToArea}
                    moveToSRS={this.moveToSRS}
                    moveToAS={this.moveToAS}
                    moveToMicro={this.moveToMicro}
                />
            </View>
        )
    }
}
