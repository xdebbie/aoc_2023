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
      // Parse the count as an integer.
      const parsedCount = parseInt(count, 10);
      // If the count is a valid number, add it to the accumulative object
      if (!isNaN(parsedCount)) {
        acc[colour as keyof CubeCounts] = (acc[colour as keyof CubeCounts] || 0) + parsedCount;
      }
      return acc;
    }, {} as CubeCounts);
  });
}

// Define a function to find the minimum set of cubes needed for a game
function findMinimumSetForGame(game: CubeCounts[]): CubeCounts {
  // Initialise an empty object to store the minimum set of cube counts
  const minimumSet: CubeCounts = {};

  // Iterate over each set of cube counts in the game
  game.forEach(set => {
    // For each colour in the current set...
    Object.keys(set).forEach((colour) => {
      // If the colour is not yet in the minimum set or the current count is greater than what's stored...
      if (!minimumSet[colour] || set[colour] > minimumSet[colour]) {
        // Update the minimum set with the current count
        minimumSet[colour] = set[colour];
      }
    });
  });

  // Return the calculated minimum set of cubes
  return minimumSet;
}

// Define a function to calculate the power of a set of cubes
function calculatePowerOfSet(set: CubeCounts): number {
  // Reduce the values of the set by multiplying them together, starting with an initial value of 1
  // If a count is missing (undefined), it is treated as 0
  return Object.values(set).reduce((acc, count) => acc * (count || 0), 1);
}

// Function to calculate the sum of powers for all games and log details
function sumOfPowersForAllGames(input: string[]): number {
  // Parse the input strings to an array of games represented by CubeCounts
  const games = input.map(parseGameRecord);
  let runningTotal = 0;

  // Iterate over each game, calculate and log the minimum set, power, and update the running total
  games.forEach((game, index) => {
    // Find the minimum set of cubes for the current game
    const minimumSet = findMinimumSetForGame(game);
    // Calculate the power of the minimum set
    const power = calculatePowerOfSet(minimumSet);
    // Add the power to the running total
    runningTotal += power;
    // Log the game number, minimum set, power of the set, and the current sum of powers
    console.log(`Game ${index + 1}:`, minimumSet, `Power:`, power, `Current Sum:`, runningTotal);
  });

  // Return the final sum of powers
  return runningTotal;
}

// Resolve the absolute path to the puzzle input file
const inputFilePath = path.join(__dirname, '../../aoc/Day_2-Cube_Conundrum/puzzle_input.txt');

// Read the puzzle input from the file
const input = fs.readFileSync(inputFilePath, 'utf-8');

// Split the input string into an array of records based on newline delimiter
const puzzleInput = input.trim().split('\n');

// Calculate the sum of powers for all games
const totalPower = sumOfPowersForAllGames(puzzleInput);

// Log the sum of the power of minimum sets
console.log('Sum of the power of minimum sets:', totalPower);