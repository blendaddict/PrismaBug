/**
 * Manages the requests of users and connects them to the game logic
 *
 */

//importing libraries
import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 8000;
import _ from "underscore";

import cors from "cors";
import { createServer } from "http";

import dotenv from "dotenv";

import {
  createDeck,
  
 
  loadOwnProfile,
  
} from "./decks";





dotenv.config();
app.use(express.json());
app.use(cors({ credentials: true }));


const httpServer = createServer(app);


app.use(cors());

console.log("started");



////////////////////////////////Express HTTP-requests////////////////////////////////////

app.post("/api/createDeck",  async (req, res) => {
  console.log("started request");
  res.json({
    deckId: (await createDeck(req.body.userId as unknown as string))?.id,
  });
});

app.get("/api/loadOwnProfile/", async (req, res) => {
  console.log("asking for profile");
  res.json({ profileInfo: await loadOwnProfile(req.body.userId as unknown as string) });
});









httpServer.listen(8000);
