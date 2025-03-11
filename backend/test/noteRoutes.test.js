const request = require('supertest');
const app = require('../server');
const Note = require('../models/Note');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


describe("Note Endpoints", () => {
    let token;
    let userId;
    beforeEach(async () => {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const user = await User.create({
            name: "Note Tester",
            email: "notetester@example.com",
            username: "notetester",
            password: hashedPassword
        });
        userId = user._id;
        token = jwt.sign({ id: user.id}, process.env.JWT_SECRET || "testsecret", {expiresIn: "1h"});
    });

    describe("POST /api/notes", () => {
        it("should create a new note successfully", async () => {
            const res = await request(app)
                .post('/api/notes')
                .set('x-auth-token', token)
                .send({
                    title: "Test Note",
                    content: "This is a test note"
                });
            
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("note");
            expect(res.body.msg).toBe("Note created successfully");
        });

        it("should reject invalid note data", async () => {
            const res = await request(app)
                .post('/api/notes')
                .set('x-auth-token', token)
                .send({});
            
            expect(res.statusCode).toEqual(422);
            expect(res.body.errors).toBeDefined();
        });

        it("should reject unauthorized note creation", async () => {
            const res = await request(app)
                .post('/api/notes')
                .send({
                    title: "Test Note",
                    content: "This is a test note"
                });
            
            expect(res.statusCode).toEqual(401);
            expect(res.body.msg).toBe("No token, authorization denied");
        });
    })

    describe("GET /api/notes", () => {
        it("should get all notes for a user", async () => {
            await Note.create({
                user: userId,
                title: "Test Note",
                content: "This is a test note"
            });
            const res = await request(app)
                .get('/api/notes')
                .set('x-auth-token', token);
            
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBe(1);
        });

        it("should reject unauthorized note retrieval", async () => {
            const res = await request(app)
                .get('/api/notes');
            
            expect(res.statusCode).toEqual(401);
            expect(res.body.msg).toBe("No token, authorization denied");
        });
    });

    describe("DELETE /api/notes/:id", () => {
        it("should delete a note successfully", async () => {
            const note = await Note.create({
                user: userId,
                title: "Test Note",
                content: "This is a test note"
            });
            const res = await request(app)
                .delete(`/api/notes/${note._id}`)
                .set('x-auth-token', token);
            
            expect(res.statusCode).toEqual(200);
            expect(res.body.msg).toBe("Note deleted successfully");
        });
    });
})