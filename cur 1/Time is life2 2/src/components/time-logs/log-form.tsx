"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/store/user-store'

const MOOD_OPTIONS = [
  { value: 'good', label: '好心情' },
  { value: 'neutral', label: '一般' },
  { value: 'bad', label: '不太好' },
]

const COMMON_TAGS = [
  '工作', '学习', '运动', '娱乐', '家庭', '社交', '休息', '反思'
]

export default function LogForm() {
  const { addTimeLog } = useUserStore()
  const [formData, setFormData] = useState({
    content: '',
    mood: 'neutral' as 'good' | 'neutral' | 'bad',
    date: new Date().toISOString().split('T')[0],
    tags: [] as string[],
    customTag: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTagToggle = (tag: string) => {
    setFormData(prev => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
      return { ...prev, tags: newTags }
    })
  }

  const handleAddCustomTag = () => {
    if (formData.customTag.trim() && !formData.tags.includes(formData.customTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.customTag.trim()],
        customTag: '',
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    addTimeLog({
      content: formData.content,
      mood: formData.mood,
      date: new Date(formData.date),
      tags: formData.tags,
    })
    
    // 重置表单
    setFormData({
      content: '',
      mood: 'neutral',
      date: new Date().toISOString().split('T')[0],
      tags: [],
      customTag: '',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>记录今日时间日志</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium">
              日期
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-medium">
              内容
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              placeholder="记录今天的感想、收获或者反思..."
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="mood" className="block text-sm font-medium">
              今日心情
            </label>
            <select
              id="mood"
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              {MOOD_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              标签
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_TAGS.map(tag => (
                <Button
                  key={tag}
                  type="button"
                  variant={formData.tags.includes(tag) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
            
            <div className="flex mt-2">
              <input
                type="text"
                value={formData.customTag}
                onChange={(e) => setFormData(prev => ({ ...prev, customTag: e.target.value }))}
                placeholder="添加自定义标签"
                className="flex-1 rounded-l-md border border-input bg-background px-3 py-2"
              />
              <Button
                type="button"
                onClick={handleAddCustomTag}
                className="rounded-l-none"
                disabled={!formData.customTag.trim()}
              >
                添加
              </Button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-1">已选标签:</p>
                <div className="flex flex-wrap gap-1">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 inline-flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className="ml-1 h-4 w-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button type="submit">保存日志</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
} 