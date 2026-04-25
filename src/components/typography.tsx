import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Heading Component
const headingVariants = cva("font-bold leading-tight tracking-tight", {
    variants: {
        variant: {
            default: "text-gray-900 dark:text-gray-100",
            gradient: "bg-[linear-gradient(90deg,#A73033_0%,#E88127_50%,#A73033_100%)] bg-clip-text text-transparent w-fit",
            primary: "text-primary dark:text-primary",
        },
        size: {
            h1: "text-3xl md:text-4xl lg:text-5xl",
            h2: "text-2xl md:text-3xl lg:text-4xl",
            h3: "text-xl md:text-2xl lg:text-3xl",
            h4: "text-lg md:text-xl lg:text-2xl",
            h5: "text-base md:text-lg lg:text-xl",
            h6: "text-sm md:text-base lg:text-lg",
        },
        alignment: {
            left: "text-left",
            center: "text-center",
            right: "text-right",
        },
        weight: {
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
            extrabold: "font-extrabold",
        },
    },
    compoundVariants: [
        {
            variant: "gradient",
            alignment: "center",
            class: "mx-auto",
        },
        {
            variant: "gradient",
            alignment: "right",
            class: "ml-auto",
        },
    ],
    defaultVariants: {
        variant: "default",
        size: "h5",
        alignment: "left",
        weight: "semibold",
    },
});

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, variant, size, alignment, weight, as = "h1", children, ...props }, ref) => {
        const Component = as;

        return (
            <Component className={cn(headingVariants({ variant, size, alignment, weight, className }))} ref={ref} {...props}>
                {children}
            </Component>
        );
    },
);
Heading.displayName = "Heading";

// Paragraph Component
const paragraphVariants = cva("text-gray-800 dark:text-gray-300", {
    variants: {
        variant: {
            default: "text-gray-800 dark:text-gray-100",
            primary: "text-primary dark:text-primary",
        },
        size: {
            xxs: "text-[8px] md:text-[10px]",
            xs: "text-[12px] md:text-sm",
            sm: "text-xs md:text-base",
            base: "text-base md:text-lg",
            lg: "text-lg md:text-xl",
            xl: "text-xl md:text-2xl",
        },
        alignment: {
            left: "text-left",
            center: "text-center",
            right: "text-right",
            justify: "text-justify",
        },
        weight: {
            light: "font-light",
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
        },
        leading: {
            none: "leading-none",
            tight: "leading-tight",
            snug: "leading-snug",
            normal: "leading-normal",
            relaxed: "leading-relaxed",
            loose: "leading-loose",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "sm",
        alignment: "left",
        weight: "normal",
        leading: "tight",
    },
});

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> {}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({ className, variant, size, alignment, weight, leading, children, ...props }, ref) => {
        return (
            <p
                className={cn(
                    paragraphVariants({
                        variant,
                        size,
                        alignment,
                        weight,
                        leading,
                        className,
                    }),
                )}
                ref={ref}
                {...props}
            >
                {children}
            </p>
        );
    },
);
Paragraph.displayName = "Paragraph";

export { Heading, Paragraph, Mono, headingVariants, paragraphVariants, monoVariants };

// Mono Component
const monoVariants = cva("font-mono text-gray-900 dark:text-gray-300", {
    variants: {
        size: {
            xs: "text-[0.675rem]",
            sm: "text-xs",
            base: "text-sm",
            lg: "text-base",
            xl: "text-lg",
        },
        weight: {
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
        },
    },
    defaultVariants: {
        size: "base",
        weight: "normal",
    },
});

interface MonoProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof monoVariants> {}

const Mono = React.forwardRef<HTMLSpanElement, MonoProps>(({ className, size, weight, children, ...props }, ref) => {
    return (
        <span className={cn(monoVariants({ size, weight, className }))} ref={ref} {...props}>
            {children}
        </span>
    );
});
Mono.displayName = "Mono";
