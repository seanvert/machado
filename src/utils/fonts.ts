import { Oswald } from 'next/font/google'

export const fontOswald = Oswald({
    subsets: ['latin'],
    variable: '--font-oswald',
  })

export const oswald = fontOswald.variable;
