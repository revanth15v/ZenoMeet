import { z } from 'zod';
import { agentsRouter } from '@/modules/agents/server/procedures';
import { baseProcedure, createTRPCRouter } from '../init';
import { meetingsRouter } from '@/modules/meetings/server/procedures';
import { premiumRouter } from '@/modules/premium/server/procedure';


export const appRouter = createTRPCRouter({
    agents: agentsRouter,
    meetings: meetingsRouter,
    premium: premiumRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;