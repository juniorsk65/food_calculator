import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FoodCard from "../FoodCard";
import { useState } from "react";
import { foods } from "../../stores/db";
import { useUserStore } from "../../stores/useUserStore";

interface MealCardProps {
  id: number;
  title: string;
  subHeader: string;
  color: string;
}

const MealCard = ({ id, title, subHeader, color }: MealCardProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [food, setFood] = useState<string>("");
  const addFood = useUserStore((state) => state.actions.addFood);
  const foodList = useUserStore((state) => state.meals[id].foodList);

  const handleChange = (event: SelectChangeEvent<typeof food>) => {
    setFood(event.target.value || "");
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      addFood({ mealId: id, foodId: food });
      setFood("");
    }
  };
  return (
    <>
      <Card>
        <CardHeader
          sx={{
            backgroundColor: color,
            display: "flex",
            justifyContent: "center",
            color: "#fefcfb",
          }}
          title={title}
          titleTypographyProps={{ variant: "h5" }}
          subheader={subHeader}
          subheaderTypographyProps={{ color: "#b6b4b3" }}
          action={
            <Tooltip title="Add new food" placement="bottom">
              <Button
                variant="contained"
                aria-label="add more"
                sx={{ backgroundColor: "#48cae4" }}
                endIcon={<AddCircleOutlineIcon />}
                onClick={() => setOpen(true)}
              >
                Add
              </Button>
            </Tooltip>
          }
        />
        <Divider variant="middle" />
        <CardContent
          sx={{ display: "flex", maxWidth: "100%", overflow: "scroll" }}
        >
          {foodList.map((food) => (
            <FoodCard
              id={food.id}
              key={food.id}
              mealId={id}
              title={food.name}
              properties={{
                Calories: food.calories,
                Carbs: food.carbs,
                Fat: food.fat,
                Protein: food.protein,
              }}
            />
          ))}
        </CardContent>
      </Card>
      <Dialog disableEscapeKeyDown open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Choose your food</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel htmlFor="demo-dialog-native">Food</InputLabel>
              <Select
                native
                value={food}
                onChange={handleChange}
                input={<OutlinedInput label="Food" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                {foods.map((food, index) => (
                  <option key={index} value={food.id}>
                    {food.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MealCard;
