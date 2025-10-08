// @vitest-environment node

import { GET, POST, DELETE } from "./route";

import { dbConnect, dbDisconnect } from "@/lib/db";
import { Notification, User } from "@/models";
import { notifications, users } from "@/utils/test-helper";

beforeAll(async () => {
  await dbConnect();

  await User.deleteMany();
  await Notification.deleteMany();

  await User.insertMany(users);
  await Notification.insertMany(notifications);
});

describe("/api/notifs", async () => {
  describe("GET", async () => {
    it("responds with 200", async () => {
      const targetUserId = notifications[0].sender;
      const request = {
        nextUrl: {
          searchParams: new URLSearchParams({ userId: targetUserId }),
        },
      };

      const response = await GET(request);
      const body = (await response.json()).map(
        ({ id, sender, receiver, type, isRead }) => {
          return {
            _id: id,
            sender: sender.id,
            receiver,
            type,
            isRead,
          };
        },
      );
      const expectedResponse = notifications.filter(
        (notif) => notif.receiver === targetUserId,
      );

      expect(response.status).toBe(200);
      expect(body).toMatchObject(expectedResponse);
    });
  });

  describe("POST", async () => {
    it("create new notification", async () => {
      const { _id, ...newNotification } = {
        ...notifications[0],
        receiver: notifications[0].sender,
      };
      const request = { json: async () => newNotification };

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(body).toMatchObject(newNotification);
    });

    it("duplicated notification", async () => {
      const newNotification = notifications[0];
      const request = { json: async () => newNotification };

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(404);
      expect(body.error).toMatch(/^E11000/);
    });

    it("incorrect notification type", async () => {
      const newNotification = { ...notifications[0], type: "wrongType" };
      const request = { json: async () => newNotification };

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(404);
      expect(body.error).toMatch(/not a valid enum value/);
    });
  });

  describe("DELETE", async () => {
    it("delete notification", async () => {
      const { sender, receiver } = notifications[0];
      const targetNotification = { sender, receiver };
      const request = { json: async () => targetNotification };

      const response = await DELETE(request);
      expect(response.status).toBe(204);
    });
  });
});

afterAll(async () => {
  await dbDisconnect();
});
