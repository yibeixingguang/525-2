"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-md text-sm font-medium transition ${
        isActive 
          ? 'text-primary' 
          : 'text-muted-foreground hover:text-primary'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
          layoutId="navbar-indicator"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  )
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            Time is Life
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-1">
          <NavItem href="/">主视图</NavItem>
          <NavItem href="/goals">时间目标</NavItem>
          <NavItem href="/logs">时间日志</NavItem>
          <NavItem href="/settings">设置</NavItem>
        </div>
        
        <div className="md:hidden flex items-center">
          <Link 
            href="/" 
            className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition"
          >
            主视图
          </Link>
          <button className="p-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
} 