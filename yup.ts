import * as yup from "yup";

const gameSchema = yup.object({
  value: yup.string().required("Please select at least 1 game"),
  label: yup.string().required("Label is required"),
});

export const createContestSchema = yup.object({
  contestName: yup
    .string()
    .required("Contest name is required")
    .min(3, "Contest name must be at least 3 characters")
    .max(50, "Contest name must not exceed 50 characters"),
  games: yup
    .array()
    .of(gameSchema)
    .min(1, "Please select at least 1 game")
    .required("Please select at least 1 game")
    .nullable(),
  league: yup
    .object({
      value: yup.string().required("Please select league"),
      label: yup.string().required(),
    })
    .nullable(),
});
