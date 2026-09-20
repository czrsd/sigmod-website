import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Bitte MONGODB_URI in der .env definieren!');
}

type MongooseCache = {
    conn: Awaited<ReturnType<typeof mongoose.connection.getClient>> | null;
    promise: Promise<Awaited<ReturnType<typeof mongoose.connection.getClient>>> | null;
};

const globalWithMongoose = global as typeof globalThis & {
    mongoose?: MongooseCache;
};

const cached: MongooseCache =
    globalWithMongoose.mongoose ??
    (globalWithMongoose.mongoose = { conn: null, promise: null });

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
            console.log('Unified Database Connection Established');
            return m.connection.getClient();
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
