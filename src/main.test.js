import { calcTotalPages, calcArrIdx } from './main';

test('test calcTotalPages - total/10', () => {
  expect(calcTotalPages(50)).toBe(5);
})

// check the array start idx to read from the response array.
test('test calcArrIx for page 1 should return idx=0', () => {
  expect(calcArrIdx(1)).toBe(0);
})
test('test calcArrIdx for page 2 should return idx=10', () => {
  expect(calcArrIdx(2)).toBe(10);
})
test('test calcArrIdx for page 3 should return idx=30', () => {
  expect(calcArrIdx(3)).toBe(20);
})

// check index for the 2nd set of pages 6 to 10
test('test calcArrIdx for page 6 should return idx=30', () => {
  expect(calcArrIdx(6)).toBe(0);
})
test('test calcArrIdx for page 7 should return idx=40', () => {
  expect(calcArrIdx(7)).toBe(10);
})

// check index for the 3nd set of pages 11 to 15
test('test calcArrIdx for page 11 should return idx=40', () => {
  expect(calcArrIdx(14)).toBe(30);
})
test('test calcArrIdx for page 11 should return idx=40', () => {
  expect(calcArrIdx(15)).toBe(40);
})
