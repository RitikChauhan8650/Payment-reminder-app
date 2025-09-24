import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "px-4 py-2 rounded-xl font-medium text-sm transition-colors",
                    variant === "default" &&
                    "bg-blue-600 text-white hover:bg-blue-700",
                    variant === "outline" &&
                    "border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800",
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";
