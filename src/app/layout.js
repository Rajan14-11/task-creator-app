import './globals.css'
import { Inter } from 'next/font/google'
import {Header} from '@/app/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Task App',
  description: 'Task app to create tasks according to priority',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Header/>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
