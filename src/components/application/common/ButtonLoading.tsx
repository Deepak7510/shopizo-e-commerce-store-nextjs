import { Loader2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"
import { cn } from "@/lib/utils";

interface buttonLoadingProps {
    type?: "button" | "submit" | "reset"; // optional and specific values
    text: string,
    loading: boolean,
    className?: string,
    onclick?: React.MouseEventHandler<HTMLButtonElement>; // more specific
}

export function ButtonLoading({ type, text, loading, className, onclick, ...props }: buttonLoadingProps) {
    return (
        <Button className={cn("", className)} onClick={onclick} type={type} size="sm" disabled={loading} {...props}>
            {loading && <Loader2Icon className="animate-spin" />}
            {text}
        </Button>
    )
}
