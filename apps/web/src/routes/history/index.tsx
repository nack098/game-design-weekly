import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightIcon, HistoryIcon } from 'lucide-react'
import { apiHub } from '../../services/apiClient'

export const Route = createFileRoute('/history/')({
  loader: async () => {
    const data = await apiHub.challenges.getAll()
    return data.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  },
  component: RouteComponent,
})

function RouteComponent() {
  const challenges = Route.useLoaderData()

  return (
    <>
      <div className="flex items-center gap-2">
        <HistoryIcon width={18} className="text-orange-400" />
        <h2 className="font-bold">Challenge History</h2>
      </div>
      <p className="text-sm text-gray-500 mb-5">Browse past weekly challenges.</p>

      {challenges.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-lg text-gray-400">
          No historical database tracking configurations found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 pb-4">
          {challenges.map((challenge, index) => (
            <Link
              key={challenge.id}
              to="/history/$id"
              params={{ id: challenge.id }}
              className="group flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-orange-400 text-white text-xs font-bold">
                  Week {challenges.length - index}
                </span>
                <span className="text-xs font-medium text-gray-400">Closed</span>
              </div>
              <p className="font-bold text-lg text-gray-800 group-hover:text-orange-400 transition-colors">
                {new Date(challenge.startDate).toLocaleDateString(undefined, {
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
      )}
    </>
  )
}
