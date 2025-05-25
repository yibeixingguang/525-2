"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/store/user-store'
import { formatDateToLocalString } from '@/lib/utils'

export default function BirthDateForm() {
  const { birthDate, setBirthDate, lifeExpectancy, setLifeExpectancy } = useUserStore()
  const [date, setDate] = useState<string>(
    birthDate instanceof Date ? birthDate.toISOString().split('T')[0] : ''
  )
  const [expectancy, setExpectancy] = useState<number>(lifeExpectancy)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (date) {
      setBirthDate(new Date(date))
    }
    setLifeExpectancy(expectancy)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>生命信息设置</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="birthdate" className="block text-sm font-medium">
              出生日期
            </label>
            <input
              type="date"
              id="birthdate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            />
            {birthDate instanceof Date && (
              <p className="text-sm text-muted-foreground">
                当前设置: {formatDateToLocalString(birthDate)}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="expectancy" className="block text-sm font-medium">
              预期寿命 (年)
            </label>
            <input
              type="number"
              id="expectancy"
              min={1}
              max={150}
              value={expectancy}
              onChange={(e) => setExpectancy(parseInt(e.target.value))}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            />
            <p className="text-sm text-muted-foreground">
              调整预期寿命以更准确地计算时间
            </p>
          </div>
          <CardFooter className="px-0 pt-4">
            <Button type="submit">保存设置</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
} 