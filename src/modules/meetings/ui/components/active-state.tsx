import Link from "next/link";
import { VideoIcon,} from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";

type ActiveStateProps = {
  meetingId: string;
};

export const ActiveState = ({
  meetingId,
}: ActiveStateProps) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting is Active"
        description="Meeting is currently active. You can join the meeting or cancel it if needed."
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button asChild className="w-full lg:w-auto" >
          <Link href={`/dashboard/call/${meetingId}`}>
            <VideoIcon className="size-4" />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};