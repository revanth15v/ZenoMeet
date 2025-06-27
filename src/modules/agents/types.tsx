import { inferRouterOutputs } from "@trpc/server";

// Update the import path below to the correct location of your AppRouter
import type { AppRouter } from '../../trpc/routers/_app';

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"]