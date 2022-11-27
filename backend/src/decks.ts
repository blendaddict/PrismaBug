import { deck, Prisma, PrismaClient, user } from "@prisma/client";
import { connect } from "http2";
import _, { contains, random, sample } from "underscore";
import { include, where } from "underscore";
import { generateUsername } from "./names";

const prisma = new PrismaClient();
const maxReturnedDecks = 100;

export async function upsertUser(id: string) {
  return await prisma.user.upsert({
    where: { id: id },
    update: {},
    create: {
      name: generateUsername(),
      id,
    },
  });
}

export async function loadOwnProfile(creatorId: string) {
  let user: user;
  if ((await prisma.user.count({ where: { id: creatorId } })) == 0) {
    console.log("user with id " + creatorId + " does not exist");
    user = await upsertUser(creatorId);
  } else {
    user = (await prisma.user.findUnique({
      where: {
        id: creatorId,
      },
    })) as unknown as user;
  }
  let decks = await prisma.deck.findMany({
    where: {
      user: {
        id: creatorId,
      },
    },
  });

  return { decks: decks };
}

export async function createDeck(creatorId: string) {
  if ((await prisma.user.count({ where: { id: creatorId } })) == 0) {
    await upsertUser(creatorId);
  }

  return await prisma.deck.create({
    data: {
      user: {
        connect: {
          id: creatorId,
        },
      },
      name: "test",
    },
  });
}
