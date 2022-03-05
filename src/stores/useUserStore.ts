import create from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";
import { foods } from "./db";

export interface Food {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

interface Meal {
  id: number;
  name: string;
  foodList: Food[];
}

interface UpdateFoodListProps {
  mealId: number;
  foodId: string;
}

interface StoreState {
  userCalories: number;
  userCarbs: number;
  userProtein: number;
  userFat: number;
  dbFoods: Food[];
  actions: {
    addFood: ({ mealId, foodId }: UpdateFoodListProps) => void;
    removeFood: ({ mealId, foodId }: UpdateFoodListProps) => void;
    calculate: () => void;
    resetState: () => void;
  };
  meals: Meal[];
}

export const useUserStore = create<StoreState>(
  devtools((set, get) => ({
    userCalories: 0,
    userCarbs: 0,
    userProtein: 0,
    userFat: 0,
    dbFoods: foods,
    actions: {
      addFood: ({ mealId, foodId }: { mealId: number; foodId: string }) =>
        set(
          produce<StoreState>(({ meals }) => {
            const meal = meals.find((meal) => meal.id === mealId);
            const food = get().dbFoods.find((food) => food.id === foodId);
            food && meal?.foodList.push(food);
          })
        ),
      removeFood: ({ mealId, foodId }: { mealId: number; foodId: string }) =>
        set(
          produce<StoreState>(({ meals }) => {
            const meal = meals.find((meal) => meal.id === mealId);
            const filtered = meal?.foodList.filter(
              (food) => food.id !== foodId
            );
            if (filtered && meal) {
              meal.foodList = filtered;
            }
          })
        ),
      calculate: () =>
        set((state) => {
          const allFoods = get().meals.reduce<Food[]>((acc, cur) => {
            acc = [...acc, ...cur.foodList];
            return acc;
          }, []);
          if (allFoods.length > 0) {
            allFoods.forEach((item) => {
              state.userCalories += item.calories;
              state.userCarbs += item.carbs;
              state.userFat += item.fat;
              state.userProtein += item.protein;
            });
          } else {
            state.actions.resetState();
          }
        }),
      resetState: () => {
        set((state) => {
          state.userCalories = 0;
          state.userCarbs = 0;
          state.userFat = 0;
          state.userProtein = 0;
        });
      },
    },
    meals: [
      {
        id: 0,
        name: "Breakfast",
        foodList: [],
      },
      {
        id: 1,
        name: "Lunch",
        foodList: [],
      },
      {
        id: 2,
        name: "Diner",
        foodList: [],
      },
    ],
  }))
);
