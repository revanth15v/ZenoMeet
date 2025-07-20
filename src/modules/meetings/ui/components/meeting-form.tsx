
import { useTRPC } from "@/trpc/client";
import { MeetingGetOne } from "../../types";
import React from 'react'
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import z from "zod";
import { meetingsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon, PlusIcon, AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface meetingFormProps {
	onSuccess?: (id?: string) => void;
	onCancel?: () => void;
	initialValues?: MeetingGetOne;
}

const MeetingForm = ({
    onSuccess,
    onCancel,
    initialValues
}: meetingFormProps) => {

    const trpc = useTRPC();
    const router = useRouter()
    const queryClient = useQueryClient()

    const [agentSearch, setAgentSearch] = React.useState("");
    const [openNewAgentDialog, setOpenNewAgentDialog] = React.useState(false);
    const [newlyCreatedAgentId, setNewlyCreatedAgentId] = React.useState<string | null>(null);

    // Debounce agent search to reduce API calls
    const [debouncedAgentSearch, setDebouncedAgentSearch] = React.useState("");
    
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedAgentSearch(agentSearch);
        }, 300);
        return () => clearTimeout(timer);
    }, [agentSearch]);

    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: debouncedAgentSearch,
        })
    )

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => {
				await queryClient.invalidateQueries(
					trpc.meetings.getMany.queryOptions({})
				)
                 await queryClient.invalidateQueries(
					trpc.premium.getFreeUsage.queryOptions()
				);

				if(initialValues?.id){
					await queryClient.invalidateQueries(
						trpc.meetings.getOne.queryOptions({id:initialValues.id})
					)
				}
                toast.success("Meeting created successfully!");
				onSuccess?.(data.id)
			},
            onError: (error) => {
				toast.error(error.message || "Failed to create meeting")
                if(error.data?.code === "FORBIDDEN"){
                    router.push("/dashboard/upgrade")
                }
			},
        })
    )

    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

                if (initialValues?.id) {
                    await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: initialValues.id }));
                }
                toast.success("Meeting updated successfully!");
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message || "Failed to update meeting");
            },
        })
    );

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
		defaultValues: {
			name: initialValues?.name ?? "",
			agentId: initialValues?.agentId ?? "",
		},
    })

    const isEdit = !!initialValues?.id;
	const isPending = createMeeting.isPending || updateMeeting.isPending;
    const hasAgents = agents.data && (Array.isArray(agents.data) ? agents.data.length > 0 : (agents.data?.item?.length ?? 0) > 0);

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
		if (isEdit) {
			updateMeeting.mutate({ ...values, id: initialValues.id });
		} else {
			createMeeting.mutate(values);
		}
	};

    // Handle new agent creation success
    const handleNewAgentSuccess = (agentId: string) => {
        setNewlyCreatedAgentId(agentId);
        form.setValue("agentId", agentId);
        setOpenNewAgentDialog(false);
        // Refresh agents list
        agents.refetch();
        toast.success("Agent created and selected!");
    };

    // Get agent options with proper typing
    const agentOptions = React.useMemo(() => {
        const agentData = Array.isArray(agents.data) ? agents.data : agents.data?.item ?? [];
        return agentData.map((agent) => ({
            id: agent.id,
            value: agent.id,
            children: (
                <div className="flex items-center gap-x-2">
                    <GeneratedAvatar
                        seed={agent.name}
                        variant="botttsNeutral"
                        className="border size-6"
                    />
                    <span className="text-sm font-medium">
                        {agent.name}
                    </span>
                </div>
            ),
        }));
    }, [agents.data]);

    return (
        <>
            <NewAgentDialog 
                open={openNewAgentDialog} 
                onOpenChange={setOpenNewAgentDialog}
            />
            
            <div className="space-y-6">
                {/* Show error if agents failed to load */}
                {agents.error && (
                    <Alert variant="destructive">
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertDescription>
                            Failed to load agents. Please try refreshing the page.
                        </AlertDescription>
                    </Alert>
                )}

                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Meeting Name <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="e.g. Math Consultations"
                                            disabled={isPending}
                                            className="transition-colors"
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs text-muted-foreground">
                                        Choose a descriptive name for your meeting
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="agentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Agent <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <CommandSelect
                                            options={agentOptions}
                                            onSelect={field.onChange}
                                            onSearch={setAgentSearch}
                                            value={field.value}
                                            placeholder={
                                                agents.isLoading 
                                                    ? "Loading agents..." 
                                                    : hasAgents 
                                                        ? "Select an agent" 
                                                        : "No agents available"
                                            }
                                            disabled={isPending}
                                            isLoading={agents.isLoading}
                                            error={agents.error?.message}
                                            emptyMessage={
                                                debouncedAgentSearch 
                                                    ? `No agents found matching "${debouncedAgentSearch}"` 
                                                    : "No agents available"
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs text-muted-foreground space-y-1">
                                        <div>Select the agent that will handle this meeting</div>
                                        <div>
                                            Not found what you're looking for?{" "}
                                            <button
                                                type="button"
                                                className="text-primary hover:underline font-medium inline-flex items-center gap-1 transition-colors"
                                                onClick={() => setOpenNewAgentDialog(true)}
                                                disabled={isPending}
                                            >
                                                <PlusIcon className="h-3 w-3" />
                                                Create a new agent
                                            </button>
                                        </div>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4 border-t">
                            {onCancel && (
                                <Button 
                                    variant="outline" 
                                    disabled={isPending} 
                                    type="button" 
                                    onClick={onCancel}
                                    className="sm:w-auto w-full"
                                >
                                    Cancel
                                </Button>
                            )}
                            <Button 
                                disabled={isPending || !form.formState.isValid} 
                                type="submit"
                                className="sm:w-auto w-full min-w-[120px]"
                            >
                                {isPending && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
                                {isEdit ? "Update Meeting" : "Create Meeting"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default MeetingForm;
