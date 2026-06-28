import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightIcon, HistoryIcon } from 'lucide-react'

export const Route = createFileRoute('/history/')({
  component: RouteComponent,
})

interface PastChallenge {
  date: string
  statement: string
}

// Placeholder past challenges — will come from the API.
const pastChallenges: PastChallenge[] = [
  {
    date: '2026-06-01',
    statement:
      'I have a dream of having a crocodile with a gun. So I want a game with a crocodile with a gun. (Depends on what you mean by gun.)',
  },
  {
    date: '2026-05-25',
    statement:
      'Make a game where the only verb is "wait". The player cannot move, jump, or attack — only time passes.',
  },
  {
    date: '2026-05-18',
    statement:
      'Design a two-player game played on a single phone, sharing one screen, with no networking at all.',
  },
  {
    date: '2026-05-11',
    statement:
      'A game with no UI whatsoever — no text, no HUD, no menus. Communicate everything through the world itself.',
  },
]

function RouteComponent() {
  return (
    <>
      <div className="flex items-center gap-2">
        <HistoryIcon width={18} className="text-orange-400" />
        <h2 className="font-bold">Challenge History</h2>
      </div>
      <p className="text-sm text-gray-500 mb-5">Browse past weekly challenges.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 pb-4">
        {pastChallenges.map((challenge, index) => (
          <Link
            key={challenge.date}
            to="/history/$date"
            params={{ date: challenge.date }}
            className="group flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-orange-400 text-white text-xs font-bold">
                Week {pastChallenges.length - index}
              </span>
              <span className="text-xs font-medium text-gray-400">Closed</span>
            </div>
            <p className="font-bold text-lg text-gray-800 group-hover:text-orange-400 transition-colors">
              {new Date(challenge.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <p className="text-sm text-gray-500 line-clamp-2 text-pretty group-hover:text-orange-400 transition-colors">
              {challenge.statement}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-400 group-hover:gap-2 transition-all">
              View challenge <ArrowRightIcon width={16} />
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
