"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Cat, Loader2 } from "lucide-react";
import { ImageCard } from "@/components/image-card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

export default function ImageContainer() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["cat"],
    queryFn: async () => {
      const res = await fetch("api/random-cat-pix", {
        method: "GET",
      });
      const { imageURL } = await res.json();
      return imageURL;
    },
  });

  function getRandomCatImage() {
    try {
      refetch();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Card className="w-[95dvw] md:w-6/12">
        <CardHeader>
          <CardTitle className="text-center">Random Cat</CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="w-full h-[150px] md:h-[450px] rounded-xl" />
            </div>
          ) : (
            <ImageCard imageURL={data} altText="Random Cat" />
          )}
        </CardContent>

        <CardFooter>
          <Button
            disabled={isLoading}
            className="m-auto"
            type="submit"
            size={isLoading ? "lg" : "icon"}
            onClick={getRandomCatImage}
            title="Get a random cat"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />A Cat is
                walking!!
              </>
            ) : (
              <Cat />
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
