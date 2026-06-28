interface CardProps {
  title: string;
  description: string;
  author: string;
  image: string;
  href: string;
}

export function Card({ title, description, author, image, href }: CardProps) {
  return (
    <a
      className="flex flex-col sm:flex-row w-full max-w-[18rem] sm:max-w-none sm:w-[18rem] h-auto sm:h-32 bg-white border border-gray-100 shadow-xs rounded-md overflow-hidden hover:shadow-md transition-shadow"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <div className="w-full sm:w-32 h-40 sm:h-full shrink-0 overflow-hidden">
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
        <p className="font-medium text-right text-xs text-gray-400 mt-2 shrink-0">
          {author}
        </p>
      </div>
    </a>
  )
}
