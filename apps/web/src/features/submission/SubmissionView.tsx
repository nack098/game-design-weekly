import { useState } from 'react'
import {
  ExternalLinkIcon,
  Gamepad2Icon,
  MessageCircleIcon,
} from 'lucide-react'
import { apiHub } from '../../services/apiClient'
import type { CreateCommentInput, Comment } from '../../types/api'

interface SubmissionViewProps {
  submissionId: string
  title: string
  description: string
  author: string,
  authorAvatar: string,
  image: string
  docsUrl: string
  comments: Comment[]
  onCommentPosted: () => Promise<void>
}

export function SubmissionView({
  submissionId,
  title,
  description,
  author,
  authorAvatar,
  image,
  docsUrl,
  comments,
  onCommentPosted,
}: SubmissionViewProps) {
  const [draft, setDraft] = useState('')
  const [commenterName, setCommenterName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const displayAuthor = author.trim() || 'Unknown'

  const handleCommentSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    const body = draft.trim()
    if (!body) return

    const name = commenterName.trim() || 'Anonymous'

    setIsSubmitting(true)

    try {
      await apiHub.post<CreateCommentInput>({
        submissionId,
        name,
        comment: body,
      })

      await onCommentPosted()

      setDraft('')
      setCommenterName('')
    } catch (err) {
      console.error('Failed to post comment:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pb-6">
      <div className="flex items-center gap-2">
        <Gamepad2Icon width={24} className="text-orange-400" />
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center gap-2 mt-1 mb-4">
        {authorAvatar.length === 0 ?
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-400 text-white text-xs font-bold">
            {displayAuthor.charAt(0).toUpperCase()}
          </span> :
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-400 text-white text-xs font-bold">
            <img src={authorAvatar} width={64} height={64} className="rounded-full" />
          </span>
        }

        <p className="text-sm text-gray-500">
          by {displayAuthor}
        </p>
      </div>

      <div className="w-full rounded-xl overflow-hidden border border-gray-100 mb-4">
        <img
          src={image}
          alt={title}
          className="w-full max-h-96 object-cover"
        />
      </div>

      <p className="text-pretty text-gray-700 mb-4">
        {description}
      </p>

      <a
        href={docsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-400 text-white text-sm font-semibold rounded-md hover:bg-orange-500 transition-colors"
      >
        View design docs
        <ExternalLinkIcon width={16} />
      </a>

      <div className="flex items-center gap-2 mt-8 mb-3">
        <MessageCircleIcon width={18} className="text-orange-400" />
        <h2 className="font-bold">
          Comments ({comments.length})
        </h2>
      </div>

      <form
        onSubmit={handleCommentSubmit}
        className="mb-5 flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Your name (defaults to Anonymous)"
          value={commenterName}
          onChange={(e) => setCommenterName(e.target.value)}
          className="w-full sm:w-1/3 rounded-md border border-gray-200 p-2 text-sm focus:outline-none focus:border-orange-400 transition-colors"
        />

        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Share your thoughts on this design…"
          rows={3}
          className="w-full rounded-md border border-gray-200 p-3 text-sm resize-none focus:outline-none focus:border-orange-400 transition-colors"
        />

        <div className="flex justify-end mt-1">
          <button
            type="submit"
            disabled={!draft.trim() || isSubmitting}
            className={`px-4 py-2 text-white text-xs font-semibold rounded-md transition-colors ${draft.trim() && !isSubmitting
              ? 'cursor-pointer bg-red-500 hover:bg-red-600'
              : 'cursor-not-allowed bg-gray-300'
              }`}
          >
            {isSubmitting ? 'Posting...' : 'Post comment'}
          </button>
        </div>
      </form>

      {comments.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-6">
          No comments yet. Be the first!
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {comments.map((comment) => {
            const displayName = comment.name.trim() || 'Anonymous'

            return (
              <li
                key={comment.id}
                className="flex gap-3 p-4 bg-white border border-gray-100 rounded-lg shadow-xs"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-orange-100 text-orange-500 text-xs font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800">
                    {displayName}
                  </p>

                  <p className="text-sm text-gray-600 text-pretty">
                    {comment.comment}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
