import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateToLocalString(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN').format(date)
}

export function calculateLifePercentage(birthDate: Date, lifeExpectancy: number = 90): number {
  const today = new Date()
  const totalLifeExpectancyInMs = lifeExpectancy * 365.25 * 24 * 60 * 60 * 1000
  const livedTimeInMs = today.getTime() - birthDate.getTime()
  
  return Math.min(100, Math.max(0, (livedTimeInMs / totalLifeExpectancyInMs) * 100))
}

export function calculateRemainingTime(birthDate: Date, lifeExpectancy: number = 90): {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
} {
  const today = new Date()
  const birthYear = birthDate.getFullYear()
  const endDate = new Date(birthYear + lifeExpectancy, birthDate.getMonth(), birthDate.getDate())
  
  let diffInMs = endDate.getTime() - today.getTime()
  if (diffInMs < 0) diffInMs = 0
  
  const seconds = Math.floor(diffInMs / 1000) % 60
  const minutes = Math.floor(diffInMs / (1000 * 60)) % 60
  const hours = Math.floor(diffInMs / (1000 * 60 * 60)) % 24
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) % 30
  const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30)) % 12
  const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25))
  
  return { years, months, days, hours, minutes, seconds }
}

export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
} 