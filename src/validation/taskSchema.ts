import * as yup from "yup";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

export const taskSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required"),

  description: yup
    .string()
    .trim(),

  status: yup
    .string()
    .required(),

  dueDate: yup
    .date()
    .required("Due date is required")
    .min(tomorrow, "Due date must be in the future")
});