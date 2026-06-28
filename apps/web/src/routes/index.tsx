import { createFileRoute } from '@tanstack/react-router'
import statement from "/statement.txt?raw"

import { Challenge } from '../features/challenge'
import type { Submission } from '../features/challenge'

export const Route = createFileRoute('/')({ component: Home })

// Injected here for now; will come from the API.
const submissions: Submission[] = []

function Home() {
  return (
    <Challenge
      statement={statement}
      startDate={new Date()}
      submissions={submissions}
    />
  )
}
