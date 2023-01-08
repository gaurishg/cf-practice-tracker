import { Grid } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import { useBasicDemoData } from "@mui/x-data-grid-generator";
import { MyProblem } from "./common/types";
import { useAppContext } from "./store/app-context";

function App(): JSX.Element {
  const ctx = useAppContext();
  // const data = Array.from(ctx.usersProblems.solved).map(
  //   (id) => ctx.problems[id]
  // );

  const columns: GridColDef[] = [
    {
      field: "done",
      headerName: "Done",
      type: "boolean",
      valueGetter: function (params: GridValueGetterParams<MyProblem>) {
        return ctx.usersProblems.solved.has(params.id as string);
      },
    },
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
    },
    {
      field: "points",
      headerName: "Points",
      type: "number",
    },
  ];

  // const basicData = useBasicDemoData(57, 5);
  return (
    <Grid container>
      <Grid item xs={12}>
        {/* <DataGrid {...basicData} autoPageSize /> */}
        <DataGrid
          rows={Object.values(ctx.problems).filter(
            (problem) => problem.points && true
            // problem.points > 800 &&
            // ctx.usersProblems.solved.has(problem.id)
          )}
          columns={columns}
          autoHeight
          pagination
        />
      </Grid>
    </Grid>
  );
}

export default App;
