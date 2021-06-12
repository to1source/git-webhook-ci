// src/lib/helpers.ts

// wrapper to get a timestamp
export const getTimestamp = (): number => Date.now()

// return a random number between min and max
export const getRandomInt = (min: number, max: number): number => (
  Math.floor(Math.random() * (max - min + 1)) + min
)
