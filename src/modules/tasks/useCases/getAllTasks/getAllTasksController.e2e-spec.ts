import { app } from "../../../../server";
import request from "supertest";

describe("[e2e] - Get all tasks", () => {
  it("Should be able to get all tasks", async () => {
    const response = await request(app).get("/api/v1/tasks/all");

    expect(response.body.length).toBeGreaterThanOrEqual(0);
    expect(response.body[0]).toHaveProperty("id");
  });
});
