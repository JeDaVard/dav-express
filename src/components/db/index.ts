import mongoose from 'mongoose';

async function connectMongo(mongoUri: string) {
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
}

export { connectMongo };
