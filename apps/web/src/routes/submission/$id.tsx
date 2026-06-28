import { createFileRoute, useRouter } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

import { SubmissionView } from '../../features/submission'
import type { SubmissionComment } from '../../features/submission'

export const Route = createFileRoute('/submission/$id')({
  component: RouteComponent,
})

// Placeholder — will come from the API, keyed by the id param.
const comments: SubmissionComment[] = [
  { author: 'Mizuki', body: 'Love the concept — the mechanics doc is super clear.' },
  { author: 'Ren', body: 'The pixel-art direction fits the theme really well.' },
]

function RouteComponent() {
  const { id } = Route.useParams()
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => router.history.back()}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-400 transition-colors cursor-pointer"
        >
          <ArrowLeftIcon width={16} /> Back
        </button>
        <span className="text-xs text-gray-400">#{id}</span>
      </div>
      <SubmissionView
        title="Crocodile with a Gun"
        description="A top-down arena shooter where you play a crocodile wielding an oversized water gun. Soak enemies to slow them, then chomp. (Depends on what you mean by gun.)"
        author="Author"
        image="https://lh3.googleusercontent.com/d/1_xkzckhS-blDQZ4q6uLnUDsnpSAgbOK4"
        docsUrl="https://google.com"
        comments={comments}
      />
    </>
  )
}
