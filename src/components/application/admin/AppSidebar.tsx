import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import ApplicationLogo from "../common/ApplicationLogo"
import { ChevronDown } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { adminAppSidebarMenu } from "@/lib/client/adminAppSidebarMenu";



export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="border-b ps-0 h-13">
                <ApplicationLogo />
            </SidebarHeader>
            <SidebarContent className="font-normal">
                <SidebarMenu>
                    {
                        adminAppSidebarMenu && adminAppSidebarMenu.length > 0 && adminAppSidebarMenu.map((menuItem, MenuIndex) => {
                            return (
                                <SidebarMenuItem key={MenuIndex}>
                                    <Collapsible className="group/collapsible">
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton >
                                                {menuItem.title}

                                                {
                                                    menuItem.submenu && menuItem.submenu.length > 0 &&
                                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                }
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>

                                                {
                                                    menuItem && menuItem.submenu && menuItem.submenu.length > 0 && menuItem.submenu.map((subMenuItem, subMenuIndex) => {
                                                        return <SidebarMenuSubItem key={subMenuIndex}>
                                                            <SidebarMenuSubButton>
                                                                {subMenuItem.title}
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    })
                                                }
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </Collapsible>
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




