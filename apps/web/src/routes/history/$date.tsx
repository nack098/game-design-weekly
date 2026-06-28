import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import statement from "/statement.txt?raw"

import { Challenge } from '../../features/challenge'
import type { Submission } from '../../features/challenge'

export const Route = createFileRoute('/history/$date')({
  component: RouteComponent,
})

// Placeholder — will come from the API, keyed by the date param.
const submissions: Submission[] = []

function RouteComponent() {
  const { date } = Route.useParams()

  return (
    <>
      <Link
        to="/history"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-400 transition-colors"
      >
        <ArrowLeftIcon width={16} /> Back to history
      </Link>
      <Challenge
        statement={statement}
        startDate={new Date(date)}
        submissions={submissions}
      />
    </>
  )
}
