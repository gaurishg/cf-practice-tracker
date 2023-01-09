import axios from "axios";
import { Problem, ProblemStatistics, Submission } from "./cf_types";
import { MyProblem, MyProblemLevel } from "./types";

const baseUrl = "https://codeforces.com/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export async function getAllProblems(): Promise<MyProblem[]> {
  interface AllProblemsResponse {
    status: string;
    result: {
      problems: Problem[];
      problemStatistics: ProblemStatistics[];
    };
  }

  const response = await axiosInstance.get<AllProblemsResponse>(
    "/problemset.problems"
  );
  const problems = response.data.result.problems;
  return problems.map(CFProblem2MyProblem);
}

export async function getProblemsSolvedByUser(
  userHandle: string
): Promise<Set<string>> {
  interface ProblemsByUser {
    status: string;
    result?: Submission[];
    comment?: string;
  }
  const response = await axiosInstance.get<ProblemsByUser>("user.status", {
    params: {
      handle: userHandle,
      // from: 1,
      // count: 10,
    },
  });
  const data = response.data;
  if (!data.result) return new Set();

  return new Set(
    data.result
      .filter((submission) => submission.verdict === "OK")
      .map(CFSubmission2ProblemId)
  );
}

function getProblemLevelFromProblemIndex(index: string): MyProblemLevel {
  index = index.toLocaleLowerCase();
  if (index.includes("a")) return "A";
  else if (index.includes("b")) return "B";
  else if (index.includes("c")) return "C";
  else if (index.includes("d")) return "D";
  else if (index.includes("e")) return "E";
  else if (index.includes("f")) return "F";
  else if (index.includes("g")) return "G";
  else if (index.includes("h")) return "H";
  return "I";
}

function CFProblem2MyProblem(cf_problem: Problem): MyProblem {
  return {
    id: CFProblem2ProblemId(cf_problem),
    name: cf_problem.name,
    tags: new Set(cf_problem.tags || []),
    points: cf_problem.points,
    level: getProblemLevelFromProblemIndex(cf_problem.index),
    rating: cf_problem.rating,
  };
}

function CFProblem2ProblemId(cf_problem: Problem): string {
  return `${cf_problem.contestId || "dummy"}${cf_problem.index}`;
}

function CFSubmission2ProblemId(submission: Submission): string {
  return CFProblem2ProblemId(submission.problem);
}
