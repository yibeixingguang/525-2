"use client"

import { useEffect, useState } from 'react'
import { calculateLifePercentage } from '@/lib/utils'
import { useUserStore } from '@/store/user-store'
import { motion } from 'framer-motion'

export default function CircularLifeProgress() {
  const { birthDate, lifeExpectancy } = useUserStore()
  const [progress, setProgress] = useState(0)
  
  const radius = 85
  const circumference = 2 * Math.PI * radius
  
  useEffect(() => {
    if (!(birthDate instanceof Date)) return
    
    const updateProgress = () => {
      const percentage = calculateLifePercentage(birthDate, lifeExpectancy)
      setProgress(percentage)
    }
    
    updateProgress()
    const interval = setInterval(updateProgress, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [birthDate, lifeExpectancy])
  
  if (!(birthDate instanceof Date)) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-muted-foreground mb-4">请先设置您的出生日期</p>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeOpacity="0.2"
          />
        </svg>
      </div>
    )
  }
  
  const strokeDashoffset = circumference - (progress / 100) * circumference
  
  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeOpacity="0.2"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1 }}
          transform="rotate(-90 100 100)"
          strokeLinecap="round"
        />
        <text
          x="100"
          y="100"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold"
        >
          {progress.toFixed(2)}%
        </text>
        <text
          x="100"
          y="125"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm"
        >
          已度过
        </text>
      </svg>
    </div>
  )
} 