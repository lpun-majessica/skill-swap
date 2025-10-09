import { DELETE, GET, PUT } from "./route";
import { dbConnect, dbDisconnect } from "@/lib/db";

import { Skill, User } from "@/models";
import { skills, users } from "@/utils/test-helper";

beforeAll(async () => {
  await dbConnect();

  await User.deleteMany();
  await Skill.deleteMany();

  await User.insertMany(users);
  await Skill.insertMany(skills);
});

describe("/api/users/[id]", async () => {
  const { _id, email, ...validUser } = users[0];
  const nonExistingUserId = users[0].skillsToLearn[0];
  const invalidUserId = "0";

  const expectedResponse = { ...validUser, id: _id };

  describe("GET", async () => {
    it("get valid user", async () => {
      const params = { id: expectedResponse.id };
      const response = await GET(null, { params });
      const body = await response.json();

      const skillsToLearn = body.skillsToLearn.map((skill) => skill.id);
      const skillsToTeach = body.skillsToTeach.map((skill) => skill.id);
      const receivedResponse = { ...body, skillsToLearn, skillsToTeach };

      expect(response.status).toBe(200);
      expect(receivedResponse).toEqual(expectedResponse);
    });

    it("get non-existing user", async () => {
      const params = { id: nonExistingUserId };
      const response = await GET(null, { params });
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toBe(null);
    });

    it("get invalid user", async () => {
      const params = { id: invalidUserId };
      const response = await GET(null, { params });

      expect(response.status).toBe(404);
    });
  });

  describe("PUT", async () => {
    const newUsername = { username: "username" };
    const request = { json: async () => newUsername };

    it("update valid user", async () => {
      const params = { id: expectedResponse.id };

      const response = await PUT(request, { params });
      const body = await response.json();

      const skillsToLearn = body.skillsToLearn.map((skill) => skill.id);
      const skillsToTeach = body.skillsToTeach.map((skill) => skill.id);

      expectedResponse.username = newUsername.username;
      const receivedResponse = { ...body, skillsToLearn, skillsToTeach };

      expect(response.status).toBe(201);
      expect(receivedResponse).toEqual(expectedResponse);
    });

    it("update non-existing user", async () => {
      const params = { id: nonExistingUserId };
      const response = await PUT(request, { params });
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(body).toBe(null);
    });

    it("update invalid user", async () => {
      const params = { id: invalidUserId };
      const response = await PUT(request, { params });

      expect(response.status).toBe(404);
    });

    it("duplicate unique fields", async () => {
      newUsername.username = users[1].username;
      const params = { id: expectedResponse.id };
      const response = await PUT(request, { params });
      const body = await response.json();

      expect(response.status).toBe(404);
      expect(body.error).toMatch(/E11000/);
    });
  });

  describe("DELETE", async () => {
    it("deletes valid user", async () => {
      const params = { id: expectedResponse.id };
      const response = await DELETE(null, { params });

      expect(response.status).toBe(204);
    })

    it("deletes invalid user", async () => {
      const params = { id: invalidUserId };
      const response = await DELETE(null, { params });

      expect(response.status).toBe(404);
    })
  })
});

afterAll(async () => {
  await dbDisconnect();
});
