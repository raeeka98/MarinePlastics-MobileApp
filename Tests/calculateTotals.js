/**
 * calculateTotals.js
 * Contains copy of calculateTotals(type) from
 * ../screens/Publish/PublishContainer.js for testing with
 * PublishContainer.test.js.
 */

/**
 * Given a survey type, 'SRS', 'AS', or 'MDS', calculates the total fresh and
 * weathered trash for each type of debris in the given survey type in
 * currentSurvey.
 * @params {any} type, {any} currentSurvey
 * @return array of totals for fresh and weathered debris for each type of
 * trash
 */
function calculateTotals(type, currentSurvey) {
  let totals = {};
  let totalsArray = [];
  let data;
  switch (type) {
    case 'SRS':
      data = currentSurvey.SRSData;
      break;
    case 'AS':
      data = currentSurvey.ASData;
      break;
    case 'MDS':
      data = currentSurvey.MicroData;
      break;
    default:
      return [];
  }

  for (const id in data) {
    const noSuffix = null;

    // set noSuffix to type of debris and fresh or weathered
    switch (type) {
      case 'SRS':
        noSuffix = id.replace(/__[1-4]/, '');
        break;
      case 'AS':
        noSuffix = id.replace(/__accumulation/, '');
        break;
      default:
        noSuffix = id.replace(/__micro|[1-4]/g, '');
    }
    const trashName = noSuffix.replace(/__\w+/, '');
    const freshWeath = noSuffix.replace(/\w+__/, '');

    // special case for micro debris
    if (trashName === 'rib') {
      trashName = 'microdebris';
    }

    if (totals[trashName] === undefined) {
      totals[trashName] = {
        fresh: 0,
        weathered: 0
      }
    }
    if (freshWeath === 'weathered') {
      totals[trashName].weathered += data[id];
      if (isNaN(totals[trashName].weathered)) {
        totals[trashName].weathered = 0;
      }
    } else {
      totals[trashName].fresh += data[id];
      if (isNaN(totals[trashName].fresh)) {
        totals[trashName].fresh = 0;
      }
    }
  }
  for (const id in totals) {
    totalsArray.push([
      id,
      { fresh: totals[id].fresh, weathered: totals[id].weathered }
    ])
  }
  return totalsArray;
}
module.exports = calculateTotals;