import * as fs from 'fs';
import * as path from 'path';

// Helper function to check if a character is a symbol (not a period or digit)
function isSymbol(char: string): boolean {
  return char !== '.' && !char.match(/\d/);
}
  
// Check if any digit of a number is next to a symbol in the grid
function isNextToSymbol(grid: string[][], row: number, col: number, length: number): boolean {
  // All possible adjacent positions including diagonal
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];
  
  // Check each digit of the number for adjacent symbols
  for (let i = 0; i < length; i++) {
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc + i;
      // Ensure the new position is within bounds
      if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[row].length) {
        if (isSymbol(grid[newRow][newCol])) {
          return true;
        }
      }
    }
  }
  
  return false;
}
  
// Main function to sum and log part numbers that are adjacent to symbols
function sumAndLogPartNumbers(schematic: string[]): number {
  // Convert the schematic to a 2D character grid
  const grid = schematic.map(line => [...line]);
  let sum = 0;
  const partNumbers: string[] = [];
  
  // Iterate through each row of the grid
  for (let row = 0; row < grid.length; row++) {
    // Iterate through each column of the current row
    for (let col = 0; col < grid[row].length;) {
      // Check if current character is a digit
      if (grid[row][col].match(/\d/)) {
        let number = grid[row][col];
        let checkCol = col + 1;
  
        // Collect the full number if it's more than one digit
        while (checkCol < grid[row].length && grid[row][checkCol].match(/\d/)) {
          number += grid[row][checkCol];
          checkCol++;
        }
  
        // Check if the entire number (or any digit within it) is adjacent to a symbol
        if (isNextToSymbol(grid, row, col, number.length)) {
          sum += parseInt(number, 10);
          partNumbers.push(number);
        }
  
        // Skip over the full length of the number
        col = checkCol;
      } else {
        // Move to the next column if current character is not a digit
        col++;
      }
    }
  }
  
  // Log the part numbers that are adjacent to a symbol
  console.log('Part numbers adjacent to a symbol:', partNumbers);
    
  return sum;
}

// Resolve the absolute path to the puzzle input file
const inputFilePath = path.join(__dirname, '../../aoc/Day_3-Gear_Ratios/puzzle_input.txt');

// Read the puzzle input from the file
const input = fs.readFileSync(inputFilePath, 'utf-8');

// Split the input string into an array of records based on newline delimiter
const puzzleInput = input.trim().split('\n');

// Calculate the sum of all part numbers
const sumOfPartNumbers = sumAndLogPartNumbers(puzzleInput);
console.log(`The sum of all part numbers is: ${sumOfPartNumbers}`);