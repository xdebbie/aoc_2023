import * as fs from 'fs';
import * as path from 'path';

function calculateCalibrationSum(input: string): number {
  // Split the input into an array of lines
  const lines = input.split('\n');
  let sum = 0; 

  // Iterate over each line
  for (const line of lines) {
    // Extract all digits from the line
    const digits = line.match(/\d/g);

    if (digits) {
      let calibrationValue = 0;

      // Check the number of digits extracted
      if (digits.length === 1) {
        // If there's only one digit, duplicate it to form a double-digit number
        calibrationValue = parseInt(digits[0] + digits[0]);
      } else {
        // If there are more than one digit, combine the first and last digits
        calibrationValue =
          parseInt(digits[0]) * 10 + parseInt(digits[digits.length - 1]);
      }

      // Add the calibration value to the sum
      sum += calibrationValue;
    }
  }

  return sum;
}

// Resolve the absolute path to the puzzle input file
const inputFilePath = path.join(__dirname, '../../aoc/Day_1-Trebuchet/puzzle_input.txt');

// Read the puzzle input from the file
const input = fs.readFileSync(inputFilePath, 'utf-8');

// Calculate the sum of calibration values
const sum = calculateCalibrationSum(input);

console.log(`The sum of all calibration values is: ${sum}`);