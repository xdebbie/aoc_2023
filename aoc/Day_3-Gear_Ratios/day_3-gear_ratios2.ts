import * as fs from 'fs';
import * as path from 'path';

// Resolve the absolute path to the puzzle input file
const inputFilePath = path.join(__dirname, '../../aoc/Day_3-Gear_Ratios/puzzle_input.txt');

// Read the puzzle input from the file
const input = fs.readFileSync(inputFilePath, 'utf-8').trim();

// Process the input
const rows = input.split('\n');
// Determine the number of rows (height) and the length of each row (width)
const height = rows.length;
const width = rows[0].length;

// Check if a character is a digit
const isDigit = (char: string): boolean => /\d/.test(char);

// Get adjacent numbers for a given position
// It also takes a set of 'seen' positions to avoid processing the same number multiple times
const getAdjacent = (x: number, y: number, seenPositions: Set<string>): number[] => {
  const partNumbers: number[] = [];
  // Look at each position in a 3x3 grid centered on (x, y)
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      // Skip the center position, which is the original (x, y)
      if (dx === 0 && dy === 0) continue;
       // Calculate the new coordinates
      const nx = x + dx;
      const ny = y + dy;
      // Check if the new coordinates are within bounds and if the character at that position is a digit
      if (nx >= 0 && nx < width && ny >= 0 && ny < height && isDigit(rows[ny][nx])) {
        // Find the start of the number by moving left until we hit a non-digit
        let numStart = nx;
        while (numStart > 0 && isDigit(rows[ny][numStart - 1])) {
          numStart--;
        }

        // Create a unique key to represent this number's starting position
        const positionKey = `${ny},${numStart}`;
        // If we've already seen this number, continue to the next position
        if (seenPositions.has(positionKey)) continue;

        // Extract the number starting from the calculated start position
        const match = rows[ny].substring(numStart).match(/^\d+/);
        if (match) {
          const num = parseInt(match[0], 10);
          // Add the number to the list of adjacent numbers
          partNumbers.push(num);
          // Mark this number's starting position as seen
          seenPositions.add(positionKey);

          // Log the adjacent number found
          console.log(`Adjacent number found at (${ny},${numStart}): ${num}`);
        }
      }
    }
  }
  return partNumbers;
};

// Calculate the sum of products of adjacent numbers by iterating through each row and character
const sumOfProducts = rows.reduce((total, row, y) => {
  // Keep track of positions of numbers we've already processed
  const seenPositions = new Set<string>();
  // Accumulate the sum of products for the current row
  return total + row.split('').reduce((acc, char, x) => {
    // If the character is '*', find the adjacent numbers
    if (char === '*') {
      const adjacentNumbers = getAdjacent(x, y, seenPositions);
      // If there are exactly two adjacent numbers, multiply them and add to the accumulator
      if (adjacentNumbers.length === 2) {
        // Multiply the two adjacent numbers and add the product to the running total for the row
        return acc + adjacentNumbers[0] * adjacentNumbers[1];
      }
    }
    // If the character is not '*', just return the accumulator as-is
    return acc;
  }, 0);
}, 0);

// Calculate the sum of products of all gear ratios
console.log(`The sum of products of adjacent numbers is: ${sumOfProducts}`);