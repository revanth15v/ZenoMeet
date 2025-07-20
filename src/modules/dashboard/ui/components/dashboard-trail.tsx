import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query";
import { RocketIcon, Sparkles, Crown, Zap } from "lucide-react";
import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from "@/modules/premium/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const DashboardTrail = () => {
    const trpc = useTRPC();
    const {data} = useQuery(trpc.premium.getFreeUsage.queryOptions());

    if(!data){
        return null;
    }

    const agentProgress = (data.agentCount / MAX_FREE_AGENTS) * 100;
    const meetingProgress = (data.meetingCount / MAX_FREE_MEETINGS) * 100;
    const isAgentLimitReached = data.agentCount >= MAX_FREE_AGENTS;
    const isMeetingLimitReached = data.meetingCount >= MAX_FREE_MEETINGS;

    return (
        <div className="relative overflow-hidden rounded-xl bg-white/95 backdrop-blur-xl border border-slate-400/70 shadow-lg">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-400/30 rounded-full animate-float-1" />
                <div className="absolute bottom-3 left-2 w-2 h-2 bg-blue-400/30 rounded-full animate-float-2" />
                <div className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-amber-400/40 rounded-full animate-float-3" />
            </div>
            
            <div className="relative p-3 space-y-3">
                {/* Compact header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg blur opacity-40 group-hover:opacity-60 transition-all duration-300" />
                            <div className="relative bg-gradient-to-r from-emerald-500 to-blue-500 p-1.5 rounded-lg shadow-sm">
                                <RocketIcon className="size-3.5 text-white"/>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-bold bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent">Free Trial</p>
                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                <Sparkles className="size-2.5 text-amber-500 animate-pulse" />
                                Starter
                            </p>
                        </div>
                    </div>
                </div>

                {/* Compact progress sections */}
                <div className="space-y-2.5">
                    {/* Agents Progress - Compact */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                <Zap className="size-2.5 text-emerald-500" />
                                Agents
                            </p>
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full text-xs ${
                                isAgentLimitReached 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'bg-emerald-100 text-emerald-600'
                            }`}>
                                {data.agentCount}/{MAX_FREE_AGENTS}
                            </span>
                        </div>
                        <div className="relative group">
                            <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                                        isAgentLimitReached 
                                            ? 'bg-gradient-to-r from-red-400 to-red-500' 
                                            : 'bg-gradient-to-r from-emerald-500 to-blue-500'
                                    }`}
                                    style={{ width: `${agentProgress}%` }}
                                >
                                    {/* Animated shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meetings Progress - Compact */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                <Crown className="size-2.5 text-blue-500" />
                                Meetings
                            </p>
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                                isMeetingLimitReached 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'bg-blue-100 text-blue-600'
                            }`}>
                                {data.meetingCount}/{MAX_FREE_MEETINGS}
                            </span>
                        </div>
                        <div className="relative group">
                            <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                                        isMeetingLimitReached 
                                            ? 'bg-gradient-to-r from-red-400 to-red-500' 
                                            : 'bg-gradient-to-r from-blue-500 to-emerald-500'
                                    }`}
                                    style={{ width: `${meetingProgress}%` }}
                                >
                                    {/* Animated shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compact warning for high usage */}
                {(agentProgress > 80 || meetingProgress > 80) && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-lg p-2 animate-glow">
                        <p className="text-xs text-amber-700 font-medium text-center flex items-center justify-center gap-1">
                            <Sparkles className="size-2.5 animate-spin" />
                            {agentProgress > 90 || meetingProgress > 90 ? 'Almost at limit!' : 'Upgrade soon'}
                        </p>
                    </div>
                )}
            </div>

            {/* Compact upgrade button */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-700" />
                <Button
                    className="relative w-full bg-transparent hover:bg-white/10 text-white font-medium rounded-t-none border-0 py-2 transition-all duration-300 hover:shadow-lg group text-sm"
                    asChild
                >
                    <Link href="/dashboard/upgrade" className="flex items-center justify-center gap-2">
                        <Crown className="size-3.5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                        Upgrade Pro
                        
                        {/* Floating sparkles animation */}
                        <div className="absolute right-2 flex space-x-0.5">
                            <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                            <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                            <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                        </div>
                        
                        {/* Ripple effect on hover */}
                        <div className="absolute inset-0 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-0 bg-white/10 rounded-b-xl animate-ping" />
                        </div>
                    </Link>
                </Button>
            </div>

            <style jsx>{`
                @keyframes float-1 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(180deg); }
                }
                @keyframes float-2 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-6px) rotate(-180deg); }
                }
                @keyframes float-3 {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-4px) scale(1.2); }
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.3); }
                    50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.6); }
                }
                .animate-float-1 {
                    animation: float-1 3s ease-in-out infinite;
                }
                .animate-float-2 {
                    animation: float-2 4s ease-in-out infinite;
                }
                .animate-float-3 {
                    animation: float-3 2.5s ease-in-out infinite;
                }
                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}