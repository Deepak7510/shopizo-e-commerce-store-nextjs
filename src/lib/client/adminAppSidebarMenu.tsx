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
    Image,
} from "lucide-react";

import { adminRoutes } from "./routes";

export const adminAppSidebarMenu = [
    {
        title: "Dashboard",
        url: adminRoutes.dashboard,
        icon: <LayoutDashboard />
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
        url: "#",
        icon: <ShoppingCart />,
    },
    {
        title: "Customers",
        url: "#",
        icon: <Users2 />,
    },
    {
        title: "Ratings & Reviews",
        url: "#",
        icon: <Star />,
    },
    {
        title: "Media",
        url: adminRoutes.medias.media,
        icon: <Image />,
    },
];
