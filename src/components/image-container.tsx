"use client";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";
import { Cat } from "lucide-react";

type ImageCardProps = {
  imageUrl: string;
  altText: string;
};

function ImageCard({ imageUrl, altText }: ImageCardProps) {
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

export default function ImageContainer() {
  const [randomCatImageUrl, setRandomCatImageUrl] = useState<string>("");

  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/random-cat-pix", {
        method: "GET",
      });
      const { imageUrl } = await res.json();
      setRandomCatImageUrl(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card className="w-[95dvw] md:w-6/12">
        <CardHeader>
          <CardTitle className="text-center">Random Cat</CardTitle>
        </CardHeader>

        <CardContent>
          <ImageCard imageUrl={randomCatImageUrl} altText="Random Cat" />
        </CardContent>

        <CardFooter>
          <Button
            className="m-auto"
            type="submit"
            size="icon"
            onClick={callAPI}
            title="Get a random cat"
          >
            <Cat />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
