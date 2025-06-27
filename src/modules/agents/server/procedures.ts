import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";
import { object, z } from "zod";
import { Input } from "@/components/ui/input";
import {eq} from 'drizzle-orm'


export const agentsRouter = createTRPCRouter({

    //TODO: change getOne to use protectedProcedure
     getOne: protectedProcedure.input(z.object({id:z.string()})).query(async ({input}) => {
        const [existingAgent] = await db.select()
        .from(agents)
        .where(eq(agents.id, input.id))

        // await new Promise((resolve) => setTimeout(resolve, 5000))

        return existingAgent
    }),

    //TODO: change getMany to use protectedProcedure

    getMany: protectedProcedure.query(async () => {
        const data = await db.select().from(agents)

        // await new Promise((resolve) => setTimeout(resolve, 5000))

        return data
    }),
    create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({input, ctx}) => {
        const [createdAgent] = await db.insert(agents)
        .values({
            ...input,
            userId:ctx.auth.user.id,
        }).returning()

        return createdAgent;
    })
})