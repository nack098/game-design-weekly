import { useState } from 'react'
import { ExternalLinkIcon, Gamepad2Icon, MessageCircleIcon } from 'lucide-react'

export interface SubmissionComment {
  author: string
  body: string
}

interface SubmissionViewProps {
  title: string
  description: string
  author: string
  image: string
  docsUrl: string
  comments: SubmissionComment[]
}

export function SubmissionView({
  title,
  description,
  author,
  image,
  docsUrl,
  comments,
}: SubmissionViewProps) {
  const [draft, setDraft] = useState('')
  const [posted, setPosted] = useState<SubmissionComment[]>([])

  const allComments = [...comments, ...posted]

  return (
    <div className="pb-6">
      <div className="flex items-center gap-2">
        <Gamepad2Icon width={24} className="text-orange-400" />
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center gap-2 mt-1 mb-4">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-400 text-white text-xs font-bold">
          {author.charAt(0).toUpperCase()}
        </span>
        <p className="text-sm text-gray-500">by {author}</p>
      </div>

      <div className="w-full rounded-xl overflow-hidden border border-gray-100 mb-4">
        <img src={image} alt={title} className="w-full max-h-96 object-cover" />
      </div>

      <p className="text-pretty text-gray-700 mb-4">{description}</p>

      <a
        href={docsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-400 text-white text-sm font-semibold rounded-md hover:bg-orange-500 transition-colors"
      >
        View design docs <ExternalLinkIcon width={16} />
      </a>

      <div className="flex items-center gap-2 mt-8 mb-3">
        <MessageCircleIcon width={18} className="text-orange-400" />
        <h2 className="font-bold">Comments ({allComments.length})</h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          const body = draft.trim()
          if (!body) return
          setPosted((prev) => [...prev, { author: 'You', body }])
          setDraft('')
        }}
        className="mb-5"
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Share your thoughts on this design…"
          rows={3}
          className="w-full rounded-md border border-gray-200 p-3 text-sm resize-none focus:outline-none focus:border-orange-400 transition-colors"
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!draft.trim()}
            className={`px-4 py-2 text-white text-xs font-semibold rounded-md transition-colors ${draft.trim()
              ? "cursor-pointer bg-red-500 hover:bg-red-600"
              : "cursor-not-allowed bg-gray-300"
              }`}
          >
            Post comment
          </button>
        </div>
      </form>

      {allComments.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-6">No comments yet. Be the first!</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {allComments.map((comment, index) => (
            <li
              key={index}
              className="flex gap-3 p-4 bg-white border border-gray-100 rounded-lg shadow-xs"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-orange-100 text-orange-500 text-xs font-bold">
                {comment.author.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800">{comment.author}</p>
                <p className="text-sm text-gray-600 text-pretty">{comment.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
