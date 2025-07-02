'use client'

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useConfirm } from "@/hooks/use-confirm";

interface Props {
    meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {

    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const router = useRouter()

    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

     const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure you want to remove this meeting?",
    "The following action will remove this meeting"
  );
  
    const {data} = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }),
    )
    
    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/dashboard/meetings");
            },
            
            onError: (error) => {
                toast.error(error.message);
            }
        }),
    )

    const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId, name: data.name, agentId: data.agentId });
    toast.success("Meeting removed successfully");
  };

    return (
        <>
        <RemoveConfirmation/>
        <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
        />
        <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <MeetingIdViewHeader
                meetingId={meetingId}
                meetingName={data.name}
                onEdit={() => setUpdateMeetingDialogOpen(true)}
                onRemove={handleRemoveMeeting}
                />
           {JSON.stringify(data, null, 2)}
        </div>
        </>
    )
};


export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="Please wait while we load the Meeting"
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error loading Meeting"
      description="Please try again later"
    />
  );
};