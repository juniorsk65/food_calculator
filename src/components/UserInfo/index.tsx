import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { green, grey } from "@mui/material/colors";
import { useUserStore } from "../../stores/useUserStore";

const UserInfo = () => {
  // const userCalories = useUserStore((state) => state.userCalories);
  // const userCarbs = useUserStore((state) => state.userCarbs);
  // const userFat = useUserStore((state) => state.userFat);
  // const userProtein = useUserStore((state) => state.userProtein);
  const calculate = useUserStore((state) => state.actions.calculate);

  const { userCalories, userCarbs, userFat, userProtein } = useUserStore(
    (state) => ({
      userCalories: state.userCalories,
      userCarbs: state.userCarbs,
      userFat: state.userFat,
      userProtein: state.userProtein,
    })
  );

  const properties = [
    { id: 1, key: "Calories(kcal)", value: userCalories },
    { id: 2, key: "Carbs(g)", value: userCarbs },
    { id: 3, key: "Protein(g)", value: userProtein },
    { id: 4, key: "Fat(g)", value: userFat },
  ];

  return (
    <Card>
      <CardContent sx={{ padding: 0, paddingBottom: "0px !important" }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          mb={2}
          sx={{ backgroundColor: green[100] }}
        >
          <Avatar alt="user" sx={{ width: 80, height: 80 }} />
          <Typography variant="h5" color={grey[600]}>
            Hello, Luciano
          </Typography>
        </Box>
        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" color={grey[600]}>
            You've Consumed
          </Typography>
          <Button variant="contained" onClick={() => calculate()}>
            Calculate
          </Button>
        </Box>
        <Box p={2}>
          <List>
            {properties.map((propertie, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={propertie.key}
                  secondary={propertie.value.toFixed(2)}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
