// "use client"

// import { ColumnDef } from "@tanstack/react-table"
// import { AgentGetOne } from "../../types"
// import { GeneratedAvatar } from "@/components/generated-avatar"
// import { CornerDownRightIcon, CornerRightDownIcon, VideoIcon } from "lucide-react"
// import { Badge } from "@/components/ui/badge"



// export const columns: ColumnDef<AgentGetOne>[] = [
//   {
//     accessorKey: "name",
//     header: "Agent Name",
//     cell: ({row}) => (
//         <div className="flex flex-col gap-y-1">
//             <div className="flex items-center gap-x-2">
//                 <GeneratedAvatar
//                 variant="botttsNeutral"
//                 seed={row.original.name}
//                 className="size-6"
//                 />
//                 <span className="font-semibold capitalize">{row.original.name}</span>
//             </div>
            
//                 <div className="flex items-center gap-x-2">
//                     <CornerDownRightIcon className="size-3 text-muted-foreground"/>

//                     <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize" >
//                         {row.original.instructions}
//                     </span>
//             </div>
//         </div>
//     )
//   },
//   {
// 		accessorKey: "meetingCount",
// 		header: "Meetings",
// 		cell: ({ row }) => (
// 			<Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
// 				<VideoIcon className="text-blue-700" />
// 				{/* {row.original.meetingCount} {row.original.meetingCount === 1 ? "meeting" : "meetings"} */}
//                 5 Meetings
// 			</Badge>
// 		),
// 	},

// ]


"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetOne } from "../../types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { CornerDownRightIcon, VideoIcon, Calendar, Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Helper function to calculate time ago
const timeAgo = (date: Date) => {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else if (diffInDays < 30) {
    return `${diffInDays}d ago`
  } else {
    return new Date(date).toLocaleDateString()
  }
}

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent",
    cell: ({ row }) => (
      <div className="group relative overflow-hidden">
        {/* Subtle hover background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        <div className="relative flex flex-col gap-y-3 p-3 transition-all duration-200 group-hover:scale-[1.01]">
          {/* Agent Header */}
          <div className="flex items-center gap-x-3">
            <div className="relative">
              <GeneratedAvatar
                variant="botttsNeutral"
                seed={row.original.name}
                className="size-10 ring-2 ring-white shadow-md transition-all duration-200 group-hover:ring-blue-200 group-hover:shadow-lg"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base capitalize text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                {row.original.name}
              </h3>
              <div className="flex items-center gap-x-2 mt-1">
                <Calendar className="size-3 text-gray-500" />
                <span className="text-xs font-medium text-gray-600">
                  Created {timeAgo(new Date(row.original.createdAt))}
                </span>
              </div>
            </div>
          </div>
          
          {/* Instructions Card */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-lg p-3 border border-gray-200/60">
            <div className="flex items-start gap-x-2">
              <CornerDownRightIcon className="size-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  Instructions
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed max-w-[250px] capitalize line-clamp-2">
                  {row.original.instructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: "meetingCount",
    header: "Activity",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-3">
        {/* Meeting Badge */}
        <Badge 
          variant="outline" 
          className="flex items-center gap-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 [&>svg]:size-4"
        >
          <VideoIcon className="text-blue-600" />
          <div className="flex flex-col items-start">
            <span className="font-semibold text-blue-700">
              {row.original.meetingCount || 0} {(row.original.meetingCount || 0) === 1 ? "Meeting" : "Meetings"}
            </span>
            <span className="text-xs text-blue-500">Total sessions</span>
          </div>
        </Badge>
        
        {/* AI Intelligence Badge */}
        <div className="flex items-center gap-x-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
          <Brain className="size-4 text-purple-600" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-purple-700">AI Intelligence</span>
            <span className="text-xs text-purple-500">Advanced reasoning</span>
          </div>
        </div>
        
        {/* Creation Info */}
        <div className="flex items-center gap-x-2">
          <div className="px-2 py-1 bg-emerald-100 rounded-md border border-emerald-200">
            <span className="text-xs font-medium text-emerald-700">Ready</span>
          </div>
          <div className="flex items-center gap-x-1 px-2 py-1 bg-gray-100 rounded-md border border-gray-200">
            
            <span className="text-xs text-gray-600">
              {timeAgo(new Date(row.original.createdAt))}
            </span>
          </div>
        </div>
      </div>
    ),
  },
]