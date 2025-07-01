// "use client";

// import { format } from "date-fns";
// import humanizeDuration from "humanize-duration";
// import type { ColumnDef } from "@tanstack/react-table";
// import {
//   CircleCheckIcon,
//   CircleXIcon,
//   ClockArrowUpIcon,
//   ClockFadingIcon,
//   CornerDownRightIcon,
//   LoaderIcon,
// } from "lucide-react";

// import { cn } from "@/lib/utils";
// import type { MeetingGetMany } from "../../types";
// import { Badge } from "@/components/ui/badge";
// import { GeneratedAvatar } from "@/components/generated-avatar";

// function formatDuration(seconds: number) {
//   return humanizeDuration(seconds * 1000, {
//     largest: 1,
//     units: ["h", "m", "s"],
//     round: true,
//   });
// }

// const statusIconMap = {
//   upcoming: ClockArrowUpIcon,
//   active: LoaderIcon,
//   completed: CircleCheckIcon,
//   processing: LoaderIcon,
//   cancelled: CircleXIcon,
// };
// const statusColorMap = {
//   upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
//   active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
//   completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
//   processing: "bg-gray-300/20 text-gray-800 border-gray-800/5",
//   cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
// };

// export const columns: ColumnDef<MeetingGetMany[number]>[] = [
//   {
//     accessorKey: "name",
//     header: "Meeting Name",
//     cell: ({ row }) => (
//       <div className="flex flex-col gap-y-1">
//         <span className="font-semibold capitalize">{row.original.name}</span>
//         <div className="flex items-center gap-x-1">
//           <div className="flex items-center gap-x-1">
//             <CornerDownRightIcon className="size-3 text-muted-foreground" />
//             <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
//               {row.original.agent.name}
//             </span>
//           </div>
//           <GeneratedAvatar
//             variant="botttsNeutral"
//             seed={row.original.agent.name}
//             className="size-4"
//           />
//           <span className="text-sm text-muted-foreground">
//             {row.original.startedAt
//               ? format(row.original.startedAt, "MMM d")
//               : ""}
//           </span>
//         </div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const Icon =
//         statusIconMap[row.original.status as keyof typeof statusIconMap];

//       return (
//         <Badge
//           variant="outline"
//           className={cn(
//             "capitalize [&>svg]:size-4 text-muted-foreground",
//             statusColorMap[row.original.status as keyof typeof statusColorMap]
//           )}>
//           <Icon
//             className={cn(
//               row.original.status === "processing" && "animate-spin"
//             )}
//           />
//           {row.original.status}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: "duration",
//     header: "Duration",
//     cell: ({ row }) => (
//       <Badge
//         variant="outline"
//         className="capitalize [&>svg]:size-4 flex items-center gap-x-2]">
//         <ClockFadingIcon className="text-blue-700" />
//         {row.original.duration
//           ? formatDuration(row.original.duration)
//           : "No Duration"}
//       </Badge>
//     ),
//   },
// ];




"use client";

import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
  CalendarIcon,
  UsersIcon,
  PlayIcon,
  PauseIcon,
  CheckCircle2Icon,
  XCircleIcon,
  Clock3Icon,
  SparklesIcon,
  TrendingUpIcon,
  Zap,
  Activity,
  Award,
  Star,
  Flame,
  Target,
  Brain,
  Rocket,
  Crown,
  Globe,
  Shield,
  Diamond,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { MeetingGetMany } from "../../types";
import { Badge } from "@/components/ui/badge";
import { GeneratedAvatar } from "@/components/generated-avatar";

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 2,
    units: ["h", "m", "s"],
    round: true,
    spacer: " ",
    delimiter: " ",
  });
}

function formatRelativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Revolutionary status configuration with premium themes
const statusConfig = {
  upcoming: {
    icon: Rocket,
    label: "Scheduled",
    theme: "cosmic",
    colors: "bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-fuchsia-500/10 text-violet-800 border-violet-300/30 shadow-2xl shadow-violet-500/20 backdrop-blur-sm",
    iconColors: "text-violet-600 drop-shadow-sm",
    glow: "shadow-violet-400/30",
    particle: "bg-violet-400",
  },
  active: {
    icon: Zap,
    label: "Live Now",
    theme: "neon",
    colors: "bg-gradient-to-br from-emerald-400/15 via-green-400/10 to-teal-400/15 text-emerald-800 border-emerald-400/40 shadow-2xl shadow-emerald-500/25 backdrop-blur-sm",
    iconColors: "text-emerald-600 drop-shadow-lg",
    glow: "shadow-emerald-400/40",
    particle: "bg-emerald-400",
  },
  completed: {
    icon: Crown,
    label: "Completed",
    theme: "golden",
    colors: "bg-gradient-to-br from-amber-400/15 via-yellow-400/10 to-orange-400/15 text-amber-800 border-amber-400/40 shadow-2xl shadow-amber-500/25 backdrop-blur-sm",
    iconColors: "text-amber-600 drop-shadow-lg",
    glow: "shadow-amber-400/40",
    particle: "bg-amber-400",
  },
  processing: {
    icon: Brain,
    label: "Processing",
    theme: "cyber",
    colors: "bg-gradient-to-br from-cyan-400/15 via-blue-400/10 to-indigo-400/15 text-cyan-800 border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-sm",
    iconColors: "text-cyan-600 drop-shadow-lg",
    glow: "shadow-cyan-400/40",
    particle: "bg-cyan-400",
  },
  cancelled: {
    icon: Shield,
    label: "Cancelled",
    theme: "crimson",
    colors: "bg-gradient-to-br from-red-400/15 via-rose-400/10 to-pink-400/15 text-red-800 border-red-400/40 shadow-2xl shadow-red-500/25 backdrop-blur-sm",
    iconColors: "text-red-600 drop-shadow-lg",
    glow: "shadow-red-400/40",
    particle: "bg-red-400",
  },
};

// Premium engagement tiers
const getEngagementTier = (duration: number) => {
  if (duration > 7200) return { tier: "legendary", icon: Diamond, color: "from-purple-600 to-pink-600", label: "Legendary", glow: "shadow-purple-500/50" };
  if (duration > 3600) return { tier: "epic", icon: Crown, color: "from-yellow-500 to-orange-500", label: "Epic Session", glow: "shadow-yellow-500/50" };
  if (duration > 1800) return { tier: "premium", icon: Star, color: "from-blue-500 to-cyan-500", label: "Premium", glow: "shadow-blue-500/50" };
  if (duration > 900) return { tier: "quality", icon: Award, color: "from-green-500 to-emerald-500", label: "Quality", glow: "shadow-green-500/50" };
  return { tier: "standard", icon: Target, color: "from-gray-500 to-slate-500", label: "Standard", glow: "shadow-gray-500/50" };
};

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-2 font-bold text-gray-800">
        <Globe className="size-4 text-indigo-600" />
        Meeting Intelligence
      </div>
    ),
    cell: ({ row }) => {
      const config = statusConfig[row.original.status as keyof typeof statusConfig];
      
      return (
        <div className="group relative">
          {/* Animated background glow */}
          <div className={cn(
            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl",
            config.glow
          )} />
          
          <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:bg-white/90">
            <div className="flex items-start gap-4">
              {/* Revolutionary Avatar with Status Ring */}
              <div className="relative flex-shrink-0">
                <div className={cn(
                  "absolute -inset-1 rounded-full transition-all duration-700",
                  row.original.status === "active" ? "bg-gradient-to-r from-emerald-400 to-teal-400 animate-pulse" : "bg-gradient-to-r from-gray-300 to-slate-300"
                )}>
                  <div className="absolute inset-0 rounded-full animate-spin-slow bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                
                {/* <GeneratedAvatar
                  variant="botttsNeutral"
                  seed={row.original.name}
                  className="relative size-12 border-3 border-white shadow-xl rounded-full ring-2 ring-white/50"
                /> */}

                 <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.agent.name}
             className="relative size-12 border-3 border-white shadow-xl rounded-full ring-2 ring-white/50"
           />
                
                {/* Live pulse indicator */}
                {row.original.status === "active" && (
                  <div className="absolute -top-1 -right-1 size-5">
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
                    <div className="relative size-full bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="size-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                )}
                
                {/* Status particles */}
                <div className="absolute -inset-2 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "absolute size-1 rounded-full animate-float opacity-60",
                        config.particle
                      )}
                      style={{
                        left: `${20 + i * 25}%`,
                        top: `${10 + i * 20}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + i}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-gray-900 capitalize leading-tight truncate group-hover:text-indigo-800 transition-colors">
                    {row.original.name}
                  </h3>
                  <div className="flex-shrink-0">
                    <Flame className="size-4 text-orange-500 animate-pulse" />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200/50">
                    <Brain className="size-3.5 text-indigo-600" />
                    <span className="font-semibold text-indigo-800 capitalize truncate max-w-[120px]">
                      {row.original.agent.name}
                    </span>
                  </div>
                  
                  {row.original.startedAt && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-slate-50 to-gray-50 rounded-full border border-slate-200/50">
                      <CalendarIcon className="size-3.5 text-slate-600" />
                      <span className="font-medium text-slate-700">
                        {format(row.original.startedAt, "MMM d")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center gap-2 font-bold text-gray-800">
        <Activity className="size-4 text-emerald-600" />
        Live Status
      </div>
    ),
    cell: ({ row }) => {
      const config = statusConfig[row.original.status as keyof typeof statusConfig];
      const Icon = config.icon;

      return (
        <div className="space-y-3">
          {/* Revolutionary Status Badge */}
          <div className="relative group">
            <div className={cn(
              "absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-75 transition-all duration-500",
              config.glow
            )} />
            
            <Badge
              variant="outline"
              className={cn(
                "relative font-bold px-4 py-2.5 text-sm border-2 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1",
                config.colors
              )}>
              <Icon
                className={cn(
                  "size-5 mr-3",
                  config.iconColors,
                  row.original.status === "processing" && "animate-spin",
                  row.original.status === "active" && "animate-bounce"
                )}
              />
              <span className="font-bold tracking-wide">{config.label}</span>
              
              {/* Premium sparkle effect */}
              <div className="absolute -top-1 -right-1 size-3">
                <SparklesIcon className="size-3 text-yellow-400 animate-pulse" />
              </div>
            </Badge>
          </div>
          
          {/* Time ago with premium styling */}
          {row.original.startedAt && row.original.status !== "upcoming" && (
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-gray-900/5 to-slate-900/5 rounded-full backdrop-blur border border-gray-200/50">
              <Clock3Icon className="size-3 text-gray-600" />
              <span className="text-xs font-bold text-gray-700 tracking-wide">
                {formatRelativeTime(new Date(row.original.startedAt))}
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: () => (
      <div className="flex items-center gap-2 font-bold text-gray-800">
        <Clock3Icon className="size-4 text-blue-600" />
        Duration Power
      </div>
    ),
    cell: ({ row }) => {
      const duration = row.original.duration;
      const engagement = duration ? getEngagementTier(duration) : null;
      
      return (
        <div className="space-y-3">
          {/* Premium Duration Display */}
          <div className="relative group">
            <div className={cn(
              "absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-75 transition-all duration-500",
              engagement ? engagement.glow : "shadow-gray-500/50"
            )} />
            
            <Badge
              variant="outline"
              className={cn(
                "relative font-bold px-4 py-2.5 text-sm border-2 transition-all duration-500 group-hover:scale-110",
                duration 
                  ? `bg-gradient-to-br ${engagement?.color} text-white border-white/30 shadow-2xl backdrop-blur-sm`
                  : "bg-gradient-to-br from-gray-400 to-slate-500 text-white border-white/30 shadow-xl"
              )}>
              <Clock3Icon className="size-5 mr-3 drop-shadow-lg" />
              <span className="font-bold tracking-wide">
                {duration ? formatDuration(duration) : "Pending"}
              </span>
              
              {engagement && (
                <div className="absolute -top-1 -right-1 size-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                  <engagement.icon className="size-2.5 text-white" />
                </div>
              )}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "engagement",
    header: () => (
      <div className="flex items-center gap-2 font-bold text-gray-800">
        <Star className="size-4 text-yellow-600" />
        Engagement Level
      </div>
    ),
    cell: ({ row }) => {
      const duration = row.original.duration || 0;
      const engagement = getEngagementTier(duration);
      const EngagementIcon = engagement.icon;
      
      return (
        <div className="space-y-3">
          {/* Revolutionary Engagement Badge */}
          <div className="relative group">
            <div className={cn(
              "absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-75 transition-all duration-500",
              engagement.glow
            )} />
            
            <Badge
              variant="outline"
              className={cn(
                "relative font-bold px-4 py-2.5 text-sm border-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1",
                `bg-gradient-to-br ${engagement.color} text-white border-white/30 shadow-2xl backdrop-blur-sm`
              )}>
              <EngagementIcon className="size-5 mr-3 drop-shadow-lg animate-pulse" />
              <span className="font-bold tracking-wide">{engagement.label}</span>
              
              {/* Premium tier indicator */}
              <div className="absolute -top-2 -right-2 flex space-x-0.5">
                {[...Array(engagement.tier === "legendary" ? 5 : engagement.tier === "epic" ? 4 : engagement.tier === "premium" ? 3 : engagement.tier === "quality" ? 2 : 1)].map((_, i) => (
                  <Star key={i} className="size-2 text-yellow-300 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </Badge>
          </div>
          
          {/* Achievement unlock message */}
          {row.original.status === "completed" && duration > 1800 && (
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full border border-yellow-400/30 backdrop-blur">
              <Award className="size-3 text-yellow-600" />
              <span className="text-xs font-bold text-yellow-800 tracking-wide">
                Achievement Unlocked!
              </span>
            </div>
          )}
        </div>
      );
    },
  },
];

// Revolutionary CSS animations and effects
export const premiumTableStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(180deg); }
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-spin-slow {
    animation: spin-slow 10s linear infinite;
  }
  
  .animate-glow {
    animation: glow-pulse 2s ease-in-out infinite;
  }
  
  .meeting-table {
    @apply bg-gradient-to-br from-slate-50 via-white to-gray-50 rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden backdrop-blur-sm;
    background-image: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.05) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.05) 0%, transparent 50%),
                      radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.05) 0%, transparent 50%);
  }
  
  .meeting-table th {
    @apply bg-gradient-to-r from-gray-900/5 to-slate-900/5 text-gray-800 font-bold text-sm py-6 px-8 border-b border-gray-200/50 backdrop-blur-sm;
  }
  
  .meeting-table td {
    @apply py-6 px-8 border-b border-gray-100/50 last:border-b-0;
  }
  
  .meeting-table tr:hover {
    @apply bg-gradient-to-r from-blue-50/30 via-indigo-50/20 to-purple-50/30 transition-all duration-700;
    backdrop-filter: blur(8px);
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;