import { env } from 'config/environment';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// DO NOT UNCOMMENT THIS WITHOUT A DEEP INVESTIGATION
// jest.mock('@kuber-ticket/micro-events')

/* eslint-disable */
declare global {
    namespace NodeJS {
        interface Global {
            signUpAndCookie(
                email?: string,
                id?: mongoose.Types.ObjectId,
            ): { id: string; cookies: string[] };
        }
    }
}
/* eslint-enable */

let mongo: MongoMemoryServer;
beforeAll(async () => {
    env.jwtSecret = 'some-test-secret';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signUpAndCookie = (email, id) => {
    // Define a token payload for a user
    const payload = {
        id: id || new mongoose.Types.ObjectId(),
        email: email || 'text@example.com',
    };
    // Sign a token
    const token = jwt.sign(payload, env.jwtSecret);
    // Create a session object
    const session = { jwt: token };
    const sessionJson = JSON.stringify(session);
    // Convert to base64 format
    const base64 = Buffer.from(sessionJson).toString('base64');
    // Imitate default expressJS session-cookies appearance
    const cookies = [`express:sess=${base64}`];

    return { id: payload.id.toHexString(), cookies };
};
