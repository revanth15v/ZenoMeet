// import { GeneratedAvatar } from "@/components/generated-avatar"
// import { Avatar, AvatarImage } from "@/components/ui/avatar"
// import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
// import { authClient } from "@/lib/auth-client"
// import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
// import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react"
// import { useRouter } from "next/navigation"



// export const DashboardUserButton = () => {

//     const {data, isPending} = authClient.useSession()

//     const router = useRouter()

//     if(isPending || !data?.user){
//         return null
//     } 

//     const onLogout =  () => {
//         authClient.signOut({
//             fetchOptions:{
//                 onSuccess: () => {
//                     router.push("/sign-in")
//                 }
//             }
//         })
//     }

//     return(
//         <DropdownMenu>
//        <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between
//         bg-white/5 hover:bg-white/10 overflow-hidden
//        ">
//         {data.user.image? (
//             <Avatar>
//                 <AvatarImage src={data.user.image}/>
//             </Avatar>
//         ): <GeneratedAvatar
//         seed={data.user.name}
//         variant="initials"
//         className="size-9 mr-3"
//         />}
//         <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
//         <p className="text-sm truncate w-full">
//         {data.user.name}
//         </p>
//         <p className="text-xs truncate w-full">
//             {data.user.email}
//         </p>
//         </div>
//         <ChevronDownIcon className="size-4 shrink-0"/>
//        </DropdownMenuTrigger>
//        <DropdownMenuContent align="end" side="right" className="w-72">
//         <DropdownMenuLabel>
//             <div className="flex flex-col gap-1">
//                 <span className="font-medium truncate">
//                     {data.user.name}
//                 </span>
//                 <span className="text-sm font-normal text-muted-foreground">
//                      {data.user.email}
//                 </span>
//             </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator/>
//         <DropdownMenuItem
//         className="cursor-pointer flex items-center justify-between"
//         >
//             Billing
//             <CreditCardIcon className="size-4"/>
//         </DropdownMenuItem>
//         <DropdownMenuItem
//          className="cursor-pointer flex items-center justify-between"
//          onClick={onLogout}
//         >
//             Sign Out
//             <LogOutIcon className="size-4"/>
//         </DropdownMenuItem>
//        </DropdownMenuContent>
//        </DropdownMenu>
//     )
// }


"use client"

import { GeneratedAvatar } from "@/components/generated-avatar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import { authClient } from "@/lib/auth-client"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession()

  const isMobile = useIsMobile()

  const router = useRouter()

  if (isPending || !data?.user) {
    return null
  }

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in")
        },
      },
    })
  }

  if(isMobile){
    return (
      <Drawer>
        <DrawerTrigger  className="rounded-md border border-border/10 px-3 py-2 w-full flex items-center gap-3
  bg-white/5 hover:bg-white/10 overflow-hidden">
          {data.user.image ? (
    <Avatar className="h-8 w-8">
      <AvatarImage src={data.user.image || "/placeholder.svg"} />
    </Avatar>
  ) : (
    <GeneratedAvatar
      seed={data.user.name}
      variant="initials"
      className="size-8 shrink-0"
    />
  )}

  <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
    <p className="text-sm truncate font-medium leading-tight">{data.user.name}</p>
    <p className="text-xs truncate text-muted-foreground leading-tight">{data.user.email}</p>
  </div>

  <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {data.user.name}
            </DrawerTitle>
            <DrawerDescription>
              {data.user.email}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
            variant="outline"
            onClick={() => {}}
            >
              <CreditCardIcon className="size-4 text-black"/>
              Billing
            </Button>
             <Button
            variant="outline"
            onClick={onLogout}
            >
              <LogOutIcon className="size-4 text-black"/>
              Sign Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  

  return (
    <DropdownMenu>
     <DropdownMenuTrigger
  className="rounded-md border border-border/10 px-3 py-2 w-full flex items-center gap-3
  bg-white/5 hover:bg-white/10 overflow-hidden"
>
  {data.user.image ? (
    <Avatar className="h-8 w-8">
      <AvatarImage src={data.user.image || "/placeholder.svg"} />
    </Avatar>
  ) : (
    <GeneratedAvatar
      seed={data.user.name}
      variant="initials"
      className="size-8 shrink-0"
    />
  )}

  <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
    <p className="text-sm truncate font-medium leading-tight">{data.user.name}</p>
    <p className="text-xs truncate text-muted-foreground leading-tight">{data.user.email}</p>
  </div>

  <ChevronDownIcon className="size-4 shrink-0" />
</DropdownMenuTrigger>


      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground">{data.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between" onClick={onLogout}>
          Sign Out
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}