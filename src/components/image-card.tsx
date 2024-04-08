"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

type ImageCardProps = {
  imageUrl: string;
  altText: string;
};

export function ImageCard({ imageUrl, altText }: ImageCardProps) {
  return (
    <AspectRatio ratio={16 / 9}>
      <Image
        src={imageUrl}
        width={1920}
        height={1080}
        alt={altText}
        className="rounded-sm object-cover w-full h-full"
      />
    </AspectRatio>
  );
}
