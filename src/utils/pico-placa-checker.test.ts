import {
  getDayNumber,
  IsTimeInRange,
  getLastPlateNumber,
  getNotPermitPlatesNumbers,
  picoPlacaChecker
} from "./pico-placa-checker";
//fist step obtain the day number
test("The day number of 2022-04-17 to be 7 for Sunday", () => {
  expect(getDayNumber("2022-04-17")).toBe(7);
});
test("The day number of 2022-04-14 to be 4 for Thursday", () => {
  expect(getDayNumber("2022-04-14")).toBe(4);
});
//second step  validate if a time is between a range
test("A time with format HH:mm is between a range", () => {
  expect(IsTimeInRange("14:00", "15:00", "14:01")).not.toBeFalsy();
  expect(IsTimeInRange("14:00", "15:00", "15:01")).toBeFalsy();
  expect(IsTimeInRange("14:00", "15:00", "13:59")).toBeFalsy();
});
//third step obtain the last number of a plate
test("If the plate number is TBD-5695 to be 5", () => {
  expect(getLastPlateNumber("TBD-5695")).toBe(5);
  expect(getLastPlateNumber("TBD5695")).toBe(5);
  expect(getLastPlateNumber("5695")).toBe(5);
});

//forth step obtain the permitted plate numbers for specific day
test("if de day is monday(1) the not permitted plates to be [1,2]",()=>{
  expect(getNotPermitPlatesNumbers(1)).toStrictEqual([1,2])
  expect(getNotPermitPlatesNumbers(2)).toStrictEqual([3,4])
  expect(getNotPermitPlatesNumbers(3)).toStrictEqual([5,6])
  expect(getNotPermitPlatesNumbers(4)).toStrictEqual([7,8])
  expect(getNotPermitPlatesNumbers(5)).toStrictEqual([9,0])
  expect(getNotPermitPlatesNumbers(6)).toStrictEqual([])
  expect(getNotPermitPlatesNumbers(7)).toStrictEqual([])
})
// test main function

test("if the input are TBD-5697, 2022-04-14, 6:59 to be false",()=>{
  expect(picoPlacaChecker("TBD-5697","2022-04-14","6:59")).toBeFalsy()
})

test("if the input are TBD-5697, 2022-04-14, 7:00 to be true",()=>{
  expect(picoPlacaChecker("TBD-5697","2022-04-14","7:00")).not.toBeFalsy()
})

test("if the input are TBD-5697, 2022-04-14, 8:00 to be true",()=>{
  expect(picoPlacaChecker("TBD-5697","2022-04-14","8:00")).not.toBeFalsy()
})

test("if the input are TBD-5697, 2022-04-14, 9:30 to be true",()=>{
  expect(picoPlacaChecker("TBD-5697","2022-04-14","9:30")).not.toBeFalsy()
})

test("if the input are TBD-5697, 2022-04-14, 15:00 to be false",()=>{
  expect(picoPlacaChecker("TBD-5697","2022-04-14","15:00")).toBeFalsy()
})

test("if the input are TBD-5698, 2022-04-14, 9:30 to be false",()=>{
  expect(picoPlacaChecker("TBD-5698","2022-04-14","9:30")).not.toBeFalsy()
})

test("if the input are TBD-5691, 2022-04-14, 9:30 to be true",()=>{
  expect(picoPlacaChecker("TBD-5691","2022-04-14","9:30")).toBeFalsy()
})