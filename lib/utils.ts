import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateZodiacSign(birthDate: Date): string {
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1 // JavaScript months are 0-indexed

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "Áries"
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "Touro"
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return "Gêmeos"
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return "Câncer"
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "Leão"
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "Virgem"
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return "Libra"
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return "Escorpião"
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "Sagitário"
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "Capricórnio"
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "Aquário"
  } else {
    return "Peixes"
  }
}

export function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    Vermelho: "#FF5555",
    Amarelo: "#FFD700",
    Azul: "#5555FF",
    Laranja: "#FFA500",
    Verde: "#55AA55",
    Roxo: "#8A2BE2",
    "": "#FF69B4", // Default color (pink)
  }

  return colorMap[colorName] || colorMap[""]
}
