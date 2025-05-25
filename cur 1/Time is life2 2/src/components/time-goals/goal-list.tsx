"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/store/user-store'
import { formatDateToLocalString } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function GoalList() {
  const { timeGoals, updateTimeGoal, deleteTimeGoal } = useUserStore()
  const [filter, setFilter] = useState<string>('all')
  
  const filteredGoals = timeGoals.filter(goal => {
    if (filter === 'all') return true
    if (filter === 'completed') return goal.completed
    if (filter === 'active') return !goal.completed
    return goal.category === filter
  })
  
  // 获取所有唯一分类
  const uniqueCategories = Array.from(new Set(timeGoals.map(goal => goal.category)))
  const categories = ['all', 'active', 'completed', ...uniqueCategories]
  
  const handleToggleComplete = (id: string) => {
    const goal = timeGoals.find(g => g.id === id)
    if (goal) {
      updateTimeGoal(id, { completed: !goal.completed })
    }
  }
  
  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>您的时间目标</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {filteredGoals.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {filter === 'all' 
              ? '还没有创建任何目标，开始添加一个吧!' 
              : '没有符合当前筛选条件的目标。'}
          </p>
        ) : (
          <ul className="space-y-3">
            {filteredGoals.map((goal) => {
              const daysRemaining = getDaysRemaining(goal.dueDate)
              const isOverdue = daysRemaining < 0 && !goal.completed
              
              return (
                <motion.li 
                  key={goal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-md border ${
                    goal.completed 
                      ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/20' 
                      : isOverdue
                      ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/20'
                      : 'bg-background border-border'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {goal.title}
                        </h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10">
                          {goal.category}
                        </span>
                      </div>
                      
                      {goal.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {goal.description}
                        </p>
                      )}
                      
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span>
                          到期日: {formatDateToLocalString(goal.dueDate)}
                        </span>
                        <span className="mx-2">•</span>
                        <span className={isOverdue ? 'text-red-500' : ''}>
                          {goal.completed 
                            ? '已完成' 
                            : isOverdue
                            ? `已逾期 ${Math.abs(daysRemaining)} 天`
                            : `剩余 ${daysRemaining} 天`}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleComplete(goal.id)}
                      >
                        {goal.completed ? '撤销' : '完成'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTimeGoal(goal.id)}
                        className="text-red-500"
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
} 