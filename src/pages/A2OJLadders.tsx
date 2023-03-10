import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
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
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  {rows
                    .map((problem_set) =>
                      getSolvedCount(problem_set.problem_ids)
                    )
                    .reduce((prev, curr) => prev + curr, 0)}
                </TableCell>
                <TableCell>
                  {rows
                    .map((problem_set) => problem_set.problem_ids.length)
                    .reduce((acc, num) => acc + num, 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export const A2OJLadders: React.FC = () => {
  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
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
    {
      caption: "Rating-wise Ladder",
      rows: [
        A2OJProblems["rating_le_1300"],
        A2OJProblems["rating_le_1399"],
        A2OJProblems["rating_le_1499"],
        A2OJProblems["rating_le_1599"],
        A2OJProblems["rating_le_1699"],
        A2OJProblems["rating_le_1799"],
        A2OJProblems["rating_le_1899"],
        A2OJProblems["rating_le_1999"],
        A2OJProblems["rating_le_2099"],
        A2OJProblems["rating_le_2199"],
        A2OJProblems["rating_ge_2200"],
      ],
    },
    {
      caption: "Rating-wise (extra) Ladder",
      rows: [
        A2OJProblems["rating_le_1300_extra"],
        A2OJProblems["rating_le_1399_extra"],
        A2OJProblems["rating_le_1499_extra"],
        A2OJProblems["rating_le_1599_extra"],
        A2OJProblems["rating_le_1699_extra"],
        A2OJProblems["rating_le_1799_extra"],
        A2OJProblems["rating_le_1899_extra"],
        A2OJProblems["rating_le_1999_extra"],
        A2OJProblems["rating_le_2099_extra"],
        A2OJProblems["rating_le_2199_extra"],
        A2OJProblems["rating_ge_2200_extra"],
      ],
    },
  ];
  return (
    <>
      <TabContext value={tabValue}>
        <TabList onChange={handleTabChange} variant="fullWidth">
          {A2OJProblemSets.map((value, index) => {
            return <Tab key={index} label={value.caption} value={`${index}`} />;
          })}
        </TabList>
        {A2OJProblemSets.map((value, index) => {
          return (
            <TabPanel key={index} value={`${index}`}>
              <A2OJTableSummary {...value} />
            </TabPanel>
          );
        })}
      </TabContext>
      <Outlet></Outlet>
    </>
  );
};
