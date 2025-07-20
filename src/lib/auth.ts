import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { checkout, polar, portal } from "@polar-sh/better-auth";
import { db } from "@/db"; 
import * as schema from "@/db/schema"
import { polarClient } from "./polar";
 
export const auth = betterAuth({
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    // successUrl: process.env.POLAR_SUCCESS_URL,
                    // authenticatedUsersOnly: true,
                    authenticatedUsersOnly: true,
                    successUrl: "/dashboard/upgrade",
                }),
                portal(),
            ],
        }),
    ],
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
     emailAndPassword: {  
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            ...schema,
        }
    })
})