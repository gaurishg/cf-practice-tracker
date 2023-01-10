import { PaletteMode } from "@mui/material";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { MyProblem } from "../common/types";
import {
  checkUserHandle,
  getAllProblems,
  getProblemsSolvedByUser,
} from "../common/utils";

export interface AppContextInterface {
  handle: string;
  problems: Record<string, MyProblem>;
  usersProblems: {
    solved: Set<string>;
  };
  theme: PaletteMode;
  dataLoaded: boolean;
  isUserValid: boolean;
  updateContext: React.Dispatch<React.SetStateAction<AppContextInterface>>;
}

const defaultCtx: AppContextInterface = {
  handle: localStorage.getItem("CF_HANDLE") || "",
  // handle: "",
  problems: {},
  usersProblems: { solved: new Set<string>() },
  theme: "dark",
  dataLoaded: false,
  isUserValid: false,
  updateContext: () => {},
};

export const AppCtx = createContext<AppContextInterface>(defaultCtx);

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<AppContextInterface>(defaultCtx);
  useEffect(() => {
    const newCtx: AppContextInterface = defaultCtx;
    Promise.all([
      getAllProblems(),
      getProblemsSolvedByUser(state.handle),
      checkUserHandle(state.handle),
    ]).then(([myproblems, user_problems, userValid]) => {
      for (const problem of myproblems) newCtx.problems[problem.id] = problem;
      newCtx.dataLoaded = true;
      newCtx.isUserValid = userValid;
      newCtx.usersProblems.solved = user_problems;
      setState(function (oldState) {
        return { ...oldState, ...newCtx, updateContext: setState };
      });
    });
  }, [setState]);

  return (
    <AppCtx.Provider value={{ ...state, updateContext: setState }}>
      {children}
    </AppCtx.Provider>
  );
};

export function useAppContext() {
  return useContext(AppCtx);
}
