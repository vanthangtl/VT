"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { NavHeader } from "@/components/nav-header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ArrowUpDownIcon,
  UserCircleIcon,
  FolderIcon,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: <LayoutDashboardIcon />,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Tổng quan",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Giao dịch",
      url: "/transactions",
      icon: <ArrowUpDownIcon />,
    },
    {
      title: "Tài khoản",
      url: "/accounts",
      icon: <UserCircleIcon />,
    },
    {
      title: "Danh mục",
      url: "/categories",
      icon: <FolderIcon />,
    },
  ],
};

// Định nghĩa chuẩn TypeScript thay vì dùng 'any'
type UserProps = {
  name: string;
  email: string;
  avatar?: string;
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: UserProps }) {
  return (
    <Sidebar  collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
