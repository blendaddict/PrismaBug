"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeck = exports.loadOwnProfile = exports.upsertUser = void 0;
const client_1 = require("@prisma/client");
const names_1 = require("./names");
const prisma = new client_1.PrismaClient();
const maxReturnedDecks = 100;
async function upsertUser(id) {
    return await prisma.user.upsert({
        where: { id: id },
        update: {},
        create: {
            name: (0, names_1.generateUsername)(),
            id,
        },
    });
}
exports.upsertUser = upsertUser;
async function loadOwnProfile(creatorId) {
    let user;
    if ((await prisma.user.count({ where: { id: creatorId } })) == 0) {
        console.log("user with id " + creatorId + " does not exist");
        user = await upsertUser(creatorId);
    }
    else {
        user = (await prisma.user.findUnique({
            where: {
                id: creatorId,
            },
        }));
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
exports.loadOwnProfile = loadOwnProfile;
async function createDeck(creatorId) {
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
exports.createDeck = createDeck;
