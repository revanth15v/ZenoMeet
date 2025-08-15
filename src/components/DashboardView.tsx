
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";
// import { useTRPC } from "@/trpc/client"
// import { useQuery } from "@tanstack/react-query";

// import { 
//   Users, 
//   Calendar, 
//   CheckCircle, 
//   Clock, 
//   ArrowRight, 
//   FileText, 
//   Bot, 
//   BarChart3,
//   Plus 
// } from "lucide-react";
// import { MeetingStatus } from '@/modules/meetings/types'
// import { format } from "date-fns";
// import Link from "next/link";
// import { useMemo } from "react";

// // Loading Component
// export function DashboardViewLoading() {
//   return (
//     <div className="min-h-screen bg-gray-50/50">
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
//             <div className="h-4 bg-gray-200 rounded w-96"></div>
//           </div>
//         </div>
//       </div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="space-y-8">
//           {/* Stats Cards Loading */}
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             {[...Array(4)].map((_, i) => (
//               <Card key={i} className="border-0 shadow-sm">
//                 <CardContent className="p-6">
//                   <div className="animate-pulse">
//                     <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
//                     <div className="h-8 bg-gray-200 rounded w-16 mb-1"></div>
//                     <div className="h-3 bg-gray-200 rounded w-32"></div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
          
//           {/* Main sections loading */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div className="space-y-8">
//               {[...Array(2)].map((_, i) => (
//                 <Card key={i} className="border-0 shadow-sm">
//                   <CardContent className="p-6">
//                     <div className="animate-pulse space-y-4">
//                       <div className="h-6 bg-gray-200 rounded w-48"></div>
//                       {[...Array(3)].map((_, j) => (
//                         <div key={j} className="space-y-2">
//                           <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                           <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//             <div>
//               <Card className="border-0 shadow-sm">
//                 <CardContent className="p-6">
//                   <div className="animate-pulse space-y-4">
//                     <div className="h-6 bg-gray-200 rounded w-32"></div>
//                     {[...Array(4)].map((_, i) => (
//                       <div key={i} className="space-y-2">
//                         <div className="h-4 bg-gray-200 rounded w-full"></div>
//                         <div className="h-2 bg-gray-200 rounded w-full"></div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Error Component
// export function DashboardViewError() {
//   return (
//     <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
//       <Card className="w-full max-w-md">
//         <CardContent className="p-6 text-center">
//           <div className="text-red-500 mb-4">
//             <CheckCircle className="h-12 w-12 mx-auto" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//             Something went wrong
//           </h3>
//           <p className="text-gray-600 mb-4">
//             We couldn't load your dashboard. Please try refreshing the page.
//           </p>
//           <Button onClick={() => window.location.reload()}>
//             Refresh Page
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// // Main Dashboard View Component
// export function DashboardView() {
//   // Fetch all meetings for stats calculation
//   const trpc = useTRPC();
//   const { data: allMeetings } = useQuery(
//     trpc.meetings.getMany.queryOptions({
//           page: 1,
//           pageSize: 1000,
//     })
//   )

//   // Fetch all agents for stats
//   const { data: allAgents } =  useQuery(
//           trpc.agents.getMany.queryOptions({
//               pageSize: 100,
//             page: 1
//           }))

//   // Fetch upcoming meetings
//   const { data: upcomingMeetings } = useQuery(
//     trpc.meetings.getMany.queryOptions({
//     page: 1,
//     pageSize: 5,
//     status: MeetingStatus.Upcoming,
//     })
//   )

//   // Fetch completed meetings
//   const { data: completedMeetings } = useQuery(
//     trpc.meetings.getMany.queryOptions({
//     page: 1,
//     pageSize: 5,
//     status: MeetingStatus.Completed,
//     })
//   )

//   // Calculate stats
//   const totalMeetings = allMeetings?.total || 0;
//   const upcomingCount = allMeetings?.items?.filter(
//     (meeting) => meeting.status === MeetingStatus.Upcoming
//   ).length || 0;
//   const completedCount = allMeetings?.items?.filter(
//     (meeting) => meeting.status === MeetingStatus.Completed
//   ).length || 0;
//   const totalAgents = allAgents?.total || 0;

//   // Calculate agents with meeting counts
//   const agentsWithMeetingCount = useMemo(() => {
//     if (!allAgents?.item || !allMeetings?.items) return [];

//     const agentMeetingCounts = allMeetings.items.reduce((acc, meeting) => {
//       const agentId = meeting.agentId;
//       acc[agentId] = (acc[agentId] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);

//     const agentsWithCounts = allAgents.item.map(agent => ({
//       ...agent,
//       meetingCount: agentMeetingCounts[agent.id] || 0,
//     }));

//     return agentsWithCounts.sort((a, b) => b.meetingCount - a.meetingCount);
//   }, [allAgents?.item, allMeetings?.items]);

//   const maxMeetingCount = agentsWithMeetingCount.length > 0 
//     ? Math.max(...agentsWithMeetingCount.map(agent => agent.meetingCount))
//     : 0;

//   const stats = [
//     {
//       title: "Total Meetings",
//       value: totalMeetings,
//       icon: Calendar,
//       description: "All meetings created",
//       color: "text-blue-600",
//       bgColor: "bg-blue-50",
//     },
//     {
//       title: "Upcoming Meetings",
//       value: upcomingCount,
//       icon: Clock,
//       description: "Scheduled meetings",
//       color: "text-orange-600",
//       bgColor: "bg-orange-50",
//     },
//     {
//       title: "Completed Meetings",
//       value: completedCount,
//       icon: CheckCircle,
//       description: "Finished meetings",
//       color: "text-green-600",
//       bgColor: "bg-green-50",
//     },
//     {
//       title: "Total Agents",
//       value: totalAgents,
//       icon: Users,
//       description: "AI agents created",
//       color: "text-purple-600",
//       bgColor: "bg-purple-50",
//     },
//   ];

//   const formatMeetingTime = (createdAt: Date) => {
//     return format(new Date(createdAt), "MMM dd, HH:mm");
//   };

//   const formatCompletedDate = (endedAt: Date | null) => {
//     if (!endedAt) return "N/A";
//     return format(new Date(endedAt), "MMM dd, HH:mm");
//   };

//   const formatDuration = (duration: number | null) => {
//     if (!duration) return "N/A";
//     const minutes = Math.floor(duration / 60);
//     const seconds = duration % 60;
//     return `${minutes}m ${seconds}s`;
//   };

//   const truncateSummary = (summary: string | null, maxLength: number = 80) => {
//     if (!summary) return "No summary available";
//     return summary.length > maxLength ? `${summary.substring(0, maxLength)}...` : summary;
//   };

//   const truncateInstructions = (instructions: string, maxLength: number = 60) => {
//     return instructions.length > maxLength 
//       ? `${instructions.substring(0, maxLength)}...` 
//       : instructions;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50">
//       {/* Header Section */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//               <p className="text-gray-600 mt-1">
//                 Welcome back! Here's an overview of your meetings and agents.
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <Link href="/agents/new">
//                 <Button variant="outline" size="sm" className="flex items-center gap-2">
//                   <Users className="h-4 w-4" />
//                   New Agent
//                 </Button>
//               </Link>
//               <Link href="/meetings/new">
//                 <Button size="sm" className="flex items-center gap-2">
//                   <Plus className="h-4 w-4" />
//                   Schedule Meeting
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="space-y-8">
//           {/* Stats Cards */}
//           <section>
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//               {stats.map((stat) => {
//                 const Icon = stat.icon;
//                 return (
//                   <Card key={stat.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                       <CardTitle className="text-sm font-medium text-muted-foreground">
//                         {stat.title}
//                       </CardTitle>
//                       <div className={`p-2 rounded-full ${stat.bgColor}`}>
//                         <Icon className={`h-4 w-4 ${stat.color}`} />
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="text-2xl font-bold">{stat.value}</div>
//                       <p className="text-xs text-muted-foreground mt-1">
//                         {stat.description}
//                       </p>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>
//           </section>

//           {/* Two Column Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Left Column */}
//             <div className="space-y-8">
//               {/* Upcoming Meetings */}
//               <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
//                 <CardHeader className="pb-4">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="flex items-center gap-2">
//                       <Clock className="h-5 w-5 text-blue-600" />
//                       Upcoming Meetings
//                     </CardTitle>
//                     <Link 
//                       href="/meetings?status=upcoming" 
//                       className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
//                     >
//                       View all
//                       <ArrowRight className="h-3 w-3" />
//                     </Link>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   {!upcomingMeetings?.items?.length ? (
//                     <div className="text-center py-8">
//                       <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                       <p className="text-gray-500 text-sm">No upcoming meetings</p>
//                       <p className="text-gray-400 text-xs mt-1">Schedule a meeting to get started</p>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       {upcomingMeetings.items.map((meeting) => (
//                         <Link 
//                           key={meeting.id}
//                           href={`/meetings/${meeting.id}`}
//                           className="block group"
//                         >
//                           <div className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200">
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
//                                   {meeting.name}
//                                 </h4>
//                                 <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
//                                   <div className="flex items-center gap-1">
//                                     <Users className="h-3 w-3" />
//                                     {meeting.agent.name}
//                                   </div>
//                                   <div className="flex items-center gap-1">
//                                     <Calendar className="h-3 w-3" />
//                                     {formatMeetingTime(new Date(meeting.createdAt))}
//                                   </div>
//                                 </div>
//                               </div>
//                               <Badge 
//                                 variant="outline" 
//                                 className="text-xs bg-blue-100 text-blue-800 border-blue-200"
//                               >
//                                 {meeting.status}
//                               </Badge>
//                             </div>
//                           </div>
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
              
//               {/* Recent Completed Meetings */}
//               <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
//                 <CardHeader className="pb-4">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="flex items-center gap-2">
//                       <CheckCircle className="h-5 w-5 text-green-600" />
//                       Recent Completed Meetings
//                     </CardTitle>
//                     <Link 
//                       href="/meetings?status=completed" 
//                       className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1"
//                     >
//                       View all
//                       <ArrowRight className="h-3 w-3" />
//                     </Link>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   {!completedMeetings?.items?.length ? (
//                     <div className="text-center py-8">
//                       <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                       <p className="text-gray-500 text-sm">No completed meetings</p>
//                       <p className="text-gray-400 text-xs mt-1">Complete a meeting to see it here</p>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {completedMeetings.items.map((meeting) => (
//                         <Link 
//                           key={meeting.id}
//                           href={`/meetings/${meeting.id}`}
//                           className="block group"
//                         >
//                           <div className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex-1">
//                                 <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
//                                   {meeting.name}
//                                 </h4>
//                                 <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
//                                   <div className="flex items-center gap-1">
//                                     <Users className="h-3 w-3" />
//                                     {meeting.agent.name}
//                                   </div>
//                                   <div className="flex items-center gap-1">
//                                     <Clock className="h-3 w-3" />
//                                     {formatDuration(meeting.duration)}
//                                   </div>
//                                   <div className="text-gray-400">
//                                     {formatCompletedDate(meeting.endedAt ? new Date(meeting.endedAt) : null)}
//                                   </div>
//                                 </div>
//                               </div>
//                               <Badge 
//                                 variant="outline" 
//                                 className="text-xs bg-green-100 text-green-800 border-green-200"
//                               >
//                                 Completed
//                               </Badge>
//                             </div>
                            
//                             {meeting.summary && (
//                               <div className="mt-2 p-2 bg-gray-50 rounded border-l-2 border-green-200">
//                                 <div className="flex items-start gap-2">
//                                   <FileText className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
//                                   <p className="text-xs text-gray-600 leading-relaxed">
//                                     {truncateSummary(meeting.summary)}
//                                   </p>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-8">
//               {/* Agent Usage */}
//               <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
//                 <CardHeader className="pb-4">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="flex items-center gap-2">
//                       <BarChart3 className="h-5 w-5 text-purple-600" />
//                       Agent Usage
//                     </CardTitle>
//                     <Link 
//                       href="/agents" 
//                       className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
//                     >
//                       View all
//                       <ArrowRight className="h-3 w-3" />
//                     </Link>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   {!agentsWithMeetingCount.length ? (
//                     <div className="text-center py-8">
//                       <Bot className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                       <p className="text-gray-500 text-sm">No agents created yet</p>
//                       <p className="text-gray-400 text-xs mt-1">Create an agent to get started</p>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {agentsWithMeetingCount.slice(0, 5).map((agent, index) => (
//                         <Link 
//                           key={agent.id}
//                           href={`/agents/${agent.id}`}
//                           className="block group"
//                         >
//                           <div className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex-1">
//                                 <div className="flex items-center gap-2 mb-1">
//                                   <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
//                                     {agent.name}
//                                   </h4>
//                                   {index === 0 && agent.meetingCount > 0 && (
//                                     <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
//                                       Most Active
//                                     </Badge>
//                                   )}
//                                 </div>
//                                 <p className="text-xs text-gray-500 mb-2">
//                                   {truncateInstructions(agent.instructions)}
//                                 </p>
//                               </div>
//                               <div className="text-right ml-4">
//                                 <div className="text-lg font-semibold text-gray-900">
//                                   {agent.meetingCount}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {agent.meetingCount === 1 ? 'meeting' : 'meetings'}
//                                 </div>
//                               </div>
//                             </div>
                            
//                             {maxMeetingCount > 0 && (
//                               <div className="space-y-1">
//                                 <div className="flex items-center justify-between text-xs text-gray-500">
//                                   <span>Usage</span>
//                                   <span>{Math.round((agent.meetingCount / maxMeetingCount) * 100)}%</span>
//                                 </div>
//                                 <Progress 
//                                   value={maxMeetingCount > 0 ? (agent.meetingCount / maxMeetingCount) * 100 : 0} 
//                                   className="h-2"
//                                 />
//                               </div>
//                             )}
//                           </div>
//                         </Link>
//                       ))}
                      
//                       {agentsWithMeetingCount.length > 5 && (
//                         <div className="text-center pt-2">
//                           <Link 
//                             href="/agents"
//                             className="text-sm text-purple-600 hover:text-purple-800 font-medium"
//                           >
//                             View {agentsWithMeetingCount.length - 5} more agents
//                           </Link>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 border border-blue-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   Quick Actions
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4">
//                   Get started with common tasks
//                 </p>
//                 <div className="space-y-3">
//                   <Link href="/meetings/new" className="block">
//                     <div className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-blue-100">
//                       <div className="p-2 bg-blue-100 rounded-full">
//                         <Calendar className="h-4 w-4 text-blue-600" />
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-900">Schedule Meeting</div>
//                         <div className="text-xs text-gray-500">Create a new meeting with an agent</div>
//                       </div>
//                     </div>
//                   </Link>
                  
//                   <Link href="/agents/new" className="block">
//                     <div className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-blue-100">
//                       <div className="p-2 bg-purple-100 rounded-full">
//                         <Users className="h-4 w-4 text-purple-600" />
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-900">Create Agent</div>
//                         <div className="text-xs text-gray-500">Set up a new AI agent</div>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }