import { DELETE, GET, PUT } from "./route";
import { notifications, users } from "@/utils/test-helper";

import { dbConnect, dbDisconnect } from "@/lib/db.js";
import { Notification, User } from "@/models";

beforeAll(async () => {
  await dbConnect();

  await User.deleteMany();
  await Notification.deleteMany();

  await User.insertMany(users);
  await Notification.insertMany(notifications);
});

describe("/api/notifs/[id]", async () => {
  const validNotification = notifications[0];
  const nonExistingNotificationId = notifications[0].sender
  const invalidNotificationId = "0"

  const testValidNotif = async (API) => {
    const params = { id: validNotification._id };
    const context = { params };

    return await API(null, context);
  }

  const testNonExistingNotif = async (API) => {
    const params = { id: nonExistingNotificationId };
    const context = { params };

    return await API(null, context);
  }

  const testInvalidNotif = async (API) => {
    const params = { id: invalidNotificationId };
    const context = { params };

    return await API(null, context);
  }

  describe("GET", async () => {
    it("existing notification", async () => {
      const response = await testValidNotif(GET)
      const body = await response.json();
      const { id, createdAt, ...receivedResponse } = {
        ...body,
        sender: body.sender.id,
        _id: body.id,
      };

      expect(response.status).toBe(200);
      expect(receivedResponse).toMatchObject(validNotification);
    });

    it("non-existing notification", async () => {
      const response = await testNonExistingNotif(GET)
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toMatchObject(null);
    })

    it("invalid notification", async () => {
      const response = await testInvalidNotif(GET)
      expect(response.status).toBe(404)
    })
  });

  describe("PUT", async () => {
    it("existing notification", async () => {
      const response = await testValidNotif(PUT)
      const body = await response.json();

      const { id, createdAt, ...receivedResponse } = {
        ...body,
        _id: body.id,
      };
      const expectedResponse = {...validNotification, isRead: true};

      expect(response.status).toBe(201);
      expect(receivedResponse).toMatchObject(expectedResponse);
    });

    it("non-existing notification", async () => {
      const response = await testNonExistingNotif(PUT)
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(body).toMatchObject(null);
    })

    it("invalid notification", async () => {
      const response = await testInvalidNotif(PUT)
      expect(response.status).toBe(404)
    })
  })

  describe("DELETE", async () => {
    it("existing notification", async () => {
      const response = await testValidNotif(DELETE)
      expect(response.status).toBe(204);
      });

    it("non-existing notification", async () => {
      const response = await testNonExistingNotif(DELETE)
      expect(response.status).toBe(204);
    })

    it("invalid notification", async () => {
      const response = await testInvalidNotif(DELETE)
      expect(response.status).toBe(404)
    })
  })
});

afterAll(async () => {
  await dbDisconnect();
});
