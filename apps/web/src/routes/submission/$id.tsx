import { createFileRoute, useRouter } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiHub } from '../../services/apiClient'
import { SubmissionView } from '../../features/submission'
import type { Submission, Comment } from '../../types/api'

export const Route = createFileRoute('/submission/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const router = useRouter()

  const [submission, setSubmission] = useState<Submission | null>(null)
  const [commentsList, setCommentsList] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  const loadContentData = async () => {
    try {
      setLoading(true)

      const currentSub = await apiHub.submissions.getById(id)
      setSubmission(currentSub)

      const comments = await apiHub.comments.getBySubmission(currentSub.id)
      setCommentsList(comments)
    } catch (err) {
      console.error("Failed to resolve game view data entities:", err)
      setSubmission(null)
      setCommentsList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContentData()
  }, [id])

  if (loading) {
    return <div className="text-center py-10 text-sm text-gray-400">Loading submission environment details...</div>
  }

  if (!submission) {
    return <div className="text-center py-10 text-sm text-red-400">Submission entry record not found in database.</div>
  }

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
        submissionId={submission.id}
        title={submission.gameName}
        description={submission.shortDescription}
        author={submission.author}
        authorAvatar={submission.authorAvatarUrl}
        image={submission.imageLink}
        docsUrl={submission.docsLink}
        comments={commentsList}
        onCommentPosted={loadContentData}
      />
    </>
  )
}
