import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { generateUniqueId } from '@/lib/utils'

export interface TimeGoal {
  id: string
  title: string
  description?: string
  category: string
  dueDate: Date
  reminderFrequency: 'once' | 'daily' | 'countdown'
  countdownDays?: number
  completed: boolean
  createdAt: Date
}

export interface TimeLog {
  id: string
  date: Date
  content: string
  mood: 'good' | 'neutral' | 'bad'
  tags: string[]
  createdAt: Date
}

interface UserState {
  birthDate: Date | null
  lifeExpectancy: number
  timeGoals: TimeGoal[]
  timeLogs: TimeLog[]
  // Actions
  setBirthDate: (date: Date) => void
  setLifeExpectancy: (years: number) => void
  addTimeGoal: (goal: Omit<TimeGoal, 'id' | 'createdAt' | 'completed'>) => void
  updateTimeGoal: (id: string, updates: Partial<TimeGoal>) => void
  deleteTimeGoal: (id: string) => void
  addTimeLog: (log: Omit<TimeLog, 'id' | 'createdAt'>) => void
  updateTimeLog: (id: string, updates: Partial<TimeLog>) => void
  deleteTimeLog: (id: string) => void
}

// 处理Date对象的序列化和反序列化
const dateReviver = (key: string, value: any) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  if (typeof value === 'string' && datePattern.test(value)) {
    return new Date(value);
  }
  return value;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      birthDate: null,
      lifeExpectancy: 90,
      timeGoals: [],
      timeLogs: [],

      setBirthDate: (date) => set({ birthDate: date }),
      setLifeExpectancy: (years) => set({ lifeExpectancy: years }),

      addTimeGoal: (goal) => set((state) => ({
        timeGoals: [
          ...state.timeGoals,
          {
            ...goal,
            id: generateUniqueId(),
            completed: false,
            createdAt: new Date(),
          }
        ]
      })),

      updateTimeGoal: (id, updates) => set((state) => ({
        timeGoals: state.timeGoals.map((goal) => 
          goal.id === id ? { ...goal, ...updates } : goal
        )
      })),

      deleteTimeGoal: (id) => set((state) => ({
        timeGoals: state.timeGoals.filter((goal) => goal.id !== id)
      })),

      addTimeLog: (log) => set((state) => ({
        timeLogs: [
          ...state.timeLogs,
          {
            ...log,
            id: generateUniqueId(),
            createdAt: new Date(),
          }
        ]
      })),

      updateTimeLog: (id, updates) => set((state) => ({
        timeLogs: state.timeLogs.map((log) => 
          log.id === id ? { ...log, ...updates } : log
        )
      })),

      deleteTimeLog: (id) => set((state) => ({
        timeLogs: state.timeLogs.filter((log) => log.id !== id)
      })),
    }),
    {
      name: 'time-is-life-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        ...state,
        birthDate: state.birthDate ? state.birthDate.toISOString() : null,
        timeGoals: state.timeGoals.map(goal => ({
          ...goal,
          dueDate: goal.dueDate.toISOString(),
          createdAt: goal.createdAt.toISOString(),
        })),
        timeLogs: state.timeLogs.map(log => ({
          ...log,
          date: log.date.toISOString(),
          createdAt: log.createdAt.toISOString(),
        })),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // 恢复Date对象
          if (state.birthDate) {
            state.birthDate = new Date(state.birthDate);
          }
          
          state.timeGoals = state.timeGoals.map(goal => ({
            ...goal,
            dueDate: new Date(goal.dueDate),
            createdAt: new Date(goal.createdAt),
          }));
          
          state.timeLogs = state.timeLogs.map(log => ({
            ...log,
            date: new Date(log.date),
            createdAt: new Date(log.createdAt),
          }));
        }
      },
    }
  )
) 