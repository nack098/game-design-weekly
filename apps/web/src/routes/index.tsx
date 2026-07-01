import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { apiHub } from '../services/apiClient'
import { Challenge } from '../features/challenge'
import type { Submission } from '#/types/api'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [statementText, setStatementText] = useState('Loading current challenge statement...')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [liveSubmissions, setLiveSubmissions] = useState<Submission[]>([])
  const [challengeId, setChallengeId] = useState('')

  const fetchHomeContent = async () => {
    try {
      const latestChallenge = await apiHub.challenges.getLatest()
      if (latestChallenge) {
        setChallengeId(latestChallenge.id)
        setStatementText(latestChallenge.statement)
        setStartDate(new Date(latestChallenge.startDate))
        setEndDate(new Date(latestChallenge.endDate))

        const entries = await apiHub.submissions.getByChallenge(latestChallenge.id)
        setLiveSubmissions(entries)
      }
    } catch (err) {
      console.error("Failed to load homepage assets:", err)
    }
  }

  useEffect(() => {
    fetchHomeContent()
  }, [])

  return (
    <Challenge
      statement={statementText}
      startDate={startDate}
      endDate={endDate}
      submissions={liveSubmissions}
      challengeId={challengeId}
      onSuccess={fetchHomeContent}
    />
  )
}
