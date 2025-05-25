import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/layout/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Time is Life - 珍惜生命的每一刻',
  description: '生命有限，好好珍惜每一分每一秒。管理您的时间目标，记录生活点滴，意识生命的珍贵。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Navbar />
        <main className="container py-6">
          {children}
        </main>
      </body>
    </html>
  )
} 