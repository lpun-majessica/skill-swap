import { beforeEach } from "vitest";

import { POST, DELETE } from "./route";
import { GET as getUserData } from "../route";
import { dbConnect, dbDisconnect } from "@/lib/db";

import { Skill, User } from "@/models";
import { skills, users } from "@/utils/test-helper";

beforeAll(async () => {
  await dbConnect();
});

beforeEach(async () => {
  await User.deleteMany();
  await Skill.deleteMany();

  await User.insertMany(users);
  await Skill.insertMany(skills);
});

describe("/api/users/[id]/teaching", async () => {
  const targetUser = users[0];
  const newSkill = skills[skills.length - 1]._id;
  const existingSkill = targetUser.skillsToTeach[0];

  const newSkillRequest = {
    json: async () => {
      return { skillId: newSkill };
    },
  };
  const existingSkillRequest = {
    json: async () => {
      return { skillId: existingSkill };
    },
  };

  const params = { id: targetUser._id };

  describe("DELETE", async () => {
    it("delete existing skill", async () => {
      const response = await DELETE(existingSkillRequest, { params });
      expect(response.status).toBe(204);

      const updatedUser = await getUserData(null, { params });
      const body = await updatedUser.json();
      const updatedSkills = body.skillsToTeach.map((skill) => skill.id);

      expect(updatedSkills).toHaveLength(targetUser.skillsToTeach.length - 1);
      expect(updatedSkills).not.toContain(existingSkill);
    });

    it("delete non-existing skill", async () => {
      const response = await DELETE(newSkillRequest, { params });
      expect(response.status).toBe(204);

      const updatedUser = await getUserData(null, { params });
      const body = await updatedUser.json();
      const updatedSkills = body.skillsToTeach.map((skill) => skill.id);

      expect(updatedSkills).toHaveLength(targetUser.skillsToTeach.length);
      expect(updatedSkills).not.toContain(newSkill);
    });
  });

  describe("POST", async () => {
    it("add a new skill", async () => {
      const response = await POST(newSkillRequest, { params });
      const body = await response.json();
      const updatedSkills = body.skillsToTeach.map((skill) => skill.id);

      expect(response.status).toBe(201);
      expect(updatedSkills).toHaveLength(targetUser.skillsToTeach.length + 1);
      expect(updatedSkills).toContain(newSkill);
    });

    it("add existing skill", async () => {
      const response = await POST(existingSkillRequest, { params });
      const body = await response.json();
      const updatedSkills = body.skillsToTeach.map((skill) => skill.id);

      expect(response.status).toBe(201);
      expect(updatedSkills).toHaveLength(targetUser.skillsToTeach.length);
      expect(updatedSkills).toEqual(targetUser.skillsToTeach);
    });
  });
});

afterAll(async () => {
  await dbDisconnect();
});
