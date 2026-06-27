import { createFileRoute } from '@tanstack/react-router'
import statement from "/statement.txt?raw"

export const Route = createFileRoute('/')({ component: Home })

interface CardProps {
  title: string;
  description: string;
  author: string;
  image: string;
  href: string;
}

function Card({ title, description, author, image, href }: CardProps) {
  return (
    <a
      className="flex flex-col sm:flex-row w-full max-w-[18rem] sm:max-w-none sm:w-[24rem] h-auto sm:h-44 bg-white border border-gray-100 shadow-xs rounded-xl overflow-hidden hover:shadow-sm transition-shadow"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <div className="w-full sm:w-40 h-40 sm:h-full shrink-0 overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover"
          alt={title}
        />
      </div>

      <div className="p-4 flex flex-col flex-1 min-w-0">
        <p className="font-semibold text-gray-800 text-lg truncate">{title}</p>
        <p className="text-sm text-gray-500 line-clamp-2 sm:line-clamp-3 mt-1 flex-1 text-pretty">
          {description}
        </p>
        <p className="font-medium text-right text-sm text-gray-400 mt-2 shrink-0">
          {author}
        </p>
      </div>
    </a>
  )
}

function MainContent() {
  return (
    <main className="px-16 flex-grow">
      <div className="flex justify-around">
        <img src="/logo.webp" alt="logo" width="512" className="w-60 my-5" />
      </div>
      <h2 className="text-xl font-bold">
        Challenge Statement:
      </h2>
      <div className="flex justify-around mt-2">
        <div className="pr-4 bg-sky-100 rounded-md flex flex-row gap-2 max-w-[60rem] w-full">
          <div className="w-4 h-full bg-sky-500 rounded-l-md mr-1" />
          <p className="italic text-pretty py-2">“{statement.trim()}”</p>
        </div>
      </div>
      <div className="w-full mt-6 grid grid-cols-3 gap-y-4">
        <Card
          title="Game Name"
          description="Short text example that looks absolutely clean now."
          author="Author"
          image="https://lh3.googleusercontent.com/d/1_xkzckhS-blDQZ4q6uLnUDsnpSAgbOK4"
          href="https://google.com"
        />
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 w-full h-16 flex justify-end items-center px-4 text-gray-600 text-sm text-right mt-10">
      <div>
        <p>&copy; {new Date().getFullYear()} Nakuya.</p>
        <p>All Rights Reserved.</p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="bg-[url(/bg.webp)] bg-repeat w-full min-h-screen">
      <div className="w-full flex justify-around min-h-screen">
        <div className="w-[72vw] bg-white flex flex-col min-h-screen">
          <MainContent />
          <Footer />
        </div>
      </div>
    </div>
  )
}
