import { Sns } from './Sns'

export function Footer() {
  return (
    <footer className="bg-gray-100 w-full h-12 flex justify-between items-center px-4 text-gray-500 text-xs mt-10">
      <Sns />
      <p>&copy; {new Date().getFullYear()} Nakuya. All Rights Reserved.</p>
    </footer>
  )
}
