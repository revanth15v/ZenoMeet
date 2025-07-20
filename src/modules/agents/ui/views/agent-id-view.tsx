


"use client";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { VideoIcon, Edit3Icon, Trash2Icon, ArrowLeftIcon, CalendarIcon, BrainIcon, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ErrorState } from "@/components/error-state";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { LoadingState } from "@/components/loading-state";
import { Badge } from "@/components/ui/badge";

import { useTRPC } from "@/trpc/client";

import { AgentIdViewHeader } from "../components/agent-id-view-header";
import { UpdateAgentDialog } from "../components/update-agent-dialog";
import { useConfirm } from "@/hooks/use-confirm";

interface Props {
	agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
	const trpc = useTRPC();
	const router = useRouter();
	const queryClient = useQueryClient();

	const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

	const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

	const removeAgent = useMutation(
		trpc.agents.remove.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
				 await queryClient.invalidateQueries(
					trpc.premium.getFreeUsage.queryOptions()
				);
				router.push("/dashboard/agents");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		})
	);

	const [RemoveConfirmation, confirmRemove] = useConfirm(
		"Are you sure?",
		`The following action will remove ${data.meetingCount} associated meetings. This action cannot be undone.`
	);

	const handleRemoveAgent = async () => {
		const ok = await confirmRemove();
		if (!ok) return;
		await removeAgent.mutateAsync({ id: agentId });
	};

	const handleBackToAgents = () => {
		router.push("/dashboard/agents");
	};

	return (
		<>
			<RemoveConfirmation />
			<UpdateAgentDialog
				open={updateAgentDialogOpen}
				onOpenChange={setUpdateAgentDialogOpen}
				initialValues={data}
			/>
			
			{/* Enhanced Layout with Background Gradient */}
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
				<div className="flex-1 py-6 px-4 md:px-8 max-w-6xl mx-auto">
					
					{/* Back Navigation */}
					<div className="mb-8">
						<button
							onClick={handleBackToAgents}
							className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/80 rounded-lg border border-transparent hover:border-slate-200 transition-all duration-200 hover:shadow-sm"
						>
							<ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
							Back to Agents
						</button>
					</div>

					{/* Main Content Card */}
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl overflow-hidden">
						
						{/* Header Section */}
						<div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-8">
							{/* Decorative Background Pattern */}
							<div className="absolute inset-0 opacity-20">
								<div 
									className="absolute inset-0" 
									style={{
										backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
									}}
								></div>
							</div>
							
							<div className="relative flex items-start justify-between flex-col sm:flex-row gap-6">
								<div className="flex items-center gap-6">
									{/* Enhanced Avatar */}
									<div className="relative">
										<div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl"></div>
										<GeneratedAvatar 
											variant="botttsNeutral" 
											seed={data.name} 
											className="relative w-20 h-20 rounded-2xl border-4 border-white/30 shadow-2xl" 
										/>
									</div>
									
									<div className="space-y-3">
										<h1 className="text-4xl font-bold text-white drop-shadow-sm">
											{data.name}
										</h1>
										<div className="flex items-center gap-3 flex-wrap">
											<Badge className="bg-white/90 text-blue-800 hover:bg-white transition-colors duration-200 px-4 py-2 rounded-full font-medium shadow-sm border-0">
												<VideoIcon className="w-4 h-4 mr-2" />
												{data.meetingCount} {data.meetingCount === 1 ? "Meeting" : "Meetings"}
											</Badge>
											<Badge className="bg-white/10 text-white border-white/30 hover:bg-white/20 transition-colors duration-200 px-4 py-2 rounded-full">
												<BrainIcon className="w-4 h-4 mr-2" />
												AI Agent
											</Badge>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex gap-3 w-full sm:w-auto">
									<button
										onClick={() => setUpdateAgentDialogOpen(true)}
										className="flex-1 sm:flex-none bg-white/90 cursor-pointer hover:bg-white text-blue-700 hover:text-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2.5 rounded-xl font-medium group flex items-center justify-center gap-2"
									>
										<Edit3Icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
										Edit Agent
									</button>
									<button
										onClick={handleRemoveAgent}
										disabled={removeAgent.isPending}
										className="flex-1 sm:flex-none bg-red-500/90 hover:bg-red-600 cursor-pointer text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2.5 rounded-xl font-medium group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<Trash2Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
										{removeAgent.isPending ? "Removing..." : "Remove Agent"}
									</button>
								</div>
							</div>
						</div>

						{/* Content Section */}
						<div className="p-8 space-y-8">
							
							{/* Stats Cards */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200/50 hover:shadow-lg transition-all duration-200 group">
									<div className="flex items-center gap-3 mb-2">
										<div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
											<VideoIcon className="w-5 h-5 text-white" />
										</div>
										<h3 className="font-semibold text-blue-900">Total Meetings</h3>
									</div>
									<p className="text-3xl font-bold text-blue-700">{data.meetingCount}</p>
								</div>
								
								<div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 border border-green-200/50 hover:shadow-lg transition-all duration-200 group">
									<div className="flex items-center gap-3 mb-2">
										<div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
											<CalendarIcon className="w-5 h-5 text-white" />
										</div>
										<h3 className="font-semibold text-green-900">Status</h3>
									</div>
									<p className="text-lg font-semibold text-green-700">Active</p>
								</div>
								
								<div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-6 border border-purple-200/50 hover:shadow-lg transition-all duration-200 group">
									<div className="flex items-center gap-3 mb-2">
										<div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
											<SparklesIcon className="w-5 h-5 text-white" />
										</div>
										<h3 className="font-semibold text-purple-900">Agent Type</h3>
									</div>
									<p className="text-lg font-semibold text-purple-700">Smart AI</p>
								</div>
							</div>

							{/* Instructions Section */}
							<div className="space-y-6">
								<div className="flex items-center gap-3">
									<div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
									<h2 className="text-2xl font-bold text-slate-800">Agent Instructions</h2>
								</div>
								
								<div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-8 border border-slate-200/60 shadow-sm">
									<div className="prose prose-slate max-w-none">
										<p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
											{data.instructions}
										</p>
									</div>
								</div>
							</div>

							{/* Additional Actions Section */}
							<div className="pt-6 border-t border-slate-200/60">
								<div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
									<div className="space-y-1">
										<h3 className="font-semibold text-slate-800">Need to make changes?</h3>
										<p className="text-slate-600 text-sm">
											Update agent instructions or remove this agent from your dashboard.
										</p>
									</div>
									<div className="flex gap-3">
										<button
											onClick={() => setUpdateAgentDialogOpen(true)}
											className="flex cursor-pointer items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
										>
											<Edit3Icon className="w-4 h-4" />
											Edit Instructions
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export const AgentIDViewLoading = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
			<LoadingState title="Loading Agent" description="Please wait this may take a few seconds..." />
		</div>
	);
};

export const AgentIDViewError = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
			<ErrorState title="Error Loading Agent" description="Something went wrong, please try again later." />
		</div>
	);
};