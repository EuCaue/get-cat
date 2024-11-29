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

export default function CatImagePreview() {
  const { isFetching, data, refetch } = useQuery({
    queryKey: ["cat"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await fetch("api/random-cat-pix", {
        method: "GET",
        cache: "no-cache",
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
          <CardTitle className="text-center">
            {isFetching ? "Your cat is comming!" : "Your cat is here! =D"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {isFetching ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="w-full h-[150px] md:h-[450px] rounded-xl" />
            </div>
          ) : (
            <ImageCard imageURL={data} altText="Random Cat" />
          )}
        </CardContent>

        <CardFooter>
          <Button
            disabled={isFetching}
            className="m-auto"
            type="submit"
            size={isFetching ? "lg" : "icon"}
            onClick={getRandomCatImage}
            title="Get a random cat"
          >
            {isFetching ? (
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
