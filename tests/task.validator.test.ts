import { describe, expect, it } from "vitest";
import { taskValidator } from "@/lib/validator/task.validator";

const validInput = {
  title: "A valid title",
  description: "A description long enough to pass",
};

describe("taskValidator", () => {
  it("accepts a valid task without completed", () => {
    const result = taskValidator.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("accepts a valid task with completed", () => {
    const result = taskValidator.safeParse({ ...validInput, completed: true });
    expect(result.success).toBe(true);
  });

  it("rejects a title shorter than 3 characters", () => {
    const result = taskValidator.safeParse({ ...validInput, title: "ab" });
    expect(result.success).toBe(false);
  });

  it("rejects a title longer than 100 characters", () => {
    const result = taskValidator.safeParse({
      ...validInput,
      title: "a".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it("rejects a description shorter than 10 characters", () => {
    const result = taskValidator.safeParse({
      ...validInput,
      description: "too short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a description longer than 200 characters", () => {
    const result = taskValidator.safeParse({
      ...validInput,
      description: "a".repeat(201),
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-string titles", () => {
    const result = taskValidator.safeParse({
      ...validInput,
      title: 123,
    });
    expect(result.success).toBe(false);
  });
});
