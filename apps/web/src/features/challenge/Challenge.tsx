import { useState } from 'react'
import { Gamepad2Icon, TargetIcon } from 'lucide-react'
import { Card } from '../../components/Card'
import { Overlay } from '../../components/Overlay'
import { SubmissionForm } from '../submission'
import type { Submission } from '#/types/api'

interface ChallengeProps {
  challengeId: string
  statement: string
  startDate: Date
  endDate: Date
  submissions: Submission[]
  onSuccess?: () => void
}


export function Challenge({ challengeId, statement, startDate, endDate, submissions, onSuccess }: ChallengeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const now = new Date()

  const isSubmissionOpen = now >= startDate && now <= endDate

  return (
    <>
      <div className="flex items-center gap-0.5 md:gap-2 justify-center text-center md:justify-start">
        <TargetIcon width={18} className="text-orange-400" />
        <h2 className="font-bold">Challenge Statement</h2>
      </div>
      <div className="flex justify-around mt-2 px-2 md:px-10 mb-3">
        <div className="pr-4 bg-sky-100 rounded-md flex flex-row gap-2 max-w-240 w-full">
          <div className="w-4 bg-sky-500 rounded-l-md mr-1" />
          <p className="italic text-pretty py-2 text-sm">“{statement.trim()}”</p>
        </div>
      </div>
      <div className="mb-3">
        <div className="flex justify-between mb-1 md:mb-0">
          <div className="flex items-center gap-1 md:gap-2">
            <Gamepad2Icon width={18} className="text-orange-400" />
            <h2 className="font-bold">Submissions</h2>
          </div>
          <div className="flex flew-row gap-3 align-middle text-center items-center">
            <p className="text-sm text-gray-500 hidden md:block">{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</p>
            <button
              disabled={!isSubmissionOpen}
              className={`px-3 py-2 text-white text-xs shadow-sm border-gray-100 rounded-md transition-colors duration-200 ease-in-out ${isSubmissionOpen
                ? "cursor-pointer bg-red-500 hover:bg-red-600"
                : "cursor-not-allowed bg-gray-400"
                }`}
              onClick={(e) => { e.preventDefault(); setIsOpen(true) }}
            >
              {isSubmissionOpen ? "Submit" : "Submission Closed"}
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 block md:hidden">{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</p>
      </div>
      {submissions.length === 0 ? (
        <div className="py-10 w-full flex flex-col justify-center items-center">
          <img src="/no_submission.png" width={512} className="w-24 h-24 -translate-x-1 opacity-60" />
          <p className="text-center text-gray-400 text-sm">No submissions yet.</p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 object-center justify-items-center items-center">
          {submissions.map((submission) => (
            <Card
              key={submission.id}
              title={submission.gameName}
              description={submission.shortDescription}
              author={submission.author}
              authorAvatar={submission.authorAvatarUrl}
              image={submission.imageLink}
              id={submission.id}
            />
          ))}
        </div>
      )}
      <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SubmissionForm challengeId={challengeId} onClose={() => setIsOpen(false)} onSuccess={onSuccess} />
      </Overlay>
    </>
  )
}
