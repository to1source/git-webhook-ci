// src/lib/helpers.ts

import debug from 'debug'

// this way we don't need to import everywhere and get back the debug namespace
export const debugFn = (name: string) => debug(name)

// wrapper to get a timestamp
export const getTimestamp = (): number => Date.now()

// return a random number between min and max
export const getRandomInt = (min: number, max: number): number => (
  Math.floor(Math.random() * (max - min + 1)) + min
)
