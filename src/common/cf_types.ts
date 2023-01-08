export interface User {
  handle: string;
  email?: string;
  vkId?: string;
  openId?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  organization?: string;
  contribution: number;
  rank: string;
  rating: number;
  maxRank: string;
  maxRating: number;
  lastOnlineTimeSeconds: number;
  registrationTimeSeconds: number;
  friendOfCount: number;
  avatar: string;
  titlePhoto: string;
}

export type ContestType = "CF" | "IOI" | "ICPC";
export type ContestKind =
  | "Official ICPC Contest"
  | "Official School Contest"
  | "Opencup Contest"
  | "School/University/City/Region Championship"
  | "Training Camp Contest"
  | "Official International Personal Contest"
  | "Training Contest";
export type ContestPhase =
  | "BEFORE"
  | "CODING"
  | "PENDING_SYSTEM_TEST"
  | "SYSTEM_TEST"
  | "FINISHED";

export interface Contest {
  id: number;
  name: string;
  type: ContestType;
  phase: ContestPhase;
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds?: number;
  relativeTimeSeconds?: number;
  preparedBy?: string;
  websiteUrl?: string;
  description?: string;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  icpcRegion?: string;
  country?: string;
  city?: string;
  season?: string;
}

export interface Member {
  handle: string;
  name?: string;
}

export type ParticipantType =
  | "CONTESTANT"
  | "PRACTICE"
  | "VIRTUAL"
  | "MANAGER"
  | "OUT_OF_COMPETITION";

export interface Party {
  constestId?: number;
  members: Member[];
  participantType: ParticipantType;
  teamId?: number;
  teamName?: string;
  ghost: boolean;
  room?: number;
  startTimeSeconds?: number;
}

export type ProblemType = "PROGRAMMING" | "QUESTION";

export interface Problem {
  contestId?: number;
  problemsetName?: string;
  index: string;
  name: string;
  type: ProblemType;
  points?: number;
  rating?: number;
  tags: string[];
}

export interface ProblemStatistics {
  contestId?: number;
  index: string;
  solvedCount: number;
}

export type SubmissionVerdict =
  | "FAILED"
  | "OK"
  | "PARTIAL"
  | "COMPILATION_ERROR"
  | "RUNTIME_ERROR"
  | "WRONG_ANSWER"
  | "PRESENTATION_ERROR"
  | "TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "IDLENESS_LIMIT_EXCEEDED"
  | "SECURITY_VIOLATED"
  | "CRASHED"
  | "INPUT_PREPARATION_CRASHED"
  | "CHALLENGED"
  | "SKIPPED"
  | "TESTING"
  | "REJECTED";

export type SubmissionTestsetType =
  | "SAMPLES"
  | "PRETESTS"
  | "TESTS"
  | "CHALLENGES"
  | "TESTS1"
  | "TESTS2"
  | "TESTS3"
  | "TESTS4"
  | "TESTS5"
  | "TESTS6"
  | "TESTS7"
  | "TESTS8"
  | "TESTS9"
  | "TESTS10";

export interface Submission {
  id: number;
  contestId?: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: Problem;
  author: Party;
  programmingLanguage: string;
  verdict?: SubmissionVerdict;
  testset: SubmissionTestsetType;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
  points: number;
}

export type ProblemResultType = "PRELIMINARY" | "FINAL";

export interface ProblemResult {
  points: number;
  penalty?: number;
  rejectedAttemptCount: number;
  type: ProblemResultType;
  bestSubmissionTimeSeconds?: number;
}
