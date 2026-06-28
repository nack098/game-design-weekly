import type { ReactNode } from 'react'

import { Footer } from './Footer'
import { Logo } from './Logo'
import { Navigator } from './Navigator'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigator />
      <div className="w-full flex justify-around min-h-screen">
        <div className="w-[72vw] bg-white flex flex-col min-h-screen">
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
