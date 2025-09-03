import {
    LayoutDashboard,
    Shirt,
    BadgeCent,
    FolderKanban,
    LayoutGrid,
    PackageSearch,
    Tag,
    ShoppingCart,
    Users2,
    Star,
    Sun,
    Square,
    ImageIcon,
} from "lucide-react";

import { adminRoutes } from "./routes";

export const adminAppSidebarMenu = [
    {
        title: "Dashboard",
        url: adminRoutes.dashboard,
        icon: <LayoutDashboard />
    },
    {
        title: "Banners",
        url: adminRoutes.banners.Banners,
        icon: <Square />
    },
    {
        title: "Brands",
        url: adminRoutes.brands.brands,
        icon: <BadgeCent />,
    },
    {
        title: "Categories",
        url: adminRoutes.categories.categories,
        icon: <FolderKanban />,
    },
    {
        title: "Subcategories",
        url: adminRoutes.subcategories.subcategories,
        icon: <LayoutGrid />,
    },
    {
        title: "Products",
        url: adminRoutes.products.products,
        icon: <Shirt />,
    },
    {
        title: "Colors",
        url: adminRoutes.colors.colors,
        icon: <Sun />,
    },
    {
        title: "Product Variants",
        url: adminRoutes.productVariants.productVariants,
        icon: <PackageSearch />,
    },
    {
        title: "Coupons",
        url: adminRoutes.coupons.coupons,
        icon: <Tag />,
    },
    {
        title: "Orders",
        url: adminRoutes.orders.orders,
        icon: <ShoppingCart />,
    },
    {
        title: "Customers",
        url: adminRoutes.customers.customers,
        icon: <Users2 />,
    },
    {
        title: "Ratings & Reviews",
        url: adminRoutes.reviews.reviews,
        icon: <Star />,
    },
    {
        title: "Media",
        url: adminRoutes.medias.media,
        icon: <ImageIcon />,
    },
];
