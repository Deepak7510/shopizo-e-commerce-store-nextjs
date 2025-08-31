"use client"
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { adminRoutes } from "@/lib/client/routes"
import { useRouter } from "next/navigation"

const frameworks = [
    {
        value: "dashboard",
        label: "Dashboard",
        path: adminRoutes.dashboard
    },
    {
        value: "banners",
        label: "Banners",
        path: adminRoutes.banners.Banners
    },
    {
        value: "brands",
        label: "Brands",
        path: adminRoutes.brands.brands
    },
    {
        value: "categories",
        label: "Categories",
        path: adminRoutes.categories.categories
    },
    {
        value: "products",
        label: "Products",
        path: adminRoutes.products.products
    },
    {
        value: "colors",
        label: "Colors",
        path: adminRoutes.colors.colors
    },
    {
        value: "product variants",
        label: "Product Variants",
        path: adminRoutes.productVariants.productVariants
    },
    {
        value: "coupons",
        label: "Coupons",
        path: adminRoutes.coupons.coupons
    },
    {
        value: "orders",
        label: "Orders",
        path: adminRoutes.orders.orders
    },
    {
        value: "customers",
        label: "customers",
        path: adminRoutes.customers.customers
    },
    {
        value: "reviews",
        label: "Reviews",
        path: ""
    },
    {
        value: "media",
        label: "Media",
        path: adminRoutes.medias.media
    },
]

function SearchHandler() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const router = useRouter()

    React.useEffect(() => {
        if (value) {
            const path = frameworks.find((framework) => framework.value === value)?.path
            if (path) return router.push(path);
        }
    }, [value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px]  md:w-[350px] text-muted-foreground shadow-none rounded-full font-normal"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Search page..."}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No page found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SearchHandler