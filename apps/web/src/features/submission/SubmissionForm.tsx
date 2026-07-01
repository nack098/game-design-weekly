import { useState } from 'react'
import { ImageIcon, PencilIcon, XIcon, LockIcon } from 'lucide-react'
import { apiHub } from '../../services/apiClient'
import { type CreateSubmissionInput } from '../../types/api'
import { useAuth } from '../../hooks/useAuth' // IMPORT YOUR AUTH HOOK!

interface SubmissionFormProps {
  challengeId: string
  onClose: () => void
  onSuccess?: () => void
}

const inputClass =
  'w-full rounded-md border border-gray-200 p-2.5 text-sm focus:outline-none focus:border-orange-400 transition-colors'

export function SubmissionForm({ challengeId, onClose, onSuccess }: SubmissionFormProps) {
  const { isAuth, user, loginWithSSO } = useAuth()

  const [imageUrl, setImageUrl] = useState('')
  const [imageError, setImageError] = useState(false)
  const [title, setTitle] = useState('')
  const [docsUrl, setDocsUrl] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isAuth) {
    return (
      <div className="w-md max-w-[92vw] bg-white rounded-xl p-7 text-center flex flex-col items-center gap-4">
        <LockIcon className="text-orange-400" width={40} />
        <h2 className="text-lg font-bold text-gray-800">Authentication Required</h2>
        <p className="text-sm text-gray-500">You must be logged in via GitHub to submit a project entry.</p>
        <button
          onClick={loginWithSSO}
          className="mt-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-md transition-colors cursor-pointer"
        >
          Log In with GitHub
        </button>
      </div>
    )
  }

  const verifiedAuthor = user?.user_metadata?.user_name || user?.email || "Unknown Explorer"

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    if (!title || !imageUrl) return

    setIsSubmitting(true)
    try {
      await apiHub.post<CreateSubmissionInput>({
        challengeId,
        gameName: title,
        imageLink: imageUrl,
        docsLink: docsUrl,
        shortDescription: description
      })

      if (onSuccess) onSuccess()
      onClose()
    } catch (err) {
      console.error("Failed to post submission:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-3xl max-w-[92vw] max-h-[90vh] overflow-y-auto bg-white rounded-xl p-7 text-black">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <PencilIcon width={18} className="text-orange-400" />
          <h1 className="text-xl font-bold">Submission Form</h1>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer hover:bg-gray-200 rounded-full py-1 px-2 transition-colors duration-200"
        >
          <XIcon width={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Left Column: Image Links and Previews */}
          <div className="sm:w-1/2 flex flex-col gap-3">
            <div className="aspect-video w-full rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
              {imageUrl && !imageError ? (
                <img
                  src={imageUrl}
                  alt="Submission preview"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="text-center text-gray-400 text-sm px-4">
                  <ImageIcon width={28} className="mx-auto mb-1 opacity-60" />
                  {imageError ? "Couldn't load that image link." : 'Paste an image link to preview.'}
                </div>
              )}
            </div>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value)
                setImageError(false)
              }}
              placeholder="https://image-link.png"
              className={inputClass}
            />
          </div>

          <div className="sm:w-1/2 flex flex-col gap-3">
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Game name"
              className={inputClass}
            />

            {/* 4. VISUAL ONLY DISPLAY - READ ONLY FOR SECURITY */}
            <div className="w-full bg-gray-50 border border-gray-200 rounded-md p-2.5 text-sm text-gray-500 flex justify-between items-center select-none">
              <span>Author: <strong className="text-gray-700">{verifiedAuthor}</strong></span>
              <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Verified</span>
            </div>

            <input
              type="url"
              required
              value={docsUrl}
              onChange={(e) => setDocsUrl(e.target.value)}
              placeholder="Design docs link"
              className={inputClass}
            />
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              rows={4}
              className={`${inputClass} resize-none flex-1`}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="cursor-pointer px-4 py-2 text-gray-600 text-xs font-semibold rounded-md border border-gray-200 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}
