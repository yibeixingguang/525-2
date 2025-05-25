"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/store/user-store'

const CATEGORIES = [
  '人生规划',
  '短期任务',
  '学习计划',
  '健康目标',
  '娱乐活动',
  '其他'
]

export default function GoalForm() {
  const { addTimeGoal } = useUserStore()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    dueDate: '',
    reminderFrequency: 'once' as 'once' | 'daily' | 'countdown',
    countdownDays: 7,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    addTimeGoal({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      dueDate: new Date(formData.dueDate),
      reminderFrequency: formData.reminderFrequency,
      countdownDays: formData.reminderFrequency === 'countdown' ? Number(formData.countdownDays) : undefined,
    })
    
    // 重置表单
    setFormData({
      title: '',
      description: '',
      category: CATEGORIES[0],
      dueDate: '',
      reminderFrequency: 'once',
      countdownDays: 7,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>创建新的时间目标</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              目标标题
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              描述（可选）
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium">
                分类
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="dueDate" className="block text-sm font-medium">
                截止日期
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="reminderFrequency" className="block text-sm font-medium">
              提醒频率
            </label>
            <select
              id="reminderFrequency"
              name="reminderFrequency"
              value={formData.reminderFrequency}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="once">一次性提醒</option>
              <option value="daily">每日提醒</option>
              <option value="countdown">倒计时提醒</option>
            </select>
          </div>
          
          {formData.reminderFrequency === 'countdown' && (
            <div className="space-y-2">
              <label htmlFor="countdownDays" className="block text-sm font-medium">
                提前提醒天数
              </label>
              <input
                id="countdownDays"
                name="countdownDays"
                type="number"
                min={1}
                max={30}
                value={formData.countdownDays}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>
          )}
          
          <CardFooter className="px-0 pt-4">
            <Button type="submit">创建目标</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
} 