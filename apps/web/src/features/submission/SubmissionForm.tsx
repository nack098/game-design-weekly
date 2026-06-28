import { useState } from 'react'
import { ImageIcon, PencilIcon, XIcon } from 'lucide-react'

const inputClass =
  'w-full rounded-md border border-gray-200 p-2.5 text-sm focus:outline-none focus:border-orange-400 transition-colors'

export function SubmissionForm({ onClose }: { onClose: () => void }) {
  const [imageUrl, setImageUrl] = useState('')
  const [imageError, setImageError] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [docsUrl, setDocsUrl] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="w-3xl max-w-[92vw] max-h-[90vh] overflow-y-auto bg-white rounded-xl p-7">
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

      <form
        onSubmit={(e) => {
          e.preventDefault()
          // TODO: POST the collected fields to the API.
          onClose()
        }}
      >
        <div className="flex flex-col sm:flex-row gap-6">
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Game name"
              className={inputClass}
            />
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
              className={inputClass}
            />
            <input
              type="url"
              value={docsUrl}
              onChange={(e) => setDocsUrl(e.target.value)}
              placeholder="Design docs link"
              className={inputClass}
            />
            <textarea
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
            onClick={onClose}
            className="cursor-pointer px-4 py-2 text-gray-600 text-xs font-semibold rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
