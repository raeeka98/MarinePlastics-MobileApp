export default {
  "test1" : {
    "surveyName" : "test1",
    "surveyData": {
        "userFirst" : "Franky",
        "userLast" : "Kohn",
        "orgName" : "COI",
        "orgLoc" : "Santa Cruz",
        "cleanupDate" : new Date('2019-05-18T07:00:00.000Z'),
        "cleanupTime" : new Date('2019-05-18T23:19:00.000Z'),
        "beachName" : "UCSC death dungeon",
        "latitude" : 36.959717,
        "longitude" : -121.983560,
        "usageRecreation" : true,
        "usageCommercial" : false,
        "usageOther" : "for fun",
        "locationChoiceProximity" : false,
        "locationChoiceDebris" : true,
        "locationChoiceOther" : "close to cabrillo",
        "cmpsDir" : "215",
        "riverName" : "Corkoran Lagoon",
        "riverDistance" : "200",
        "tideTypeA" : "low",
        "tideHeightA" : "0.5",
        "tideTimeA": new Date('2019-05-18T10:19:00.000Z'),
        "tideTypeB": "high",
        "tideHeightB": "10.0",
        "tideTimeB": new Date('2019-05-18T20:19:00.000Z'),
        "windSpeed": "20",
        "windDir": "NW",
        "slope": "winter",
        "substrateTypeSand": false,
        "substrateTypePebble": false,
        "subastrateTypeRipRap": true,
        "substrateTypeSeaweed": true,
        "subStrateTypeOther": false,
        "numOfP" : 19
    },
    "ribData": {
      "r1Length": 20,
      "r1Start": 50
    },
    "SRSData" : {
        "cigaretteButts__fresh__1": 9,
        "cigaretteButts__weathered__1": 20,
        "filmedPlastic__fresh__1" : 14,
        "aluminumCans__weathered__1" : 17,
        "otherWood__fresh__1" : 20
    },
    "ASData" : {
        "cigaretteButts__fresh__accumulation": 16,
        "otherFood__weathered__accumulation" : 19,
        "glass__weathered__accumulation" : 7,
        "aluminumCans__fresh__accumulation" : 10
    }
  },
  "test2" : {
      "surveyName" : "test2",
      "ribData" : {
        "r2Length" : 20,
        "r2Start" : 30
      },
      "SRSData": {
          "glass__weathered__2" : 20,
          "glass__fresh__2" : 9,
          "plasticBottlesCaps__weathered__2" : 17,
          "styrothane__fresh__2" : 16,
          "plasticStraws__fresh__2" : 7,
          "plasticStraws__weathered__2" : 1
      },
      "ASData" : {
          "glass__weathered__accumulation" : 19,
          "styrothane__fresh__accumulation" : 7,
          "plasticStraws__weathered__accumulation" : 2,
          "plasticStraws__fresh__accumulation" : 7,
      },
      "MicroData" : {
          "rib2__fresh__micro" : 10,
          "rib2__weathered__micro" : 20
      }
  },
  "test3" : {
      "surveyName" : "test3",
      "ribData" : {
        "r3Length" : 19,
        "r3Start" : 70
      },
      "SRSData": {
          "glass__weathered__3" : 2,
          "glass__fresh__3" : 3,
          "plasticBottlesCaps__weathered__3" : 4,
          "styrothane__fresh__3" : 5,
          "plasticStraws__fresh__3" : 8,
          "plasticStraws__weathered__3" : 19
      },
      "ASData" : {
          "glass__weathered__accumulation" : 19,
          "styrothane__fresh__accumulation" : 7,
          "plasticStraws__weathered__accumulation" : 2,
          "plasticStraws__fresh__accumulation" : 7,
          "styrothane__weathered__accumulation" : 20
      },
      "MicroData" : {
          "rib3__fresh__micro" : 7,
          "rib3__weathered__micro" : 8
      }
  }
}
