import Image from "next/image";

import parisLogo from "@/assets/brand/paris_logo.png";

interface BrandIconProps {
    className?: string;
    width?: number;
    height?: number;
}

export const BrandIcon = ({ className, width, height }: BrandIconProps) => {
    return (
        <Image
            src={parisLogo}
            alt="PARIS"
            width={width}
            height={height}
            className={className}
            style={{ height: "auto" }}
            priority
        />
    );
};

export const BrandIconWhite = BrandIcon;
