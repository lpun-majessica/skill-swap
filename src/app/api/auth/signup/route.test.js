import { POST } from "./route.js";
import { User } from "@/models";

const testUser = { email: "test@example.com", username: "test" };

describe("/api/auth/signup", async () => {
  describe("POST", async () => {
    it("create new user", async () => {
      const request = { json: async () => testUser };
      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(body.message).toBe("New user created");
    });
  })
})

afterAll(async () => {
  await User.deleteMany();
});
