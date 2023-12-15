import * as fs from 'fs';
import * as path from 'path';

// Resolve the absolute path to the puzzle input file
const inputFilePath = path.join(__dirname, '../../aoc/Day_4-Scratchcards/puzzle_input.txt');

// Read the puzzle input from the file
const input = fs.readFileSync(inputFilePath, 'utf-8');

// Split the input string into an array of records based on newline delimiter
const puzzleInput = input.trim().split('\n');

const calculateCardPoints = (card: string): number => {
    // Debugging: Log the card to see its format
    console.log(`Card being processed: ${card}`);
  
    // Attempt to split the card into winning numbers and card numbers
    const parts = card.split("|").map(part => part.trim());
  
    // Debugging: Log the parts to see if they are as expected
    console.log(`Parts: ${parts}`);
  
    // Check if the parts array has two elements
    if (parts.length !== 2 || !parts[0].includes(':')) {
      console.error(`Invalid card format: ${card}`);
      return 0;
    }
  
    // Extract winning numbers and card numbers
    const winningNumbersPart = parts[0];
    const cardNumbersPart = parts[1];
  
    // Debugging: Log the winning numbers part and card numbers part
    console.log(`Winning numbers part: ${winningNumbersPart}`);
    console.log(`Card numbers part: ${cardNumbersPart}`);
  
    const winningNumbers = new Set(winningNumbersPart.split(":")[1].trim().split(/\s+/).map(Number));
  
    // Calculate card points
    return cardNumbersPart
      .split(/\s+/)
      .map(Number)
      .reduce((acc, number) => winningNumbers.has(number) ? (acc === 0 ? 1 : acc * 2) : acc, 0);
  };

const sum = puzzleInput.reduce((acc, card) => acc + calculateCardPoints(card), 0);

console.log(`The total points for the scratchcards is: ${sum}`);