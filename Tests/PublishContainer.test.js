/**
 * PublishContainer.test.js
 * Tests calculateTotals(type, currentSurvey) from calculateTotals.js for the
 * micro debris code using variables in PublishContainer-test-data.js.
 */
const calculateTotals = require('./calculateTotals');
const {
  testCalculateTotalsMDSMergedSurvey1,
  testCalculateTotalsMDSMergedSurvey2,
  testCalculateTotalsMDSExpect1,
  testCalculateTotalsMDSExpect2
} = require('./PublishContainer-test-data');

test("calculateTotals('MDS') with no micro debris", () => {
  expect(calculateTotals('MDS', testCalculateTotalsMDSMergedSurvey1))
    .toEqual(testCalculateTotalsMDSExpect1);
});

test("calculateTotals('MDS') with micro debris", () => {
  expect(calculateTotals('MDS', testCalculateTotalsMDSMergedSurvey2))
    .toEqual(testCalculateTotalsMDSExpect2);
});