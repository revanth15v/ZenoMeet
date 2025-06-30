// import { useTRPC } from "@/trpc/client";
// import { AgentGetOne } from "../../types";
// import React from 'react'
// import { useRouter } from "next/navigation";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import z from "zod";
// import { agentsInsertSchema } from "../../schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { GeneratedAvatar } from "@/components/generated-avatar";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";


// interface AgentFormProps {
// 	onSuccess?: () => void;
// 	onCancel?: () => void;
// 	initialValues?: AgentGetOne;
// }



// const AgentForm = ({
//     onSuccess,
//     onCancel,
//     initialValues
// }:AgentFormProps) => {

//     const trpc = useTRPC();
//     const router = useRouter()
//     const queryClient = useQueryClient()

//     const createAgent = useMutation(
//         trpc.agents.create.mutationOptions({
//             onSuccess: () => {
// 				queryClient.invalidateQueries(
// 					trpc.agents.getMany.queryOptions()
// 				)
// 				if(initialValues?.id){
// 					queryClient.invalidateQueries(
// 						trpc.agents.getOne.queryOptions({id:initialValues.id})
// 					)
// 				}
// 				onSuccess?.()
// 			},
//             onError: (error) => {
// 				toast.error(error.message)

// 				//TODO check if error code is FORBIDDEN, redirect to upgrade
// 			},
//         })
//     )

//     const form  = useForm<z.infer<typeof agentsInsertSchema>>({
//         resolver: zodResolver(agentsInsertSchema),
// 		defaultValues: {
// 			name: initialValues?.name ?? "",
// 			instructions: initialValues?.instructions ?? "",
// 		},
//     })

//     const isEdit = !!initialValues?.id;
// 	const isPending = createAgent.isPending 

//     const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
// 		if (isEdit) {
// 			// updateAgent.mutate({ ...values, id: initialValues.id });

// 		} else {
// 			createAgent.mutate(values);
// 		}
// 	};

    
//   return (
//    <Form {...form}>
// 			<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
// 				<GeneratedAvatar seed={form.watch("name")} variant="botttsNeutral" className="border size-16" />
// 				<FormField
// 					name="name"
// 					control={form.control}
// 					render={({ field }) => (
// 						<FormItem>
// 							<FormLabel>Name</FormLabel>
// 							<FormControl>
// 								<Input {...field} placeholder="e.g. Interview Coach" />
// 							</FormControl>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				<FormField
// 					name="instructions"
// 					control={form.control}
// 					render={({ field }) => (
// 						<FormItem>
// 							<FormLabel>Instructions</FormLabel>
// 							<FormControl>
// 								<Textarea
// 									{...field}
// 									placeholder="Describe yourself as someone who provides clear, step-by-step guidance to help others solve problems and complete assignments effectively.."
// 								/>
// 							</FormControl>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				<div className="flex justify-between gap-x-2">
// 					{onCancel && (
// 						<Button variant="outline" disabled={isPending} type="button" onClick={() => onCancel()}>
// 							Cancel
// 						</Button>
// 					)}
// 					<Button disabled={isPending} type="submit">
// 						{isEdit ? "Update" : "Create"}
// 					</Button>
// 				</div>
// 			</form>
// 		</Form>
//   )
// }

// export default AgentForm



import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import z from "zod";
import { agentsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save, Plus, AlertCircle, Sparkles, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
	initialValues?: AgentGetOne;
	className?: string;
}

// Enhanced schema with better validation
const enhancedAgentSchema = agentsInsertSchema.extend({
	name: z.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters")
		.regex(/^[a-zA-Z0-9\s\-_]+$/, "Name can only contain letters, numbers, spaces, hyphens, and underscores"),
	instructions: z.string()
		.min(10, "Instructions must be at least 10 characters")
		.max(2000, "Instructions must be less than 2000 characters")
});

const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues,
    className
}: AgentFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: () => {
				queryClient.invalidateQueries(
					trpc.agents.getMany.queryOptions({})
				);
				if(initialValues?.id){
					queryClient.invalidateQueries(
						trpc.agents.getOne.queryOptions({id: initialValues.id})
					);
				}
				toast.success("Agent created successfully!");
				setHasUnsavedChanges(false);
				onSuccess?.();
			},
            onError: (error: any) => {
				console.error('Agent creation error:', error);
				
				// Enhanced error handling
				if (error.message?.includes('FORBIDDEN') || error.message?.includes('upgrade')) {
					toast.error("Please upgrade your plan to create more agents", {
						action: {
							label: "Upgrade",
							onClick: () => router.push('/upgrade')
						}
					});
				} else if (error.message?.includes('DUPLICATE')) {
					toast.error("An agent with this name already exists");
				} else {
					toast.error(error.message || "Failed to create agent");
				}
			},
        })
    );


    const updateAgent = useMutation(
		trpc.agents.update.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

				if (initialValues?.id) {
					await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialValues.id }));
				}
				onSuccess?.();
			},
			onError: (error) => {
				toast.error(error.message);

				// TODO: Handle error
			},
		})
	);


    const form = useForm<z.infer<typeof enhancedAgentSchema>>({
        resolver: zodResolver(enhancedAgentSchema),
		defaultValues: {
			name: initialValues?.name ?? "",
			instructions: initialValues?.instructions ?? "",
		},
		mode: "onChange" // Enable real-time validation
    });

    const isEdit = !!initialValues?.id;
	const isPending = createAgent.isPending || updateAgent.isPending;
    const watchedValues = form.watch();
    const formErrors = form.formState.errors;
    const isValid = form.formState.isValid;
    const isDirty = form.formState.isDirty;

    // Track unsaved changes
    useEffect(() => {
        setHasUnsavedChanges(isDirty && !isPending);
    }, [isDirty, isPending]);

    // Warn before leaving with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    const onSubmit = (values: z.infer<typeof enhancedAgentSchema>) => {
		if (isEdit && initialValues?.id) {
			
			updateAgent.mutate({ ...values, id: initialValues.id });
		}else{
		createAgent.mutate(values);
        }
	};

    const handleCancel = () => {
        if (hasUnsavedChanges) {
            const confirmLeave = window.confirm(
                "You have unsaved changes. Are you sure you want to cancel?"
            );
            if (!confirmLeave) return;
        }
        onCancel?.();
    };

    const generateSampleInstructions = () => {
        const samples = [
           "You are a helpful assistant specialized in code reviews. Provide constructive feedback, suggest improvements, and highlight best practices.",
            "You are an expert interview coach. Help users prepare for job interviews by providing practice questions, feedback, and career advice.",
            "You are a creative writing mentor. Assist with storytelling, character development, plot structure, and writing techniques.",
            "You are a data analysis expert. Help users interpret data, create visualizations, and draw meaningful insights from datasets.",
            "You are a language learning tutor. Provide grammar explanations, vocabulary building exercises, and conversational practice.",
			"You are a productivity coach. Help users organize tasks, manage time, and stay motivated to achieve their goals.",
			"You are a startup advisor. Offer guidance on building a business model, pitching to investors, and scaling a startup.",
			"You are a fitness and wellness coach. Provide workout plans, nutrition advice, and mental well-being tips.",
			"You are a UX/UI design mentor. Give feedback on designs, suggest usability improvements, and share best practices for user experience.",
			"You are a cybersecurity specialist. Help users understand security risks, improve protection, and follow best practices.",
			"You are a resume and LinkedIn strategist. Assist users in creating strong resumes, optimizing LinkedIn profiles, and tailoring job applications.",
			"You are a legal assistant. Help users understand legal terms, draft basic documents, and guide them on legal procedures (non-binding advice).",
			"You are a public speaking coach. Help users improve their speaking confidence, structure presentations, and handle audience questions.",
			"You are a digital marketing expert. Assist with SEO, social media strategy, content creation, and campaign analysis.",
			"You are a customer service trainer. Guide users on effective communication, conflict resolution, and empathy in customer interactions.",
			"You are a research mentor. Help users refine research questions, conduct literature reviews, and structure academic papers.",
			"You are a financial literacy coach. Educate users about budgeting, saving, investing, and managing personal finance responsibly.",
			"You are an AI project consultant. Help users plan, build, and evaluate AI-based solutions using the latest tools and techniques.",
			"You are a mental health support companion. Offer gentle, supportive conversation and coping strategies (non-clinical guidance)."
        ];
        
        const randomSample = samples[Math.floor(Math.random() * samples.length)];
        form.setValue("instructions", randomSample, { shouldDirty: true, shouldValidate: true });
        toast.info("Sample instructions generated!");
    };

    const characterCount = form.watch("instructions")?.length || 0;
    const maxCharacters = 2000;
    const isNearLimit = characterCount > maxCharacters * 0.8;

    return (
        <Card className={cn("w-full max-w-2xl mx-auto", className)}>
            <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                    {isEdit ? (
                        <>
                            <Save className="h-5 w-5 text-blue-600" />
                            Edit Agent
                        </>
                    ) : (
                        <>
                            <Plus className="h-5 w-5 text-green-600" />
                            Create New Agent
                        </>
                    )}
                </CardTitle>
                {hasUnsavedChanges && (
                    <Badge variant="secondary" className="w-fit">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Unsaved changes
                    </Badge>
                )}
            </CardHeader>
            
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center space-y-2">
                            <GeneratedAvatar 
                                seed={form.watch("name") || "default"} 
                                variant="botttsNeutral" 
                                className="border size-20 shadow-sm transition-all duration-200 hover:shadow-md" 
                            />
                            <p className="text-sm text-muted-foreground">
                                Avatar updates automatically based on name
                            </p>
                        </div>

                        <Separator />

                        {/* Name Field */}
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Agent Name *
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="e.g. Interview Coach, Code Reviewer, Writing Assistant"
                                            className={cn(
                                                "transition-colors",
                                                formErrors.name && "border-red-500 focus:border-red-500"
                                            )}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Choose a descriptive name that reflects your agent's purpose
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Instructions Field */}
                        <FormField
                            name="instructions"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-base font-medium">
                                            Instructions *
                                        </FormLabel>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={generateSampleInstructions}
                                            className="h-7 px-2 text-xs"
                                            disabled={isPending}
                                        >
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            Generate Sample
                                        </Button>
                                    </div>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Describe your agent's role, expertise, and how it should interact with users. Be specific about the type of assistance it should provide..."
                                            className={cn(
                                                "min-h-[120px] resize-y transition-colors",
                                                formErrors.instructions && "border-red-500 focus:border-red-500"
                                            )}
                                            maxLength={maxCharacters}
                                        />
                                    </FormControl>
                                    <div className="flex items-center justify-between">
                                        <FormDescription>
                                            Clear instructions help your agent provide better responses
                                        </FormDescription>
                                        <div className={cn(
                                            "text-xs",
                                            isNearLimit ? "text-orange-600" : "text-muted-foreground"
                                        )}>
                                            {characterCount}/{maxCharacters}
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Form Actions */}
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4">
                            {onCancel && (
                                <Button 
                                    variant="outline" 
                                    disabled={isPending} 
                                    type="button" 
                                    onClick={handleCancel}
                                    className="sm:w-auto w-full"
                                >
                                    Cancel
                                </Button>
                            )}
                            <Button 
                                disabled={isPending || !isValid} 
                                type="submit"
                                className="sm:w-auto w-full sm:min-w-[120px]"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        {isEdit ? "Update not available" : "Creating..."}
                                    </>
                                ) : (
                                    <>
                                        {isEdit ? (
                                            <>
                                                <Save className="h-4 w-4 mr-2" />
                                                Update Agent
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Create Agent
                                            </>
                                        )}
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Form Status */}
                        {isDirty && !isPending && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                                <AlertCircle className="h-4 w-4" />
                                {isValid ? "Ready to save changes" : "Please fix the errors above"}
                            </div>
                        )}
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default AgentForm;