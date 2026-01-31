import { MongoDBAdapter } from '@auth/mongodb-adapter';
import DiscordProvider from 'next-auth/providers/discord';
import { NextAuthOptions } from 'next-auth';
import dbConnect from '@/lib/db';

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(dbConnect()),
    secret: process.env.NEXTAUTH_SECRET!,

    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            authorization: { params: { scope: 'identify email' } },
        }),
    ],

    session: {
        strategy: 'database',
    },

    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;

                (session.user as any).role = (user as any).role || 'member';
            }
            return session;
        },
    },

    events: {
        async createUser({ user }) {
            const client = await dbConnect();

            const db = client.db();

            await db
                .collection('users')
                .updateOne({ email: user.email }, { $set: { role: 'member' } });

            console.log(`Role assigned to ${user.email}`);
        },
    },

    pages: {
        signIn: '/tutorials',
    },
};
