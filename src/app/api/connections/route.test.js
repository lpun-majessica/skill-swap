import { GET, POST } from "./route";
import { users, connections } from "@/utils/test-helper";

import { dbConnect, dbDisconnect } from "@/lib/db";
import { Connection, User } from "@/models";

beforeAll(async () => {
  await dbConnect();
  await User.deleteMany();
  await Connection.deleteMany();

  await User.insertMany(users);
  await Connection.insertMany(connections);
});

describe("/api/connections", async () => {
  describe("GET", async () => {
    it("get connections of a user", async () => {
      const targetUserId = users[0]._id;
      const request = {
        nextUrl: {
          searchParams: new URLSearchParams({ userId: targetUserId }),
        },
      };
      const response = await GET(request);
      const body = await response.json();

      const expectedData = connections
        .filter(
          (conn) =>
            conn.sender_id === targetUserId ||
            conn.receiver_id === targetUserId,
        )
        .map((conn) => {
          const data = { ...conn, id: conn._id };
          delete data._id;
          return data;
        });

      expect(response.status).toBe(200);
      expect(body).toEqual(expectedData);
    });

    it("get connections of invalid user", async () => {
      const invalidUserId = connections[0]._id;
      const request = {
        nextUrl: {
          searchParams: new URLSearchParams({ userId: invalidUserId }),
        },
      };
      const response = await GET(request);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toHaveLength(0);
    });

    it("no userId provided", async () => {
      const request = {
        nextUrl: { searchParams: new URLSearchParams({ userId: "" }) },
      };
      const response = await GET(request);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.error).toBe("no userId");
    });
  });

  describe("POST", async () => {
    it("create a connection", async () => {});
  });
});

afterAll(async () => {
  await dbDisconnect();
});
