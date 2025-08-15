'use client'


import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client'
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const HomeView = () => {

  return (
    <div >
     Home view
    </div>
  )
}


// import { auth } from '@/lib/auth'
// import { headers } from 'next/headers'
// import { redirect } from 'next/navigation'
// import React, { Suspense } from 'react'
// import { ErrorBoundary } from 'react-error-boundary'
// import { getQueryClient, trpc } from '@/trpc/server'
// import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

// import { MeetingStatus } from '@/modules/meetings/types'
// import { DashboardView, DashboardViewError, DashboardViewLoading } from '@/components/DashboardView'


// const HomeView = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers()
//   })

//   if(!session){
//     redirect("/sign-in")
//   }

//   const queryClient = getQueryClient()
  
//   // Prefetch all required data for dashboard
//   void queryClient.prefetchQuery(
//     trpc.meetings.getMany.queryOptions({
//       page: 1,
//       pageSize: 1000, // Get all meetings for stats
//     }),
//   )

//   void queryClient.prefetchQuery(
//     trpc.agents.getMany.queryOptions({
//       page: 1,
//       pageSize: 1000, // Get all agents for stats
//     }),
//   )

//   void queryClient.prefetchQuery(
//     trpc.meetings.getMany.queryOptions({
//       page: 1,
//       pageSize: 5,
//       status: MeetingStatus.Upcoming,
//     }),
//   )

//   void queryClient.prefetchQuery(
//     trpc.meetings.getMany.queryOptions({
//       page: 1,
//       pageSize: 5,
//       status: MeetingStatus.Completed,
//     }),
//   )

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Suspense fallback={<DashboardViewLoading />}>
//         <ErrorBoundary fallback={<DashboardViewError />}>
//           <DashboardView />
//         </ErrorBoundary>
//       </Suspense>
//     </HydrationBoundary>
//   );
// }

// export default HomeView