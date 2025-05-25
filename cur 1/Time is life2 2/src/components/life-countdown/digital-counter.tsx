"use client"

import { useEffect, useState } from 'react'
import { calculateRemainingTime } from '@/lib/utils'
import { useUserStore } from '@/store/user-store'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CounterBoxProps {
  value: number
  label: string
  color?: string
}

const CounterBox = ({ value, label, color = 'bg-primary/10' }: CounterBoxProps) => (
  <div className="flex flex-col items-center">
    <motion.div 
      className={cn(
        "flex items-center justify-center w-20 h-20 rounded-lg text-3xl font-bold mb-2",
        color
      )}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {value}
    </motion.div>
    <span className="text-sm text-muted-foreground">{label}</span>
  </div>
)

export default function DigitalCounter() {
  const { birthDate, lifeExpectancy } = useUserStore()
  const [timeRemaining, setTimeRemaining] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  useEffect(() => {
    if (!(birthDate instanceof Date)) return
    
    const updateCounter = () => {
      const remaining = calculateRemainingTime(birthDate, lifeExpectancy)
      setTimeRemaining(remaining)
    }
    
    updateCounter()
    const interval = setInterval(updateCounter, 1000) // Update every second
    
    return () => clearInterval(interval)
  }, [birthDate, lifeExpectancy])
  
  if (!(birthDate instanceof Date)) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-center text-muted-foreground mb-4">请先设置您的出生日期</p>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-medium mb-6">剩余生命倒计时</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <CounterBox value={timeRemaining.years} label="年" color="bg-purple-100 dark:bg-purple-900/20" />
        <CounterBox value={timeRemaining.months} label="月" color="bg-blue-100 dark:bg-blue-900/20" />
        <CounterBox value={timeRemaining.days} label="日" color="bg-green-100 dark:bg-green-900/20" />
        <CounterBox value={timeRemaining.hours} label="时" color="bg-yellow-100 dark:bg-yellow-900/20" />
        <CounterBox value={timeRemaining.minutes} label="分" color="bg-orange-100 dark:bg-orange-900/20" />
        <CounterBox value={timeRemaining.seconds} label="秒" color="bg-red-100 dark:bg-red-900/20" />
      </div>
    </div>
  )
} 