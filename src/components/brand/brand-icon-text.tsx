import Image from "next/image";

import parisLogoHorizontal from "@/assets/brand/paris_logo_horizontal.png";

interface BrandIconProps {
    className?: string;
    width?: number;
    height?: number;
}

export const BrandIconTextHorizontal = ({ width, height, className }: BrandIconProps) => {
    return (
        <Image
            src={parisLogoHorizontal}
            alt="PARIS"
            width={width}
            height={height}
            className={className}
            style={{ height: "auto" }}
            priority
        />
    );
};

export const BrandIconText = BrandIconTextHorizontal;

export const BrandIconTextWithoutDescription = BrandIconTextHorizontal;

export const BrandIconTextWhite = BrandIconTextHorizontal;
