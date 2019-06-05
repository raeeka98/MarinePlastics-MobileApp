
var Datastore = require('react-native-local-mongodb');

var db = new Datastore({filename: 'asyncUserSurveys', autoload: true});

let surveyDB = {
    get:  () => {
        /* Get all of the surveys stored in the database */
        return db.find({}).exec ((err, res) => {
            if(err){
                return (`Error retrieving surveys: ${err}`);
            }
            return res;
        })
    }, 
    getNameDate: () => {
        /* Get only the names and date of the survey (stored in surveyData) */
        return db.find({}).projection({ _id: 1, surveyData: 1, surveyName: 1, published: 1}).exec((err, res) => {
            if(err) {
                return (`Error retrieving surveys: ${err}`)
            }
            return res
        })
    },
    getSurvey: async (survID) => {
        let survey;
        console.log(survID)
        await db.find({_id: survID}).exec((err, res) => {
            if(err) {
                return (`Error retrieving survey: ${err}`)
            }
            survey = res[0];
            console.log(survey);
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
    },
    deleteAll: () => {
        /* This method should only be used in development, and shall
         * be deleted in production
         */
        return db.remove({}, {multi: true}, (err, res)=>{
            console.log("Deleted everything!")
        })
    }

}

export default surveyDB;