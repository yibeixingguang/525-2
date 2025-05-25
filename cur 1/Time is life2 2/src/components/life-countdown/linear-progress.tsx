"use client"

import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { calculateLifePercentage } from '@/lib/utils'
import { useUserStore } from '@/store/user-store'

export default function LinearLifeProgress() {
  const { birthDate, lifeExpectancy } = useUserStore()
  const [progress, setProgress] = useState(0)
  
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
      <div className="space-y-2">
        <p className="text-center text-muted-foreground">请先设置您的出生日期</p>
        <Progress value={0} />
      </div>
    )
  }
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>已度过：{progress.toFixed(6)}%</span>
        <span>剩余：{(100 - progress).toFixed(6)}%</span>
      </div>
      <Progress value={progress} className="h-6" />
    </div>
  )
} 