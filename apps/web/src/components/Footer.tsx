import { Sns } from './Sns'

export function Footer() {
  return (
    <footer className="bg-gray-100 w-full h-24 md:h-12 gap-2 md:gap-0 flex flex-col md:flex-row justify-center md:justify-between items-center px-4 text-gray-500 text-xs mt-10">
      <Sns />
      <p>&copy; {new Date().getFullYear()} Nakuya. All Rights Reserved.</p>
    </footer>
  )
}
