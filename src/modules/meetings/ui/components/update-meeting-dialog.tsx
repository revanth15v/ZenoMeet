import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useRouter } from "next/navigation";
import { MeetingGetOne } from "../../types";
import MeetingForm from "./meeting-form";

interface UpdateMeetingDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialValues: MeetingGetOne
}

export const UpdateMeetingDialog = ({ open, onOpenChange,initialValues }: UpdateMeetingDialogProps) => {

	const router = useRouter();

	return (
		<ResponsiveDialog 
        title="Edit Meeting" 
        description="Edit the meeting details. You can change the name, description, and other settings of the meeting." 
        open={open} 
        onOpenChange={onOpenChange}>
		<MeetingForm
		onSuccess={() => {
			onOpenChange(false);
		}}
		onCancel={() => onOpenChange(false)}
		initialValues={initialValues}
		/>
        
		</ResponsiveDialog>
	);
};