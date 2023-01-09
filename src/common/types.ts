export interface MyProblem {
  id: string;
  name: string;
  level: MyProblemLevel;
  points?: number;
  rating?: number;
  tags: Set<string>;
}

export type MyProblemLevel =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I";
