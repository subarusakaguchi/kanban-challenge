import { app } from "../../../../server";
import request from "supertest";
import { randomUUID } from "crypto";

describe("[e2e] - Update task", () => {
  it("Should be able to update a task", async () => {
    const createResponse = await request(app).post("/api/v1/tasks").send({
      title: "Meu título teste",
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc ultricies at enim vel tempor. Nam non metus enim. Vivamus malesuada placerat justo, molestie gravida quam varius eget. In rhoncus libero ipsum, eget bibendum justo porttitor elementum. Donec mollis ipsum sed tincidunt dignissim. Aenean quam lorem, sagittis sit amet magna at, malesuada maximus augue.",
      status: "DONE",
    });

    const updateInfo = {
      title: "Meu título teste 2",
      content:
        "Duis elementum augue dui, sed tincidunt velit tempor eu. Fusce diam dolor, aliquam vitae nibh nec, consectetur ultrices eros. Morbi commodo eu lacus non facilisis. Sed libero diam, consectetur eu efficitur nec, suscipit ut purus. Duis luctus nisi at tincidunt semper. Donec eleifend sagittis orci eu consectetur. Cras et massa felis. Vestibulum accumsan iaculis erat ut auctor. Aenean commodo est sit amet mi tristique varius.",
      status: "REVIEW",
    };

    const updateResponse = await request(app)
      .put(`/api/v1/tasks/${createResponse.body.id}`)
      .send(updateInfo);

    expect(updateResponse.body.id).toEqual(createResponse.body.id);
    expect(updateResponse.body.content).toEqual(updateInfo.content);
  });

  it("Should be able to update a unique info in a task", async () => {
    const createResponse = await request(app).post("/api/v1/tasks").send({
      title: "Meu título teste",
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc ultricies at enim vel tempor. Nam non metus enim. Vivamus malesuada placerat justo, molestie gravida quam varius eget. In rhoncus libero ipsum, eget bibendum justo porttitor elementum. Donec mollis ipsum sed tincidunt dignissim. Aenean quam lorem, sagittis sit amet magna at, malesuada maximus augue.",
      status: "DONE",
    });

    const updateInfo = {
      title: "Meu título teste 2",
    };

    const updateResponse = await request(app)
      .put(`/api/v1/tasks/${createResponse.body.id}`)
      .send(updateInfo);

    expect(updateResponse.body.id).toEqual(createResponse.body.id);
    expect(updateResponse.body.content).toEqual(createResponse.body.content);
    expect(updateResponse.body.title).toEqual(updateInfo.title);
  });

  it("Should not be able to update a non existing task", async () => {
    const updateInfo = {
      title: "Meu título teste 2",
      content:
        "Duis elementum augue dui, sed tincidunt velit tempor eu. Fusce diam dolor, aliquam vitae nibh nec, consectetur ultrices eros. Morbi commodo eu lacus non facilisis. Sed libero diam, consectetur eu efficitur nec, suscipit ut purus. Duis luctus nisi at tincidunt semper. Donec eleifend sagittis orci eu consectetur. Cras et massa felis. Vestibulum accumsan iaculis erat ut auctor. Aenean commodo est sit amet mi tristique varius.",
      status: "REVIEW",
    };

    const updateResponse = await request(app)
      .put(`/api/v1/tasks/${randomUUID()}`)
      .send(updateInfo);

    expect(updateResponse.body.message).toEqual("Task not found");
    expect(updateResponse.body.statusCode).toEqual(404);
  });

  it("Should not be able to update a task with a non existing status", async () => {
    const createResponse = await request(app).post("/api/v1/tasks").send({
      title: "Meu título teste",
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc ultricies at enim vel tempor. Nam non metus enim. Vivamus malesuada placerat justo, molestie gravida quam varius eget. In rhoncus libero ipsum, eget bibendum justo porttitor elementum. Donec mollis ipsum sed tincidunt dignissim. Aenean quam lorem, sagittis sit amet magna at, malesuada maximus augue.",
      status: "DONE",
    });

    const updateInfo = {
      title: "Meu título teste 2",
      content:
        "Duis elementum augue dui, sed tincidunt velit tempor eu. Fusce diam dolor, aliquam vitae nibh nec, consectetur ultrices eros. Morbi commodo eu lacus non facilisis. Sed libero diam, consectetur eu efficitur nec, suscipit ut purus. Duis luctus nisi at tincidunt semper. Donec eleifend sagittis orci eu consectetur. Cras et massa felis. Vestibulum accumsan iaculis erat ut auctor. Aenean commodo est sit amet mi tristique varius.",
      status: "TESTE",
    };

    const updateResponse = await request(app)
      .put(`/api/v1/tasks/${createResponse.body.id}`)
      .send(updateInfo);

    expect(updateResponse.body.message).toEqual("Unrecognized status type");
    expect(updateResponse.body.statusCode).toEqual(400);
  });

  it("Should not be able to update a task with a empty title", async () => {
    const createResponse = await request(app).post("/api/v1/tasks").send({
      title: "Meu título teste",
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc ultricies at enim vel tempor. Nam non metus enim. Vivamus malesuada placerat justo, molestie gravida quam varius eget. In rhoncus libero ipsum, eget bibendum justo porttitor elementum. Donec mollis ipsum sed tincidunt dignissim. Aenean quam lorem, sagittis sit amet magna at, malesuada maximus augue.",
      status: "DONE",
    });

    const updateInfo = {
      title: "",
    };

    const updateResponse = await request(app)
      .put(`/api/v1/tasks/${createResponse.body.id}`)
      .send(updateInfo);

    expect(updateResponse.body.message).toEqual("A task must have a title");
    expect(updateResponse.body.statusCode).toEqual(400);
  });
});
