"use client"
import * as React from "react"
import { Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"


export function ThemeButton() {
    const { setTheme, theme } = useTheme()

    function setThemeHandler() {
        const themeValue = theme === "light" ? "dark" : "light";
        setTheme(themeValue)
    }

    return (
        <Button onClick={setThemeHandler} variant="ghost" size="icon">
            <Sun />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
