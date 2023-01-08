import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { MyProblem } from "../common/types";
import { getAllProblems, getProblemsSolvedByUser } from "../common/utils";

export interface AppContextInterface {
  problems: Record<string, MyProblem>;
  usersProblems: {
    solved: Set<string>;
  };
}

const defaultCtx: AppContextInterface = {
  problems: {},
  usersProblems: { solved: new Set<string>() },
};

export const AppCtx = createContext<AppContextInterface>(defaultCtx);

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<AppContextInterface>(defaultCtx);
  const [userHandle, setUserHandle] = useState("JohnnyTest");
  useEffect(() => {
    const newCtx: AppContextInterface = {
      problems: {},
      usersProblems: { solved: new Set() },
    };
    Promise.all([getAllProblems(), getProblemsSolvedByUser(userHandle)]).then(
      ([problems, problemsByUser]) => {
        for (const problem of problems) {
          newCtx.problems[problem.id] = problem;
        } // for loop ends
        newCtx.usersProblems.solved = problemsByUser;
        setState(function (oldState) {
          return { ...oldState, ...newCtx };
        });
      }
    );
  }, [userHandle]);
  return <AppCtx.Provider value={state}>{children}</AppCtx.Provider>;
};

export function useAppContext() {
  return useContext(AppCtx);
}
