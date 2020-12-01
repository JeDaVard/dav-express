import mongoose from 'mongoose';

import { env } from 'config/environment';

async function connectMongo() {
    await mongoose.connect(env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
}

export { connectMongo };
