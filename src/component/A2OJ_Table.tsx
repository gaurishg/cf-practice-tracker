import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MyProblem } from "../common/types";
import { useAppContext } from "../store/app-context";

interface Props {
  problem_ids: string[];
}

interface RowProps {
  index: number;
  problem: MyProblem;
}
const A2OJ_TableRow: React.FC<RowProps> = (props) => {
  const ctx = useAppContext();
  const { id, name, points, rating } = props.problem;
  return (
    <TableRow
      hover
      sx={{
        bgcolor: ctx.usersProblems.solved.has(id)
          ? "success.main"
          : "background.default",
      }}
    >
      <TableCell>{props.index}</TableCell>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{points}</TableCell>
      <TableCell>{rating}</TableCell>
    </TableRow>
  );
};

export const A2OJ_Table: React.FC<Props> = ({ problem_ids }) => {
  const ctx = useAppContext();

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Sr</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problem_ids
            .map((id) => ctx.problems[id])
            .map((problem, index) => (
              <A2OJ_TableRow
                key={problem.id}
                index={index + 1}
                problem={problem}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
