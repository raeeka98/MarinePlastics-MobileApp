
// Should migrate all QREncoding logic from home page and Scanner to this page ASAP


// Binary to Encoded (using an encoding style similar to base64)
// This method takes a binary string and encodes it into printable ascii chars
// It does this by popping the six front-most bits and mapping the decimal value of this into the range
// of 48-112, which are all printable ascii value. If the binstring is not divisible by 6
// the remainder will be encoded after a ! in plain binary (min of 1 max of 5 extra chars)



// DECODE =====================================================================

decodeText(encoded) {
  let binstring = encodedToBin(encoded);
  let decoded = [];
  while (binstring.length >= 9) {
    var substr = binstring.substr(0, 9);
    binstring = binstring.substr(9);
    var dec = parseInt(substr, 2);
    decoded.push(dec);
  }
  let survey = {
    surveyData : {},
    SRSData : {},
    ASData : {},
    MicroData : {},
    ribData: {}
  };
  var i=0;
  for (var ribNum = 1; ribNum <= 4; ribNum++) {
    //RIB 1 (example rib) DO FOR EACH RIB
    survey.ribData[`r${ribNum}Start`] = decoded[i++];
    survey.ribData[`r${ribNum}Length`] = decoded[i++];
    //Encode fresh and weathered for each category
    for (var key in debrisInfoID) {
      survey.SRSData[`${debrisInfoID[key]}__fresh__${ribNum}`] = decoded[i++];
      survey.SRSData[`${debrisInfoID[key]}__weathered__${ribNum}`] = decoded[i++];
    }
  }
  //ACCUMULATION SWEEP
  for (var key in debrisInfoID) {
    survey.ASData[`${debrisInfoID[key]}__fresh__accumulation`] = decoded[i++];
    survey.ASData[`${debrisInfoID[key]}__weathered__accumulation`] = decoded[i++];
  }
  //MICRODEBRIS
  for (var ribNum = 1; ribNum <= 4; ribNum++) {
    survey.MicroData[`rib${ribNum}__fresh__micro`] = decoded[i++];
    survey.MicroData[`rib${ribNum}__weathered__micro`] = decoded[i++];
  }
  console.log(survey);
  return survey;
}

// ENCODE =====================================================================

encodeToText(survey) {
  let binstring = "";
  for (var ribNum = 1; ribNum <= 4; ribNum++) {
    //RIB 1 (example rib) DO FOR EACH RIB
    var ribStart = parseInt(survey.ribData[`r${ribNum}Start`], 10);
    if(isNaN(ribStart)){
      ribStart = 0;
    }
    var ribLength = parseInt(survey.ribData[`r${ribNum}Length`], 10);
    if(isNaN(ribLength)){
      ribLength = 0;
    }
    console.log(" ");
    console.log(`rib ${ribNum} start encoded: ${ribStart}`);
    console.log(`rib ${ribNum} start stored: ${survey.ribData[`r${ribNum}Start`]}`)
    console.log(`rib ${ribNum} length encoded: ${ribLength}`);
    console.log(`rib ${ribNum} length stored: ${survey.ribData[`r${ribNum}Length`]}`)
    //Encode ribStart
    binstring += intToBin(ribStart);
    //Encode ribLength
    binstring += intToBin(ribLength);
    //Encode fresh and weathered for each category
    for (var key in debrisInfoID) {
      var fresh = survey.SRSData[`${debrisInfoID[key]}__fresh__${ribNum}`];
      var weathered = survey.SRSData[`${debrisInfoID[key]}__weathered__${ribNum}`];
      //encode fresh and weathered debris to binary and add to the binary string
      binstring += intToBin(fresh);
      binstring += intToBin(weathered);
    }
  }
  //ACCUMULATION SWEEP
  for (var key in debrisInfoID) {
    var fresh = survey.ASData[`${debrisInfoID[key]}__fresh__accumulation`];
    var weathered = survey.ASData[`${debrisInfoID[key]}__weathered__accumulation`];
    //encode fresh and weathered debris to binary and add to the binary string
    binstring += intToBin(fresh);
    binstring += intToBin(weathered);
  }
  //MICRODEBRIS
  for (var ribNum = 1; ribNum <= 4; ribNum++) {
    var fresh = survey.MicroData[`rib${ribNum}__fresh__micro`];
    var weathered = survey.MicroData[`rib${ribNum}__weathered__micro`];
    binstring += intToBin(fresh);
    binstring += intToBin(weathered);
  }
  return binToEncoded(binstring);
}

// ENCODE HELPERS ==============================================================

binToEncoded = (binstring) => {
  var encoded = "";
  while (binstring.length >= 6) {
    var substr = binstring.substr(0, 6);
    binstring = binstring.substr(6);
    var dec = parseInt(substr, 2);
    var charrep = String.fromCharCode(48 + dec);
    encoded += charrep;
  }
  if (binstring.length != 0) {
    encoded += '!';
    encoded += binstring;
  }
  return encoded;
}

intToBin(dec) {
  if (dec === undefined) dec = 0;
  bin = ("000000000" + (Number(dec).toString(2))).slice(-9);
  return bin;
}

// DECODE HELPERS ==============================================================

encodedToBin(encoded) {
  var binstring = "";
  for (let i = 0; i < encoded.length; i++) {
    if (encoded.charAt(i) !== "!") {
      var dec = encoded.charCodeAt(i) - 48;
      binstring += ("000000" + (Number(dec).toString(2))).slice(-6);
    }
    else {
      binstring += encoded.substr(i + 1);
      i = encoded.length;
    }
  }
  return binstring;
}

export { encodeToText, decodeText }
