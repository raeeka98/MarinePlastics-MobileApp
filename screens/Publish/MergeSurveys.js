

// expect surveys.length >= 1:
// only pick team information and beach information from surveys[0]
// merge all information in SRSData, ASData and MicroData between surveys
export function mergeSurveys(surveys) {
    let finalSurvey = {};
    finalSurvey["surveyData"] = surveys[0].surveyData;
    finalSurvey["SRSData"] = mergeSRS(surveys);
    finalSurvey["ASData"] = mergeAS(surveys);
    finalSurvey["MicroData"] = mergeMicro(surveys);
    finalSurvey["RibData"] = mergeRib(surveys);
    return finalSurvey;
}

function mergeSRS(surveys) {
    let finalSRS = {};
    surveys.forEach(survey => {
          for (const debris of survey) {
              if(debris in finalSRS) {
                  finalSRS[debris] += survey[debris];
              }
              else {
                  finalSRS[debris] = 0;
              }

          }
    });

    return finalSRS;
}

function mergeAS(surveys) {
    let finalAS = {};


    return finalAS;
}

function mergeMicro(surveys) {
    let finalMicro = {};


    return finalMicro;
}

function mergeRib(surveys) {
    let finalRib = {};


    return finalRib;
}
