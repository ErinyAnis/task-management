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
  .mixed<"Pending" | "In Progress" | "Done">()
  .oneOf(["Pending", "In Progress", "Done"])
  .optional(),

  dueDate: yup
  .string()
  .required("Due date is required")
  .test(
    "future-date",
    "Due date must be in the future",
    (value) => {
      if (!value) return false;

      const selectedDate = new Date(value);
      selectedDate.setHours(0, 0, 0, 0);

      return selectedDate >= tomorrow;
    }
  ),
});