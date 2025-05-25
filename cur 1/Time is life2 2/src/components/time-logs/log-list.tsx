"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/store/user-store'
import { formatDateToLocalString } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function LogList() {
  const { timeLogs, deleteTimeLog } = useUserStore()
  const [filter, setFilter] = useState<string>('all')
  
  const sortedLogs = [...timeLogs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  // 获取所有唯一标签
  const allTags = Array.from(
    new Set(timeLogs.flatMap(log => log.tags))
  )
  
  const filteredLogs = sortedLogs.filter(log => {
    if (filter === 'all') return true
    if (filter === 'good' || filter === 'neutral' || filter === 'bad') {
      return log.mood === filter
    }
    return log.tags.includes(filter)
  })
  
  // 为心情创建不同的样式
  const getMoodStyle = (mood: 'good' | 'neutral' | 'bad') => {
    switch (mood) {
      case 'good':
        return 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/20'
      case 'bad':
        return 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/20'
      default:
        return 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/20'
    }
  }
  
  const getMoodEmoji = (mood: 'good' | 'neutral' | 'bad') => {
    switch (mood) {
      case 'good': return '😊'
      case 'bad': return '😔'
      default: return '😐'
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>您的时间日志</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            全部
          </Button>
          <Button
            variant={filter === 'good' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('good')}
          >
            好心情 😊
          </Button>
          <Button
            variant={filter === 'neutral' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('neutral')}
          >
            一般 😐
          </Button>
          <Button
            variant={filter === 'bad' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('bad')}
          >
            不好 😔
          </Button>
          
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={filter === tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(tag)}
            >
              #{tag}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {filteredLogs.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {filter === 'all' 
              ? '还没有记录任何日志，开始添加一个吧!' 
              : '没有符合当前筛选条件的日志。'}
          </p>
        ) : (
          <ul className="space-y-4">
            {filteredLogs.map((log) => (
              <motion.li 
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-md border ${getMoodStyle(log.mood)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <time className="text-sm font-medium">
                        {formatDateToLocalString(log.date)}
                      </time>
                      <span className="text-xl" title={log.mood}>
                        {getMoodEmoji(log.mood)}
                      </span>
                    </div>
                    
                    <p className="whitespace-pre-line">{log.content}</p>
                    
                    {log.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {log.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs rounded-full bg-primary/10 inline-flex items-center"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTimeLog(log.id)}
                    className="text-red-500"
                  >
                    删除
                  </Button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
} 