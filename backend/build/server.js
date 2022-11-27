"use strict";
/**
 * Manages the requests of users and connects them to the game logic
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importing libraries
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8000;
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const decks_1 = require("./decks");
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true }));
const httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)());
console.log("started");
////////////////////////////////Express HTTP-requests////////////////////////////////////
app.post("/api/createDeck", async (req, res) => {
    console.log("started request");
    res.json({
        deckId: (await (0, decks_1.createDeck)(req.body.userId))?.id,
    });
});
app.get("/api/loadOwnProfile/", async (req, res) => {
    console.log("asking for profile");
    res.json({ profileInfo: await (0, decks_1.loadOwnProfile)(req.body.userId) });
});
httpServer.listen(8000);
