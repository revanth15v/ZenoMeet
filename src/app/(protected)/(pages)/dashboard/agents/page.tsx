import {
    AgentsView,
    AgentsViewError,
    AgentViewLoading } from '@/modules/agents/ui/views/agent-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import React, { Suspense } from 'react'
import ListHeader from '@/modules/agents/ui/components/list-header';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const page = async () => {

  const session = await auth.api.getSession({
      headers: await headers()
    })
  
    if(!session){
      redirect("/sign-in")
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

  return (
    <>
    <ListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentViewLoading/>}>
        <ErrorBoundary fallback={<AgentsViewError/>}>
    <AgentsView/>
    </ErrorBoundary>
    </Suspense>
    </HydrationBoundary>
    </>
  )
}

export default page
