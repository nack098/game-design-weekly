import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiHub } from '../../services/apiClient'
import { Challenge } from '../../features/challenge'
import type { Submission } from '#/types/api'

export const Route = createFileRoute('/history/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const [historicalStatement, setHistoricalStatement] = useState('Searching database archives...')
  const [submissionsList, setSubmissionsList] = useState<Submission[]>([])
  const [historicalChallengeId, setHistoricalChallengeId] = useState('')
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHistoryArchive = async () => {
      try {
        setLoading(true)

        const match = await apiHub.challenges.getById(id);

        if (match) {
          setHistoricalChallengeId(match.id)
          setHistoricalStatement(match.statement)

          const pastSubmissions = await apiHub.submissions.getByChallenge(match.id)
          setSubmissionsList(pastSubmissions)
          setStartDate(new Date(match.startDate));
          setEndDate(new Date(match.endDate));
        } else {
          setHistoricalStatement("No historic challenge record found for this time period.")
        }
      } catch (err) {
        console.error("Archive loader pipeline crash:", err)
      } finally {
        setLoading(false)
      }
    }
    loadHistoryArchive()
  }, [id])

  return (
    <>
      <Link
        to="/history"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-400 transition-colors mb-4"
      >
        <ArrowLeftIcon width={16} /> Back to history
      </Link>
      {loading ? (
        <div className="text-center py-10 text-sm text-gray-400">Loading archive records...</div>
      ) : (
        <Challenge
          challengeId={historicalChallengeId}
          statement={historicalStatement}
          startDate={startDate}
          endDate={endDate}
          submissions={submissionsList}
        />
      )}
    </>
  )
}
