import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

type ImageCardProps = {
  imageURL: string;
  altText: string;
};

export function ImageCard({ imageURL, altText }: ImageCardProps) {
  return (
    <AspectRatio ratio={16 / 9}>
      <Image
        src={imageURL}
        width={1920}
        height={1080}
        alt={altText}
        className="rounded-sm object-cover w-full h-full"
      />
    </AspectRatio>
  );
}
