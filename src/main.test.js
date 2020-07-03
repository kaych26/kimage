const { calcTotalPages, getImages, displayResults}= require('./main');

test('test calcTotalPages - total/10', () => {
  expect(calcTotalPages(60)).toBe(6);
})
