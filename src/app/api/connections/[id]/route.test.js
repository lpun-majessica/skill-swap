// @vitest-environment node

import { PUT } from "./route";
import { connections } from "@/utils/test-helper";

import { dbConnect, dbDisconnect } from "@/lib/db";
import { Connection, User } from "@/models";

beforeAll(async () => {
  await dbConnect();

  await Connection.deleteMany();
  await Connection.insertMany(connections);
});

describe("/api/connections/[id]", async () => {
  describe("PUT", async () => {const connectionStatus = { isAccepted: true };

    it("modify valid connection", async () => {
      const connectionId = { id: connections[0]._id };

      const request = { json: async () => connectionStatus };
      const context = { params: connectionId };

      const response = await PUT(request, context);
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(body.isAccepted).toEqual(connectionStatus.isAccepted);
      expect(body.id).toEqual(connectionId.id);
    });

    it("modify non-existing connection", async () => {
      const connectionId = { id: connections[0].sender_id };
      const request = { json: async () => connectionStatus };
      const context = { params: connectionId };

      const response = await PUT(request, context);
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(body).toBe(null);
    });

    it("modify invalid connection", async () => {
      const connectionId = { id: "0" };
      const request = { json: async () => connectionStatus };
      const context = { params: connectionId };

      const response = await PUT(request, context);
      const body = await response.json();

      expect(response.status).toBe(404);
    });
  });
})

afterAll(async () => {
  await dbDisconnect();
});
