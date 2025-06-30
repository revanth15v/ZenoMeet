'use client'


import {ErrorState} from "@/components/error-state";
import {LoadingState} from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agentsfilters";
import { agents } from "@/db/schema";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";



export const AgentsView = () => {

    const [filters, setFilters] = useAgentsFilters();

    const router = useRouter()

   const trpc = useTRPC();
	const { data } = useSuspenseQuery(
		trpc.agents.getMany.queryOptions({
            ...filters,
        })
	);
    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
           <DataTable 
           data={Array.isArray(data) ? data : data.item} 
           columns={columns}
           onRowClick={(row) => {
                router.push(`/dashboard/agents/${row.id}`)
            }}
           />
          <DataPagination
				page={filters.page}
				totalPages={data.totalPages}
				onPageChange={(page) => setFilters({ page })}
			/>
           {(Array.isArray(data) ? data.length === 0 : data.item.length === 0) && (
            <EmptyState
            title="Create your first agent"
            description="Create an agent to join your meetings. Each agent will your your instructions and can interact with participants during the call"
            />
           )}
        </div>
    )
}

export const AgentViewLoading = () => {
    return(
        <LoadingState
        title="Loading Agents"
        description="This may take a few seconds"
        />
    )
}

export const AgentsViewError = () => {
    return (
        <ErrorState
        title="Error Loding Agents"
        description="Something went wrong"
        />
      )
}
