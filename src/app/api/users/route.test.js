// @vitest-environment node

import { GET } from "./route";
import { dbConnect, dbDisconnect } from "@/lib/db";

import { User, Skill } from "@/models";
import { users, skills } from "@/utils/test-helper";

beforeAll(async () => {
  await dbConnect();

  await User.deleteMany();
  await Skill.deleteMany();

  await User.insertMany(users);
  await Skill.insertMany(skills);
});

describe("/api/users", async () => {
  describe("GET", async () => {
    it("get all users", async () => {
      const searchParams = [];
      const request = { nextUrl: { searchParams } };

      const response = await GET(request);
      const body = await response.json();

      const returnedUsers = body.map((user) => {
        const skillsToTeach = user.skillsToTeach.map(({ id }) => id);
        const skillsToLearn = user.skillsToLearn.map(({ id }) => id);
        const { id, ...returnedFields } = user;

        return { ...returnedFields, skillsToTeach, skillsToLearn, _id: id };
      });

      expect(response.status).toBe(200);
      expect(returnedUsers).toEqual(users.map(user => {
        const { email, ...returnedFields } = user
        return returnedFields;
      }))
    });

    describe("find users", async () => {
      it("existing user", async () => {
        const searchParams = [["username", users[0].username]];
        const request = { nextUrl: { searchParams } };

        const response = await GET(request);
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.isExisted).toBe(true);
      });

      it("non-existing user", async () => {
        const searchParams = [["username", "not-available"]];
        const request = { nextUrl: { searchParams } };

        const response = await GET(request);
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.isExisted).toBe(false);
      });
    });
  });
});

afterAll(async () => {
  await dbDisconnect();
});
