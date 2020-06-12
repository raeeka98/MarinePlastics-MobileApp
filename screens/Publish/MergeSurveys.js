

// expect surveys.length >= 1:
// only pick team information and beach information from surveys[0]
// merge all information in SRSData, ASData and MicroData between surveys
export function mergeSurveys(surveys) {
    let finalSurvey = {};
    finalSurvey["surveyData"] = surveys[0].surveyData;
    finalSurvey["SRSData"] = mergeSRS(surveys);
    finalSurvey["ASData"] = mergeAS(surveys);
    finalSurvey["MicroData"] = mergeMicro(surveys);
    finalSurvey["ribData"] = mergeRib(surveys);
    return finalSurvey;
}

function mergeSRS(surveys) {
    let finalSRS = {};
    surveys.forEach(survey => {
        if (survey.hasOwnProperty("SRSData")) {
            for (const debris in survey.SRSData) {
                if (finalSRS.hasOwnProperty(debris)) {
                    finalSRS[debris] += survey.SRSData[debris];
                }
                else {
                    if (survey.SRSData[debris] === 0)
                        continue
                    finalSRS[debris] = survey.SRSData[debris];
                }
            }
        }
    });
    return finalSRS;
}

function mergeAS(surveys) {
    let finalAS = {};
    surveys.forEach(survey => {
        if (survey.hasOwnProperty("ASData")) {
            for (const debris in survey.ASData) {
                if (finalAS.hasOwnProperty(debris)) {
                    finalAS[debris] += survey.ASData[debris];
                }
                else {
                    if (survey.ASData[debris] === 0)
                        continue
                    finalAS[debris] = survey.ASData[debris];
                }
            }
        }
    });
    return finalAS;
}

function mergeMicro(surveys) {
    let finalMicro = {};
    surveys.forEach(survey => {
        if (survey.hasOwnProperty("MicroData")) {
            for (const debris in survey.MicroData) {
                if (finalMicro.hasOwnProperty(debris)) {
                    finalMicro[debris] += survey.MicroData[debris];
                }
                else {
                    if (survey.MicroData[debris] === 0)
                        continue
                    finalMicro[debris] = survey.MicroData[debris];
                }
            }
        }
    });
    return finalMicro;
}

function mergeRib(surveys) {
    let finalRib = {};
    surveys.forEach(survey => {
        if (survey.hasOwnProperty("ribData")) {
            for (const ribInfo in survey.ribData) {
                if (survey.ribData[ribInfo] === 0)
                    continue
                finalRib[ribInfo] = survey.ribData[ribInfo];
            }
        }
    });
    return finalRib;
}
