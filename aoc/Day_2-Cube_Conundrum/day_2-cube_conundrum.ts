import * as fs from 'fs';
import * as path from 'path';

// Define an interface to represent the counts of each cube colour
interface CubeCounts {
  red?: number;
  green?: number;
  blue?: number;
}

// Function to parse a game record from a string format into an array of CubeCounts objects
function parseGameRecord(gameData: string): CubeCounts[] {
  // Remove the "Game X:" prefix and any whitespace at the start and end of the string
  const dataWithoutGamePrefix = gameData.replace(/Game \d+: /, '').trim();
  // Split the string into individual sets based on semicolon delimiter
  const sets = dataWithoutGamePrefix.split(';');

  // Map each set to a CubeCounts object
  return sets.map(set => {
    // Split each set into colour components based on comma delimiter
    const colours = set.trim().split(', ');
    // Reduce the array of colour components into a CubeCounts object
    return colours.reduce((acc, colourCount) => {
      // Split each colour component into the count and the colour
      const [count, colour] = colourCount.split(' ');
      // Parse the count as an integer
      const parsedCount = parseInt(count, 10);
      // If the count is a valid number, add it to the accumulative object
      if (!isNaN(parsedCount)) {
        acc[colour as keyof CubeCounts] = (acc[colour as keyof CubeCounts] || 0) + parsedCount;
      }
      return acc;
    }, {} as CubeCounts);
  });
}

// Function to determine if a set of cubes can be built with the available cubes
function isSetPossible(set: CubeCounts, availableCubes: CubeCounts): boolean {
  // Check if every cube colour in the set has a count less than or equal to the available cubes
  return Object.entries(set).every(([colour, count]) => {
    return count !== undefined && count <= availableCubes[colour as keyof CubeCounts];
  });
}

// Function to determine if a game is possible with the available cubes
function isGamePossible(game: CubeCounts[], availableCubes: CubeCounts): boolean {
  // Check if every set in the game is possible to build with the available cubes
  return game.every(set => isSetPossible(set, availableCubes));
}
 
// Function to calculate the sum of game IDs for which the game is possible with the available cubes
function sumOfPossibleGameIds(input: string[], availableCubes: CubeCounts): number {
  // Initialise the sum of game IDs
  let sum = 0;
  // Initialise an array to keep track of possible game IDs
  const possibleGames: number[] = [];

  // Iterate over each game record in the input
  input.forEach(record => {
    // Extract the game ID from the record
    const gameId = parseInt(record.split(':')[0].replace('Game ', ''));
    // Parse the game record into an array of CubeCounts objects
    const game = parseGameRecord(record);
    // Log each game's cube counts
    console.log(`Game ${gameId} cube counts:`, game);
    // If the game is possible with the available cubes, add its ID to the sum and the array
    if (isGamePossible(game, availableCubes)) {
      sum += gameId;
      possibleGames.push(gameId);
    }
  });

  // Log the list of possible game IDs
  console.log('Possible Games:', possibleGames.join(', '));
  // Return the sum of possible game IDs
  return sum;
}

// Resolve the absolute path to the puzzle input file
const inputFilePath = path.join(__dirname, '../../aoc/Day_2-Cube_Conundrum/puzzle_input.txt');

// Read the puzzle input from the file
const input = fs.readFileSync(inputFilePath, 'utf-8');

// Split the input string into an array of records based on newline delimiter
const puzzleInput = input.trim().split('\n');

// Define the counts of available cubes
const availableCubes: CubeCounts = {
  red: 12,
  green: 13,
  blue: 14
};

// Calculate the sum of game IDs for which the game is possible with the available cubes
const result = sumOfPossibleGameIds(puzzleInput, availableCubes);

// Log the sum of possible game IDs
console.log('Sum of Possible Game IDs:', result);