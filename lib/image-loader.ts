'use client'

import { ImageProps } from "next/image"

export default function myImageLoader({ src, width, quality }: { src: string, width?: number, quality?: number }) {
    return `${src}`;
}