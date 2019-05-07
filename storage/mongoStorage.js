var Datastore = require('react-native-local-mongodb');

var surveyDB = new Datastore({filename: 'asyncUserSurveys', autoload: true});

export default surveyDB;