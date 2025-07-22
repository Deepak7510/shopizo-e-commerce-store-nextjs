import { adminRoutes } from "./routes";

export const adminAppSidebarMenu = [
    {
        title: "Dashboard",
        url: adminRoutes.dashboard,
        icon: 'LayoutDashboard',
    },
    {
        title: "Category",
        url: "#",
        // icon: Inbox,
        submenu: [
            {
                title: "Add Category",
                url: adminRoutes.dashboard,
            },
            {
                title: "All Category",
                url: adminRoutes.dashboard,
            },
        ]
    },
    {
        title: "Products",
        url: "#",
        submenu: [
            {
                title: "Add Product",
                url: adminRoutes.dashboard,
            },
            {
                title: "All Variant",
                url: adminRoutes.dashboard,
            },
            {
                title: "All Products",
                url: adminRoutes.dashboard,
            },
            {
                title: "All Variants",
                url: adminRoutes.dashboard,
            },
        ]
    },
    {
        title: "Coupons",
        url: "#",
        submenu: [
            {
                title: "Add Coupon",
                url: adminRoutes.dashboard,
            },
            {
                title: "All Coupons",
                url: adminRoutes.dashboard,
            },
        ]
    },
    {
        title: "Order",
        url: "#",
        // icon: Settings,
    },
    {
        title: "Coustomers",
        url: "#",
        // icon: Settings,
    },
    {
        title: "Rating & Review",
        url: "#",
        // icon: Settings,
    },
    {
        title: "Media",
        url: "#",
        // icon: Settings,
    },
]
