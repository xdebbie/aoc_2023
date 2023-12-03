import * as fs from 'fs';
import * as path from 'path';

// Function to find all numbers in a given line of text
function findNumbersInLine(line: string): string[] {
  const wordToNumber = {
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
  };

  // Array to store found numbers
  let numbers = [];
  // Index to keep track of the current position in the line
  let i = 0;

  // Loop through the line character by character
  while (i < line.length) {
    // Flag to indicate if a spelled-out number is found
    let found = false;
    // Iterate over each spelled-out number and its corresponding digit
    for (const [word, digit] of Object.entries(wordToNumber)) {
      // If a spelled-out number is found at the current position
      if (line.slice(i, i + word.length) === word) {
        // Add the corresponding digit to the numbers array
        numbers.push(digit);
        // Move back one character after the word
        i += word.length - 1; 
        // Set the found flag to true
        found = true;
        // Exit the loop since a number is found
        break;
      }
    }

    // If no spelled-out number is found at the current position
    if (!found) {
      // Check if the current character is a digit
      if (/\d/.test(line[i])) {
        // Add the digit to the numbers array
        numbers.push(line[i]);
      }
      // Move to the next character
      i++;
    }
  }

  // Return the array of found numbers
  return numbers;
}

// Function to get a string of the first and last numbers in the array
function getFirstAndLast(numbers: string[]): string {
  // If no numbers are found, return an empty string
  if (numbers.length === 0) {
    return '';
  }
  // If there's only one number, repeat it for the "first and last" concatenation
  if (numbers.length === 1) {
    return `${numbers[0]}${numbers[0]}`;
  }
  // Concatenate the first and last numbers and return the result
  return `${numbers[0]}${numbers[numbers.length - 1]}`;
}

// Resolve the absolute path to the puzzle input file
const inputFilePath = path.join(__dirname, '../../aoc/Day_1-Trebuchet/puzzle_input.txt');

// Read the puzzle input from the file
const input = fs.readFileSync(inputFilePath, 'utf-8');

// Split the input into lines
const lines = input.split('\n');

let sum = 0;

// Process each line of the input
lines.forEach(line => {
  const numbers = findNumbersInLine(line);
  const firstAndLast = getFirstAndLast(numbers);
  // Add the numeric value of "firstAndLast" to the sum
  sum += Number(firstAndLast);
  console.log(`Line: ${line}`);
  console.log(`Numbers: `, numbers);
  console.log(`First and last: ${firstAndLast}`);
  console.log(`Sum: ${sum}`);
  console.log('-------------------');
});
