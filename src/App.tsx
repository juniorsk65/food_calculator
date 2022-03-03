import { Box, Grid } from "@mui/material";

import { grey, orange, purple, yellow } from "@mui/material/colors";
import UserInfo from "./components/UserInfo";
import MealCard from "./components/MealCard";

function App() {
  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: grey[50], height: "100vh" }}
      paddingX={{ xs: 1, lg: 30 }}
      paddingY={{ xs: 1, lg: 2 }}
    >
      <Grid container spacing={4}>
        <Grid item md={4} xs={3}>
          <UserInfo />
        </Grid>
        <Grid item xs>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <MealCard
                id={0}
                title="Breakfast"
                subHeader="A meal eaten in the morning, the first of the day."
                color={yellow[200]}
              />
            </Grid>
            <Grid item xs>
              <MealCard
                id={1}
                title="Lunch"
                subHeader="A meal eaten in the middle of the day, less formal than an evening meal."
                color={orange[200]}
              />
            </Grid>
            <Grid item xs>
              <MealCard
                id={2}
                title="Dinner"
                subHeader="The last meal of the day."
                color={purple[200]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
