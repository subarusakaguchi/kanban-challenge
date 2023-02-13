import { app } from "../../../../server";
import request from "supertest";
import { randomUUID } from "crypto";

describe("[e2e] - Delete task", () => {
  it("Should be able to delete a task", async () => {
    const createResponse = await request(app).post("/api/v1/tasks").send({
      title: "Meu título teste",
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc ultricies at enim vel tempor. Nam non metus enim. Vivamus malesuada placerat justo, molestie gravida quam varius eget. In rhoncus libero ipsum, eget bibendum justo porttitor elementum. Donec mollis ipsum sed tincidunt dignissim. Aenean quam lorem, sagittis sit amet magna at, malesuada maximus augue.",
      status: "PENDING",
    });

    const deleteResponse = await request(app).delete(
      `/api/v1/tasks/${createResponse.body.id}`
    );

    expect(deleteResponse.body.message).toEqual("Deleted");
  });

  it("Should not be able to delete a non existing task", async () => {
    const response = await request(app).delete(`/api/v1/tasks/${randomUUID()}`);

    expect(response.body.message).toEqual("Task not found");
    expect(response.body.statusCode).toEqual(404);
  });
});
