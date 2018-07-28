/*
 * Test suite for the audiogram test functions.
 */

const quizModule = require('../src/QuizFunctions');
const generateRandomPoints = quizModule.generateRandomPoints;
const generateSlopePoints = quizModule.generateSlopePoints;
const getMaskingNumsAC = quizModule.getMaskingNumsAC;
const getMaskingNumsBC = quizModule.getMaskingNumsBC;

/*
 * Tests the function that generates random points for the audiogram.
 */
test('Random points', () => {
    expect(generateRandomPoints(8).length).toEqual(8);
});

/*
 * Tests the function for generating sloping points on an audiogram. These
 * values "dip" on the graph but increase in dB value.
 */
test('Sloping points', () => {
    var slopingPoints = generateSlopePoints(12);
    expect(slopingPoints.length).toEqual(12);
    for (var i=3; i<9; i+=2) {
      expect(slopingPoints[i]).toBeGreaterThan(slopingPoints[i-2]);
    }
});

/*
 * Tests the function for getting AC masking values from an array.
 */
test('Get masking values AC', () => {
    var points = [0,40,15,0,60,20];
    var pointsOneMask = [0,40];
    var singlePoint = [0]
    var pointsNoMask = [0,15];
    expect(getMaskingNumsAC(points).length).toEqual(2);
    expect(getMaskingNumsAC(pointsOneMask).length).toEqual(1);
    expect(getMaskingNumsAC(singlePoint).length).toEqual(0);
    expect(getMaskingNumsAC(pointsNoMask).length).toEqual(0);
});

/*
 * Tests the function for getting BC masking values from an array.
 */
test('Get masking values BC', () => {
    var points = [0,40,15,0,60,20];
    expect(getMaskingNumsBC(points).length).toEqual(3);
});
