import { ReactNode } from "react";


export type ImgProps = {

    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    contain?: boolean;
    title?: string;

    className?: string;
    imageClassName?: string;
    priority?: boolean;
    quality?: number;

    onLoadingComplete?: () => void;

}

export type layoutType = "fixed" | "fill" | "intrinsic" | "responsive" | undefined
