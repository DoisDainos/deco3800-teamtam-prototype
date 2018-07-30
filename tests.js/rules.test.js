/*
 * Test suite for the masking rules functions.
 */

const rulesModule = require('../src/Rules');
const checkRule1 = rulesModule.checkRule1;
const checkRule2 = rulesModule.checkRule2;
const checkMaskingRule1 = rulesModule.checkMaskingRule1;
const checkMaskingRule2 = rulesModule.checkMaskingRule2;
const findTestEar = rulesModule.findTestEar;
const hasOvermasked = rulesModule.hasOvermasked;

var pointsAC = [0, 40, 30, 20];
var pointsAC2 = [40, -10, 0];
var pointsBC = [0, 15, 30, -5];

/*
 * Tests the function that finds if masking is needed according to rule 1
 * in two single points.
 */
test('Check rule 1 for single points', () => {
    expect(checkRule1(0, 0)).toBe(false);
    expect(checkRule1(40, 0)).toBe(true);
    expect(checkRule1(-10, 30)).toBe(false);
    expect(checkRule1(30, -10)).toBe(true);
    expect(checkRule1(120, 80)).toBe(true);
});

/*
 * Tests the function that finds if masking is needed according to rule 1
 * in two arrays of points.
 */
test('Check rule 1 for arrays of points', () => {
    expect(checkMaskingRule1(pointsAC, pointsAC2)).toEqual([1]);
    expect(checkMaskingRule1(pointsAC, pointsAC)).toEqual([]);
});

/*
 * Tests the function that finds if masking is needed according to rule 2
 * in two single points.
 */
test('Check rule 2 for single points', () => {
    expect(checkRule2(0, 0)).toBe(false);
    expect(checkRule2(0, 15)).toBe(false);
    expect(checkRule2(-15, 0)).toBe(false);
    expect(checkRule2(0, -15)).toBe(true);
    expect(checkRule2(30, 20)).toBe(false);
});

/*
 * Tests the function that finds if masking is needed according to rule 2
 * in two arrays of points.
 */
test('Check for rule 2 for arrays of points', () => {
    expect(checkMaskingRule2(pointsAC, pointsBC)).toEqual([1,3]);
    expect(checkMaskingRule2(pointsBC, pointsAC)).toEqual([]);
});

/*
 * Tests the function that finds the test ear out of two points.
 */
test('Check for test ear', () => {
    expect(findTestEar(40, 0)).toEqual("left");
    expect(findTestEar(0, 40)).toEqual("right");
    expect(findTestEar(0, 0)).toEqual("right");
});

/*
 * Tests the function that checks if overmasking has occured.
 */
test('Check for overmasking', () => {
    expect(hasOvermasked(10, 10)).toBe(true);
    expect(hasOvermasked(10, 15)).toBe(false);
    expect(hasOvermasked(15, 10)).toBe(true);
});
