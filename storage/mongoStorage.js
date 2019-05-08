var Datastore = require('react-native-local-mongodb');

var db = new Datastore({filename: 'asyncUserSurveys', autoload: true});

let surveyDB = {
    get: async () => {
        /* Get all of the surveys stored in the database */
        let surveys;
        await db.find({}, (err, res) => {
            if(err){
                return (`Error retrieving surveys: ${err}`);
            }
            surveys = res;

        })
        return surveys
    }, 
    getNameDate: () => {
        /* Get only the names and date of the survey (stored in surveyData) */
        return db.find({}).projection({ _id: 1, surveyData: 1, surveyName: 1}).exec((err, res) => {
            if(err) {
                return (`Error retrieving surveys: ${err}`)
            }
            console.log(res)
            return res
        })
    },
    getSurvey: async (survID) => {
        let survey;
        await db.find({surveyName: survID}, (err, res) => {
            if(err) {
                return (`Error retrieving survey: ${err}`)
            }
            survey = res[0];
        })
        return survey
    },
    updateSurvey: (survID, updatePayload) => {
        return db.update({_id: survID}, updatePayload, {}, (err, res)=>{
            if(err){
                return false;
            }
            return true;
        })
    },
    addSurvey: (newSurvey) => {
        return db.insert(newSurvey, (err, res) => {
            if(err){
                return (`Error inserting survey: ${err}`)
            }
            return res;
        })
    },
    deleteSurvey: (surveyID) => {
        return db.remove({_id: surveyID}, {}, (err, res) => {
            if(err) {
                return (`Error deleting survey: ${err}`)
            }
            return res;
        })
    }

}

export default surveyDB;