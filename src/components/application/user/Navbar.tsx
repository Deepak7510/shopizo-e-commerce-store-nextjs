"use client"
import ApplicationLogo from "../common/ApplicationLogo";
import Link from "next/link";
import SearchHandler from "./SearchHandler";
import UserProfileMenu from "./UserProfileMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useFetch from "@/hooks/useFetch";
import { TypeOfCategoryData } from "@/types/admin.category.types";
import { Button } from "@/components/ui/button";
import { ThemeButton } from "@/app/ThemeButton";
import ShoppingCart from "./ShoppingCart";
import { useEffect, useState } from "react";
import { Search, UserCircleIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { authRoutes } from "@/lib/client/routes";


const NavCategories = () => {
    const { loading, data } = useFetch('/api/user/categories/get-all', {}, []);
    const categories = data?.data?.allDataList as TypeOfCategoryData[]

    return <ul className="flex gap-8 font-medium">
        <li className="hover:text-muted-foreground transition-all"> <Link href={''}>Home</Link></li>
        <li className="hover:text-muted-foreground transition-all"> <Link href={''}>About</Link></li>
        <li className="hover:text-muted-foreground transition-all"> <Link href={''}>Products</Link></li>
        {
            !loading && categories && categories.length > 0 && categories.map(item => {
                return <li key={item._id} className="hover:text-muted-foreground transition-all"><Link key={item._id} href={''}>{item.name}</Link></li>
            })
        }
    </ul>
}


const Navbar = () => {
    const { userInfo, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [openSearch, setOpenSearch] = useState<boolean>(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                setOpenSearch(true);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    return (
        <header className="w-full text-gray-600 z-50 sticky top-0 left-0 bg-background flex px-4 md:px-8 justify-between items-center h-20 border-b">
            <ApplicationLogo />
            <nav className="hidden md:block">
                <NavCategories />
            </nav>
            <div className="flex gap-2 justify-center items-center">
                <Button onClick={() => setOpenSearch(pre => !pre)} size={"icon"} variant={"ghost"}><Search /></Button>
                <ShoppingCart />
                <ThemeButton />
                <div>
                    {
                        isAuthenticated ?
                            <UserProfileMenu userInfo={userInfo!} />
                            :
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant={"ghost"} size={'icon'} asChild>
                                        <Link href={authRoutes.login} >
                                            <UserCircleIcon />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p> Login/Register</p>
                                </TooltipContent>
                            </Tooltip>
                    }
                </div>
            </div>
            {
                openSearch &&
                <div className="w-full border-b left-0 absolute top-[100%] px-10 pb-4 bg-background">
                    <SearchHandler openSearch={openSearch} setOpenSearch={setOpenSearch} />
                </div>
            }
        </header>
    )
}

export default Navbar
