import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue, grey } from "@mui/material/colors";
import { useUserStore } from "../../stores/useUserStore";

interface FoodCardProps {
  id: string;
  title: string;
  mealId: number;
  properties: {
    Calories: number;
    Carbs: number;
    Protein: number;
    Fat: number;
  };
}

const FoodCard = ({ id, title, mealId, properties }: FoodCardProps) => {
  const removeFood = useUserStore((state) => state.actions.removeFood);
  return (
    <Card sx={{ width: 180, marginRight: 2 }}>
      <CardHeader
        sx={{ padding: 1, backgroundColor: grey[400] }}
        title={title}
        titleTypographyProps={{ variant: "h6" }}
        action={
          <Tooltip title="Remove item" placement="top">
            <IconButton onClick={() => removeFood({ mealId, foodId: id })}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      <CardContent
        sx={{
          padding: 1,
          paddingBottom: "0px !important",
        }}
      >
        <List dense>
          {Object.entries(properties).map(([key, value], index) => (
            <ListItem
              key={index}
              alignItems="flex-start"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 0,
              }}
            >
              <Typography variant="subtitle2">{key}</Typography>
              <Typography variant="subtitle2">
                {key === "Calories" ? `${value}kcal` : `${value}g`}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
