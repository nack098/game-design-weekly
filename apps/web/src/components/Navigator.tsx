import { Link } from '@tanstack/react-router'
import { HistoryIcon, HomeIcon, InfoIcon, LayersIcon } from 'lucide-react'

export function Navigator() {
  return (
    <nav className="fixed left-16 top-[25%] z-10">
      <div className="flex flex-row gap-2 items-center text-center">
        <LayersIcon className="inline bg-white rounded-full p-1 z-50" width={24} />
        <p className="text-orange-400 text-outline-white text-sm inline">CONTENTS</p>
      </div>
      <div className="flex flex-row gap-7 -mt-2 ml-[0.7rem]">
        <div className="w-[0.095rem] bg-orange-400 [box-shadow:0_0_2px_1px_white]" />
        <ul className="flex flex-col gap-4 text-black text-outline-white drop-shadow-md pt-5">
          <li className="transition-colors hover:text-orange-400 duration-150">
            <Link
              to="/"
              href="/#top"
              activeOptions={{ exact: true }}
              activeProps={{ className: 'text-orange-400' }}
              className="flex items-center gap-2"
            >
              <HomeIcon width={16} className="icon-outline-white" /> Top
            </Link>
          </li>
          <li className="transition-colors hover:text-orange-400 duration-150">
            <Link
              to="/history"
              activeProps={{ className: 'text-orange-400' }}
              className="flex items-center gap-2"
            >
              <HistoryIcon width={16} className="icon-outline-white" /> Challenge History
            </Link>
          </li>
          <li className="transition-colors hover:text-orange-400 duration-150">
            <Link
              to="/about"
              activeProps={{ className: 'text-orange-400' }}
              className="flex items-center gap-2"
            >
              <InfoIcon width={16} className="icon-outline-white" /> About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
