import { supabase } from '../services/supabaseClient'
import type {
  Challenge,
  CreateChallengeInput,
  Submission,
  CreateSubmissionInput,
  Comment,
  CreateCommentInput,
} from '../types/api'

const BASE_URL = import.meta.env.VITE_BACKEND

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      errorText || `Network response error! Status: ${response.status}`,
    )
  }
  if (response.status === 204) return {} as T
  return response.json() as Promise<T>
}

const postRouteSignatures = [
  { uniqueKey: 'statement', endpoint: 'challenge' },
  { uniqueKey: 'gameName', endpoint: 'submission' },
  { uniqueKey: 'comment', endpoint: 'comment' },
] as const

export const apiHub = {
  post: async <
    T extends CreateChallengeInput | CreateSubmissionInput | CreateCommentInput,
  >(
    payload: T,
  ): Promise<
    T extends CreateChallengeInput
      ? Challenge
      : T extends CreateSubmissionInput
        ? Submission
        : Comment
  > => {
    const matchedRoute = postRouteSignatures.find(
      (route) => route.uniqueKey in payload,
    )

    if (!matchedRoute) {
      throw new Error(
        `API Hub Error: The passed payload structure does not match any registered structural route signatures.`,
      )
    }
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`
    }

    return fetch(`${BASE_URL}/${matchedRoute.endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    }).then((res) => handleResponse<any>(res))
  },

  challenges: {
    getLatest: (): Promise<Challenge> =>
      fetch(`${BASE_URL}/challenge/latest`).then((res) =>
        handleResponse<Challenge>(res),
      ),
    getById: (id: string): Promise<Challenge> =>
      fetch(`${BASE_URL}/challenge/${id}`).then((res) =>
        handleResponse<Challenge>(res),
      ),
    getAll: (): Promise<Challenge[]> =>
      fetch(`${BASE_URL}/challenge`).then((res) =>
        handleResponse<Challenge[]>(res),
      ),
  },

  submissions: {
    getLatest: (): Promise<Submission[]> =>
      fetch(`${BASE_URL}/submission`).then((res) =>
        handleResponse<Submission[]>(res),
      ),

    getById: (id: string): Promise<Submission> =>
      fetch(`${BASE_URL}/submission/${id}`).then((res) =>
        handleResponse<Submission>(res),
      ),

    getByChallenge: (challengeId: string): Promise<Submission[]> =>
      fetch(`${BASE_URL}/submission/challenge/${challengeId}`).then((res) =>
        handleResponse<Submission[]>(res),
      ),
  },

  comments: {
    getBySubmission: (submissionId: string): Promise<Comment[]> =>
      fetch(`${BASE_URL}/comment/submission/${submissionId}`).then((res) =>
        handleResponse<Comment[]>(res),
      ),
  },
}
