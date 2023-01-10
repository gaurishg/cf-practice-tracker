import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../store/app-context";
import { A2OJProblems, A2OJProblemSetInterface } from "../store/problem_lists";

interface A2OJTableSummaryProps {
  caption: string;
  rows: A2OJProblemSetInterface[];
}

const A2OJTableSummary: React.FC<A2OJTableSummaryProps> = ({
  caption,
  rows,
}) => {
  const ctx = useAppContext();
  const getSolvedCount = (problem_ids: string[]): number => {
    return problem_ids.filter((id) => ctx.usersProblems.solved.has(id)).length;
  };
  return (
    <Grid container m={2}>
      <Grid item xs={12}>
        <center>
          <Typography variant="h4">{caption}</Typography>
        </center>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr</TableCell>
                <TableCell>Ladder name</TableCell>
                <TableCell>Solved</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((value, index) => {
                return (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      <Link to={`/a2oj/${value.id}`}>{value.title}</Link>
                    </TableCell>
                    <TableCell>{getSolvedCount(value.problem_ids)}</TableCell>
                    <TableCell>{value.problem_ids.length}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export const A2OJLadders: React.FC = () => {
  const A2OJProblemSets: {
    caption: string;
    rows: A2OJProblemSetInterface[];
  }[] = [
    {
      caption: "Division-wise Ladder (Old)",
      rows: [
        A2OJProblems["div_2a_old"],
        A2OJProblems["div_2b_old"],
        A2OJProblems["div_2c_old"],
        A2OJProblems["div_2d_old"],
        A2OJProblems["div_2e_old"],
        A2OJProblems["div_1d_old"],
        A2OJProblems["div_1e_old"],
      ],
    },
    {
      caption: "Division-wise Ladder (Updated)",
      rows: [
        A2OJProblems["div_2a_new"],
        A2OJProblems["div_2b_new"],
        A2OJProblems["div_2c_new"],
        A2OJProblems["div_2d_new"],
        A2OJProblems["div_2e_new"],
      ],
    },
  ];
  return (
    <>
      {A2OJProblemSets.map((value, index) => (
        <A2OJTableSummary key={index} {...value} />
      ))}
      {/* <A2OJTableSummary caption="Sample" rows={[A2OJProblems["div_2a_old"]]} /> */}
      <Outlet></Outlet>
    </>
  );
};
