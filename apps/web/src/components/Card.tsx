import { Link } from "@tanstack/react-router";

interface CardProps {
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  image: string;
  id: string;
}

export function Card({ title, description, author, authorAvatar, image, id }: CardProps) {
  return (
    <Link
      className="flex flex-col sm:flex-row w-full h-auto sm:h-32 bg-white border border-gray-100 shadow-xs rounded-md overflow-hidden hover:shadow-md transition-shadow"
      to="/submission/$id"
      params={{ id: id }}
      rel="noreferrer"
    >
      <div className="w-full sm:w-[50%] h-40 sm:h-full shrink-0 overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover"
          alt={title}
        />
      </div>

      <div className="p-4 flex flex-col flex-1 min-w-0">
        <p className="font-semibold text-gray-800 text-sm truncate">{title}</p>
        <p className="text-xs text-gray-500 line-clamp-2 sm:line-clamp-3 mt-1 flex-1 text-pretty">
          {description}
        </p>
        <p className="flex justify-end font-medium text-right text-xs text-gray-400 mt-2 shrink-0 align-middle items-center gap-1">
          <img src={authorAvatar} height={64} width={64} className="w-5 h-5 object-cover rounded-full inline" /> {author}
        </p>
      </div>
    </Link>
  )
}
