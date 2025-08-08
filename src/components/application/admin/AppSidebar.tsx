import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import ApplicationLogo from "../common/ApplicationLogo"
import { adminAppSidebarMenu } from "@/lib/client/adminAppSidebarMenu";
import Link from "next/link";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="border-b ps-0 h-13">
                <ApplicationLogo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {
                        adminAppSidebarMenu && adminAppSidebarMenu.length > 0 && adminAppSidebarMenu.map((menuItem, MenuIndex) => {
                            return (
                                <SidebarMenuItem key={MenuIndex}>
                                    <SidebarMenuButton asChild className="font-medium ps-2">
                                        <Link href={menuItem.url}>
                                            {menuItem?.icon}
                                            {menuItem.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })
                    }
                </SidebarMenu>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar >
    )
}




