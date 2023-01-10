import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { A2OJ_Table } from "../component/A2OJ_Table";
import { useAppContext } from "../store/app-context";
import { A2OJProblems, A2OJProblemSetIds } from "../store/problem_lists";

export const A2OJTablePage: React.FC = () => {
  const { problemset_id } = useParams() as { problemset_id: A2OJProblemSetIds };
  const ctx = useAppContext();
  return (
    <Stack>
      <center>
        <Typography variant="h5">
          {A2OJProblems[problemset_id].title}
        </Typography>
      </center>
      {ctx.dataLoaded && (
        <A2OJ_Table problem_ids={A2OJProblems[problemset_id].problem_ids} />
      )}
    </Stack>
  );
};
