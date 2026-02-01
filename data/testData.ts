// data/testData.ts
export const TEST_DATA = {
  search: {
    validGame: 'Loading Rush', 
    invalidGame: 'NonExistentGame123',
    maxLengthInput: 'a'.repeat(51), // Vygeneruje 51 znaků
  },
  contact: {
    validEmail: 'jsilbersky@gmail.com',
    invalidEmail: 'test.example.com', // Chybí zavináč
    shortMessage: 'Hello!', // Nesplňuje minimální počet znaků pro úspěšné odeslání
    longMessage: 'This is a test message.', // Splňuje minimální počet znaků pro úspěšné odeslání
  }
};