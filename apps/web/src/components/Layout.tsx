import type { ReactNode } from 'react'

import { Footer } from './Footer'
import { Logo } from './Logo'
import { Navigator } from './Navigator'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigator />
      <div className="w-full min-h-screen block">
        <div className="w-[85%] md:w-[75%] bg-white flex flex-col min-h-screen mx-auto">
          <main className="px-16 grow" id="top">
            <Logo />
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
