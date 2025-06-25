// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { BotIcon, StarIcon, VideoIcon } from "lucide-react";

// import { Separator } from "@/components/ui/separator";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { DashboardUserButton } from "./dashboard-user-button";


// const firstSections = [
//   { icon: VideoIcon, label: "Meetings", href: "/meetings" },
//   { icon: BotIcon, label: "Agents", href: "/agents" },
// ];

// const secondSections = [{ icon: StarIcon, label: "Upgrade", href: "upgrade" }];

// export function DashboardSidebar() {
//   const pathname = usePathname();

//   return (
//     <Sidebar>
//       <SidebarHeader className="text-sidebar-accent-foreground">
//         <Link href="/" className="flex items-center gap-2 px-2 pt-2">
//           <Image src="/logo.svg" height={46} width={46} alt="Meet AI" />
//           <p className="text-lg font-semibold text-black">Meet AI</p>
//         </Link>
//       </SidebarHeader>
//       <div className="px-4 py-2">
//         <Separator />
//       </div>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {firstSections.map((item) => (
//                 <SidebarMenuItem key={item.href}>
//                   <SidebarMenuButton asChild isActive={pathname === item.href}>
//                     <Link href={item.href}>
//                       <item.icon className="size-5" />
//                       <span className="text-sm font-medium tracking-tight">
//                         {item.label}
//                       </span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//         <div className="px-4 py-2">
//           <Separator />
//         </div>
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {secondSections.map((item) => (
//                 <SidebarMenuItem key={item.href}>
//                   <SidebarMenuButton asChild isActive={pathname === item.href}>
//                     <Link href={item.href}>
//                       <item.icon className="size-5" />
//                       <span className="text-sm font-medium tracking-tight">
//                         {item.label}
//                       </span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
       
//         <DashboardUserButton />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }



"use client"

import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

import { BotIcon, StarIcon, VideoIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardUserButton } from "./dashboard-user-button"

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
]

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
]

export const DashboradSidebar = () => {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-slate-400/70">
      {/* Complete solid background fill */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-200 to-emerald-300"></div>

      {/* Additional overlay for darker tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-400/20 via-transparent to-emerald-400/20"></div>

      {/* Decorative background elements with darker colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-400 opacity-40 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 -right-10 w-24 h-24 bg-blue-400 opacity-40 blur-3xl rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 -left-5 w-20 h-20 bg-purple-400 opacity-25 blur-3xl rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-slate-400 opacity-30 blur-2xl rounded-full animate-pulse delay-500"></div>
      </div>

      <SidebarHeader className="relative z-10 text-sidebar-accent-foreground">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 pt-3 pb-2 group transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="relative bg-white/95 backdrop-blur-sm p-1.5 rounded-lg border border-slate-400/70 group-hover:border-emerald-500/70 transition-all duration-300 shadow-lg">
              <Image
                src="/logo.svg"
                height={28}
                width={28}
                alt="ZenoMeet"
                className="transition-transform duration-300 group-hover:rotate-12"
              />
            </div>
          </div>
          <div className="relative">
            <p className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent group-hover:from-emerald-800 group-hover:to-blue-800 transition-all duration-300">
              ZenoMeet
            </p>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-blue-600 group-hover:w-full transition-all duration-500"></div>
          </div>
        </Link>
      </SidebarHeader>

      <div className="px-4 py-2 relative z-10">
        <Separator className="bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />
      </div>

      <SidebarContent className="relative z-10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {firstSection.map((item, index) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-12 relative overflow-hidden group transition-all duration-300 hover:scale-105",
                      "bg-white/80 backdrop-blur-sm border border-slate-400/70 shadow-md",
                      "hover:bg-white/95 hover:border-emerald-500/70 hover:shadow-lg hover:shadow-emerald-500/20",
                      pathname === item.href && [
                        "bg-gradient-to-r from-emerald-200 to-blue-200 border-emerald-500/70",
                        "shadow-lg shadow-emerald-500/30",
                        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-emerald-600/20 before:to-blue-600/20",
                      ],
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <div
                        className={cn(
                          "relative p-2 rounded-lg transition-all duration-300 shadow-sm",
                          "bg-white/95 backdrop-blur-sm border border-slate-400/70",
                          "group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-blue-500 group-hover:border-transparent group-hover:shadow-md",
                          pathname === item.href &&
                            "bg-gradient-to-r from-emerald-500 to-blue-500 border-transparent shadow-md",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "size-4 transition-all duration-300",
                            "text-slate-800 group-hover:text-white",
                            pathname === item.href && "text-white",
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium tracking-tight transition-all duration-300",
                          "text-slate-900 group-hover:text-slate-900",
                          pathname === item.href && "text-slate-900 font-semibold",
                        )}
                      >
                        {item.label}
                      </span>

                      {/* Active indicator */}
                      {pathname === item.href && (
                        <div className="absolute right-2 w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse shadow-sm"></div>
                      )}

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-3 relative z-10">
          <Separator className="bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {secondSection.map((item, index) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-12 relative overflow-hidden group transition-all duration-300 hover:scale-105",
                      "bg-gradient-to-r from-emerald-600 to-blue-600 border border-emerald-500/70 shadow-lg",
                      "hover:from-emerald-700 hover:to-blue-700 hover:shadow-xl hover:shadow-emerald-500/40",
                      "text-white hover:text-white",
                      pathname === item.href && [
                        "from-emerald-700 to-blue-700 shadow-xl shadow-emerald-500/50",
                        "before:absolute before:inset-0 before:bg-white/10",
                      ],
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <div className="relative p-2 rounded-lg bg-white/30 backdrop-blur-sm border border-white/50 transition-all duration-300 group-hover:bg-white/40 shadow-sm">
                        <item.icon className="size-4 text-white transition-all duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-sm font-semibold tracking-tight text-white transition-all duration-300">
                        {item.label}
                      </span>

                      {/* Sparkle effect for upgrade */}
                      <div className="absolute right-3 flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-ping delay-0"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-ping delay-150"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                      </div>

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="relative z-10 p-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl blur"></div>
          <div className="relative bg-white/95 backdrop-blur-xl border border-slate-400/70 rounded-xl p-3 hover:border-emerald-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 shadow-md">
            <DashboardUserButton />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
