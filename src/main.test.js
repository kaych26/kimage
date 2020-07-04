import { calcTotalPages, calcArrIdx } from './main';

test('test calcTotalPages - total/10', () => {
  expect(calcTotalPages(50)).toBe(5);
})

// check the correct array idx is used for selected img page
test('test calcArrIx for page 1 should return idx=0', () => {
  expect(calcArrIdx(1)).toBe(0);
})
test('test calcArrIdx for page 2 should return idx=10', () => {
  expect(calcArrIdx(2)).toBe(10);
})
test('test calcArrIdx for page 3 should return idx=30', () => {
  expect(calcArrIdx(3)).toBe(20);
})
test('test calcArrIdx for page 4 should return idx=30', () => {
  expect(calcArrIdx(4)).toBe(30);
})
test('test calcArrIdx for page 5 should return idx=40', () => {
  expect(calcArrIdx(5)).toBe(40);
})

