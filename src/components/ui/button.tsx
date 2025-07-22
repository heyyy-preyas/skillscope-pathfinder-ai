import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-soft hover:shadow-primary transform hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft hover:shadow-lg",
        outline:
          "border-2 border-border bg-background hover:bg-secondary hover:border-primary text-foreground shadow-soft",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft",
        ghost: "hover:bg-accent/10 hover:text-accent text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-hover",
        accent: "bg-gradient-accent text-accent-foreground hover:shadow-accent transform hover:-translate-y-0.5 font-bold",
        hero: "bg-gradient-hero text-white hover:shadow-large transform hover:-translate-y-1 font-bold text-base",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-soft hover:shadow-lg",
        premium: "bg-gradient-primary text-white border-2 border-white/20 hover:border-white/40 shadow-primary hover:shadow-large transform hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-2xl px-10 text-base",
        xl: "h-16 rounded-2xl px-12 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
