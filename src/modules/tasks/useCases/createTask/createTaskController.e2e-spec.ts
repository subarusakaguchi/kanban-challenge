import { app } from "../../../../server";
import request from "supertest";

describe("[e2e] - Create task", () => {
  it("Should be able to create a new task", async () => {
    const response = await request(app).post("/api/v1/tasks").send({
      title: "Meu título teste",
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc ultricies at enim vel tempor. Nam non metus enim. Vivamus malesuada placerat justo, molestie gravida quam varius eget. In rhoncus libero ipsum, eget bibendum justo porttitor elementum. Donec mollis ipsum sed tincidunt dignissim. Aenean quam lorem, sagittis sit amet magna at, malesuada maximus augue.",
      status: "DONE",
    });

    expect(response.body).toHaveProperty("id");
    expect(response.statusCode).toEqual(201);
  });

  it("Should not be able to create a new task without a title", async () => {
    const response = await request(app).post("/api/v1/tasks").send({
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc ultricies at enim vel tempor. Nam non metus enim. Vivamus malesuada placerat justo, molestie gravida quam varius eget. In rhoncus libero ipsum, eget bibendum justo porttitor elementum. Donec mollis ipsum sed tincidunt dignissim. Aenean quam lorem, sagittis sit amet magna at, malesuada maximus augue.",
      status: "DONE",
    });

    expect(response.body.message).toEqual(
      "Its necessary a Title to create a Task"
    );
    expect(response.body.statusCode).toEqual(400);
  });

  it("Should not be able to create a new task with a non existing status", async () => {
    const response = await request(app).post("/api/v1/tasks").send({
      title: "Meu título teste",
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc ultricies at enim vel tempor. Nam non metus enim. Vivamus malesuada placerat justo, molestie gravida quam varius eget. In rhoncus libero ipsum, eget bibendum justo porttitor elementum. Donec mollis ipsum sed tincidunt dignissim. Aenean quam lorem, sagittis sit amet magna at, malesuada maximus augue.",
      status: "TESTE",
    });

    expect(response.body.message).toEqual("Unrecognized status type");
    expect(response.body.statusCode).toEqual(400);
  });
});
