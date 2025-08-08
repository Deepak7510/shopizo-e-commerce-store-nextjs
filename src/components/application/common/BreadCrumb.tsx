import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"


export type breadcrumbListType = {
    href: string,
    title: string
}

export interface BreadCrumbProps {
    breadcrumbList: breadcrumbListType[]
}

const BreadCrumb = ({ breadcrumbList }: BreadCrumbProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbList && breadcrumbList.length > 0 ? breadcrumbList.map((item, index) => {
                    return (
                        index === breadcrumbList.length - 1 ? <BreadcrumbItem key={index}>
                            <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        </BreadcrumbItem> : < div key={index} className="flex items-center gap-3">
                            <BreadcrumbLink asChild>
                                <Link href={item.href}>{item.title}</Link>
                            </BreadcrumbLink>
                            <BreadcrumbSeparator />
                        </div>
                    )
                }) : null}
            </BreadcrumbList>
        </Breadcrumb >
    )
}

export default BreadCrumb
