const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

describe("Auth Endpoints", () => {

  describe("POST /api/auth/signup", () => {
    it("should register a new user successfully", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({
          name: "Test User",
          email: "testuser@example.com",
          username: "testuser",
          password: "password123"
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("jwt");
      expect(res.body.msg).toBe("User created successfully");
    });

    it("should reject invalid sign-up data", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({});

      expect(res.statusCode).toEqual(422);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await User.create({
        name: "Test User",
        email: "loginuser@example.com",
        username: "loginuser",
        password: hashedPassword
      });
    });

    it("should login successfully", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          username: "loginuser",
          password: "password123"
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.msg).toBe("Login successful");
    });

    it("should reject login with invalid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          username: "loginuser",
          password: "wrongpassword"
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.msg).toBe("Invalid credentials");
    });
  });
});
