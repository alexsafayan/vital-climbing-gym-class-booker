import SpecialDate from './src/SpecialDate.js';

// Test case for January 27, 2025
const testDate = new SpecialDate('2025-01-27');

console.log('Numeric format:', testDate.toNumericFormat());
console.log('Long format:', testDate.toLongFormat());

// Test with different formats to ensure consistency
console.log('\nAdditional test cases:');
const dates = [
    '2025-01-01',  // New Year
    '2025-12-31',  // Year end
    '2025-02-28',  // February
];

dates.forEach(dateStr => {
    const specialDate = new SpecialDate(dateStr);
    console.log(`\nTesting date: ${dateStr}`);
    console.log('Numeric:', specialDate.toNumericFormat());
    console.log('Long:', specialDate.toLongFormat());
});
