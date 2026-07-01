import { Link } from '@tanstack/react-router'
import { HistoryIcon, HomeIcon, InfoIcon, LayersIcon, Loader2Icon, LogInIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { useState } from 'react';
import { Overlay } from './Overlay';
import { useAuth } from '#/hooks/useAuth';


export function Navigator() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoginOverlayOpen, setIsLoginOverlayOpen] = useState<boolean>(false);
  const { isAuth, user, loginWithSSO, logout, loading } = useAuth();

  return (
    <>
      <nav className="fixed top-5 right-5 md:right-auto md:left-16 md:top-[25%] z-40 pointer-events-none">
        <div className="hidden md:block pointer-events-auto">
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
                  hash="top"
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

          <div className="flex flex-row gap-7 mt-10 ml-[0.7rem]">
            <div className="w-[0.095rem] bg-sky-500 [box-shadow:0_0_2px_1px_white]" />
            <ul className="flex flex-col gap-4 text-black text-outline-white drop-shadow-md">
              {loading ? (
                <li className="text-sky-500 font-medium flex items-center gap-2 select-none">
                  <Loader2Icon width={16} className="animate-spin icon-outline-white" />
                </li>
              ) : isAuth ? (
                <>
                  <li className="transition-colors hover:text-sky-500 duration-150">
                    <span className="flex items-center gap-2 text-sky-500">
                      <img src={user?.user_metadata?.avatar_url} width={16} height={16} className="rounded-full border icon-outline-white" /> {user?.user_metadata?.full_name || user?.email}
                    </span>
                  </li>
                  <li className="transition-colors hover:text-sky-500 duration-150">
                    <button onClick={logout} className="flex items-center gap-2 cursor-pointer">
                      <LogOutIcon width={16} className="icon-outline-white" /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="transition-colors hover:text-orange-400 duration-150">
                  <button
                    onClick={loginWithSSO}
                    className="flex items-center gap-2 cursor-pointer text-orange-400 font-bold"
                  >
                    <LogInIcon width={16} className="icon-outline-white" /> Log In with SSO
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="block md:hidden pointer-events-auto">
          <div className="fixed bg-red-600 rounded-full w-12 h-12 translate-y-[-4%] translate-x-[-4%] z-50 pointer-events-none" />
          <button
            className="relative z-50 cursor-pointer rounded-full bg-black w-11 h-11 flex flex-col justify-center items-center"
            onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen) }}
            aria-label="Toggle Menu"
          >
            <div className="relative w-4 h-3 flex flex-col justify-between items-center">
              <span
                className={`block w-4 h-[0.02rem] bg-white transition-all duration-300
              ${isOpen ? "translate-y-1.5 rotate-45" : "rotate-0"}`}
              />
              <span
                className={`block w-4 h-[0.02rem] bg-white transition-all duration-300
              ${isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
              />
              <span
                className={`block w-4 h-[0.02rem] bg-white transition-all duration-300
              ${isOpen ? "translate-x-[-0.04rem] -translate-y-1.5 -rotate-45" : "rotate-0"}`}
              />
            </div>
          </button>

          <div className={`fixed top-0 right-0 z-30 bg-white w-screen h-screen ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
            <div className="flex flex-row h-full w-full">
              <div className="flex-1 h-full bg-[url(/bg.webp)] bg-repeat bg-size-[7rem] bg-center shrink-0">
                <div className="flex w-full h-full justify-center items-center p-12">
                  <img src="/logo.webp" alt="Logo" width={256} className="w-42" />
                </div>
              </div>

              <div className="flex-1 min-w-68">
                <ul className="flex flex-col gap-3 text-black text-outline-white pt-5 ml-6 my-5 text-sm">
                  <li className="transition-colors hover:text-orange-400 duration-150">
                    <Link
                      to="/"
                      hash="top"
                      activeOptions={{ exact: true }}
                      activeProps={{ className: 'text-orange-400' }}
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <HomeIcon width={16} className="icon-outline-white" /> Top
                    </Link>
                  </li>
                  <li className="transition-colors hover:text-orange-400 duration-150">
                    <Link
                      to="/history"
                      activeProps={{ className: 'text-orange-400' }}
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <HistoryIcon width={16} className="icon-outline-white" /> Challenge History
                    </Link>
                  </li>
                  <li className="transition-colors hover:text-orange-400 duration-150">
                    <Link
                      to="/about"
                      activeProps={{ className: 'text-orange-400' }}
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <InfoIcon width={16} className="icon-outline-white" /> About
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Overlay isOpen={isLoginOverlayOpen} onClose={() => { setIsLoginOverlayOpen(false) }}>
        <div className="w-32 h-32 bg-white rounded p-4">
        </div>
      </Overlay>
    </>
  )
}
