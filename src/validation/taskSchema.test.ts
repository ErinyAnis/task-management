// src/validation/taskSchema.test.ts
import { describe, it, expect } from "vitest";
import { taskSchema } from "./taskSchema";

describe("taskSchema", () => {
  it("rejects empty title", async () => {
    await expect(taskSchema.validate({ title: "", dueDate: "2099-01-01" }))
      .rejects.toThrow();
  });

  it("rejects a due date that is today or in the past", async () => {
    await expect(taskSchema.validate({ title: "Test", dueDate: "2020-01-01" }))
      .rejects.toThrow();
  });
});