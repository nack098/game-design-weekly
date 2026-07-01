// === CHALLENGE MODELS ===
export interface Challenge {
  id: string
  statement: string
  startDate: string // ISO Date String
  endDate: string // ISO Date String
}

export interface CreateChallengeInput {
  statement: string
  startDate: string
}

// === SUBMISSION MODELS ===
export interface Submission {
  id: string
  challengeId: string
  imageLink: string
  gameName: string
  author: string
  authorAvatarUrl: string
  docsLink: string
  shortDescription: string
}

export interface CreateSubmissionInput {
  challengeId: string
  imageLink: string
  gameName: string
  docsLink: string
  shortDescription: string
}

// === COMMENT MODELS ===
export interface Comment {
  id: string
  submissionId: string
  name: string
  comment: string
  createdAt: string
}

export interface CreateCommentInput {
  submissionId: string
  name: string
  comment: string
}

// === TYPE MAPPING FOR EXTENSION ===
export interface ApiTypeMap {
  Challenge: { input: CreateChallengeInput; response: Challenge }
  Submission: { input: CreateSubmissionInput; response: Submission }
  Comment: { input: CreateCommentInput; response: Comment }
}
