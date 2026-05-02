import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URL || "mongodb+srv://sarifulrana:dfn12345@cluster0.j5m1a94.mongodb.net/tiles-gallery?appName=Cluster0";
console.log("MONGODB_URL found:", !!process.env.MONGODB_URL);
console.log("Connecting to MongoDB with:", connectionString.split("@")[1]); // Log host only for security
const client = new MongoClient(connectionString);

export const auth = betterAuth({
    database: mongodbAdapter(client.db()),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
    user: {
        additionalFields: {
            photoURL: {
                type: "string",
                required: false,
            }
        }
    }
});
