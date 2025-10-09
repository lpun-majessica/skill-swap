import { GET, POST } from "./route";
import { dbConnect, dbDisconnect } from "@/lib/db";

import { Skill } from "@/models";
import { skills } from "@/utils/test-helper";

const skillsInDb = skills
  .slice(0, skills.length - 1)
  .map((skill) => skill.name);
const newSkill = skills[skills.length - 1].name;

beforeAll(async () => {
  await dbConnect();

  await Skill.deleteMany();
  await Skill.insertMany(
    skillsInDb.map((skill) => {
      return { name: skill };
    }),
  );
});

describe("/api/skills", async () => {
  it("GET", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.map((skill) => skill.name)).toMatchObject(skillsInDb);
  });

  describe("POST", async () => {
    it("add new skill", async () => {
      const request = {
        json: async () => {
          return { name: newSkill };
        },
      };
      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(body.name).toEqual(newSkill);

      const allSkills = await (await GET()).json();
      expect(allSkills.map((skill) => skill.name)).toEqual(
        skills.map((skill) => skill.name),
      );
    });
  });
});

afterAll(async () => {
  await dbDisconnect();
});
